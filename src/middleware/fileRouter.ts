import express, { RequestHandler } from "express";
import { lstatSync, readdirSync } from "fs";

interface IApiRoute {
  path: string;
  handler: RequestHandler;
  reqPath: string;
}
const apiRoutes = [] as IApiRoute[];
let dir_name: string;

export default async function FileRouter(
  router: express.Router,
  dirname: string
) {
  dir_name = dirname;
  await getApiRoutes(dirname + "/routes/");

  router.all("*", async (req, res) => {
    const route = apiRoutes.find((route) => {
      if (route.path.endsWith("index.js") || route.path.endsWith("index.ts")) {
        let requestingPath = req.path;
        const reqPath = req.path.split("/");
        const routePath = route.reqPath.slice(0, -1).split("/");

        for (const [i, reqPathElement] of reqPath.entries()) {
          const routePathElement = routePath[i];
          if (!reqPathElement || !routePathElement) continue;
          const param = routePathElement.match(/\[(.*?)\]/);

          if (param) {
            const paramName = param[1].replace("[]", "");
            req.params[paramName] = reqPathElement;
            requestingPath = requestingPath.replace(
              reqPathElement,
              `[${paramName}]`
            );
          }
        }
        return (
          route.reqPath === requestingPath ||
          route.reqPath.slice(0, -1) === requestingPath
        );
      }

      return route.reqPath === req.path;
    });

    if (route) return route.handler(req, res, null);
    res.status(404).send("Not Found");
  });
}

export async function getApiRoutes(path: string) {
  const files = readdirSync(path);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const isFolder = lstatSync(path + file).isDirectory();

    if (file.endsWith(".js") || file.endsWith(".ts")) {
      const reqPath = (path + file)
        .replace(dir_name + "/routes", "")
        .replace(".ts", "")
        .replace(".js", "")
        .replace("index", "");

      apiRoutes.push({
        path: path + file,
        handler: await import(path + file).then((module) => module.handler),
        reqPath: reqPath,
      });
    }

    if (isFolder) await getApiRoutes(path + file + "/");
  }
}
