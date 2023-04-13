import {
  randomBytes,
  scalarMult,
  box,
  BoxKeyPair,
  SignKeyPair,
  sign,
  secretbox,
  hash,
} from "tweetnacl";
import { TextDecoder, TextEncoder } from "text-encoding";
import base58 from "bs58";

/**
 * ############&&&&&###&&#######&&G^::^^^JB#B##PP5YPGGBB55Y5YYYY5###PYYY?JPJYB5YYJYJJJJ?5BBBBGGBBBBBBGB
&&&&&&&&&&&&&&&&&&&&&&#######&@G?~?J7!?PPG&&&57~~~!!!?G##BGBG#&&&&BBBBB######B##&&B#&&########&&&&&&
&&&&&&&####&&&&&&&&&&&G??7!P##@5~!~~~~!!7P&&B!~!7~~~77J#####&#&&P7!!?YPG####BBGB#####B##&&&&&&&&#&&&
&&&&&&&&&&&&&&&&&&&&&&B?!~!P##&G77!!!?JJPBBGJ!JPPY?55YJG#&&&&#&&J7?!!Y55BB5G#&##&&&&#BBB&&&&&&&&##B#
&&&##&&&&&&&&&&&&&&&&&B^~JP###&&GYY55Y??BB#G?!77777?77J5&&#B##&#?!!~!?77GBB####&&&&####&&&&&#&&####B
##BB&&###&&&&&&&&&##&&#J!^:?&###BB??775##BGBP7JJYJY55JP########&P??Y55YPGGGB#####&&&&&&&&&&&&#BB####
BBG#BBB##&&&&&&&&&##&&#7^^^7GPP5PG?75#&#GGG5J!J?J?7?Y5#&&&&&&&#&&B##GGP5Y555PGB#&&&&&&&&&&&&&BGB###&
####GGBBB###&&&##&&&&&#~~:^JPPPPB#P?##PJ7!~~!!7YYPP5555PB#&&&&#&&&&#PYYYY55P555PB&##&&&&&&&&&&#BGB##
#&&#&####BB#&&&###&&&&&~~^?GGPPBBB5??~^~~!~~~~!?PGBP5Y7~~!?P#&&#&&&GYY5PPPGGPGGGGG&&#&&&&&&&&#####&&
GB&&&&&&&&#BB&####&&&&&?!JPBGGP#G?^^~~!!77!^^~~!7?7777!!!!~~7JYB##&PPPPPPGBBBBGGB5P&&&&&&&&&&&##&&#&
G#&&&&&&&&#GG#BPGB#BBBBPJ7G#BGGB7~!7??J?!~~~~~~~!!~~!!!!!!!~~~~!5#B5G5Y5PG##BBBGBPJG&&###&#B########
#BB&&&&&&&#BB##GP5GPGGG5~PB##BGY7Y7Y5YY7~~~~~~~!77~~~~!!~~~!!!!!!Y#G!~~~?G&#BGBGBG??G&##&&&#&&&&&&&&
#B#&BBB#&&#B#&&&#PPGBG#JJBB&#J~~???Y5GG?!!!!!~~!!~~~^~~~~!7JY?7?77JJ~~~!Y#####BBB#Y7JB##&&&#BBB#&&&&
##&&###B#&&&&&&##PJ??5#BB#&B!^!!7?7?YBGY???77!!7?7!!~!!!?JYBG?!!~^^~!7J5B#B#BBBBBBGY?5B#&&&#P5PG#&&&
###B###BBB#&&&BGG#GGB#BB#&G!~!777?J5PPY??JYYJJY55YYJ?JJY55P#B5J!~^^^~?B##BBBBBBBBBYPJYGG5P##G5PGG#&&
#GGBGBBGGGB#GGGJ?JJ5B#GB#P~~7!7YYYP#BYJ?!!!!!!?Y?!!7J555YJPG?75Y7!!^~~?G####BB####PY5JG#BYG#BGGPG#B&
GGBBGG#BB###BGPBBBBGGGB#G!~~~~~7PG&&&B?7!!~~~~!!~^~!77???J!:^?PBG57~~!!?B###BB#####5?7JB#####GBB####
B###B#&&#&&&&#BB####GBB#G?7!!~~^~?P#&&57777!!!77!!7!77???J!!!G#P?!~~~7?75######BB###5J75BBBGPYYPB#BB
&&#PYP#&&&&&######BGBB#&G!7??7!~~~~7P##?!77!!7??7777?????JY7~7?~~~!7JJY5G#####BBB###5Y55PPPYJYYYY555
&&G55G#BB&&&#####&GPB#&G!?!PBPY?77!~~!YY7!~!~!7??JJ??JJ??JY?!!!7?JYYPGB#&###&#####&BBG##&&BYPB####&#
#&BPGB&PP##&#&&#&#5PB#&G!77B#&&#G5J775P5Y5YJ???J?755PGBGPPPBPJ55GBBB####&&#######&&BGGBBGG55YBPY5PB#
&&BY5#&&##B#&&&&#GPB#B#P75?P&&@&&&#BGGBBBGGBGGP7PB#GY7B&&#BB####&###B###&&&&######&#GPPPPY5PP55JY555
&&#5P&##&&&BPP#&#BB##&&P~^!P&#####&#GGG#BBGP??#PB@&&BY?Y#&#&####&#BB###&&&BB&&#####&#PPBBGPP5YYYY55G
####&####&&####&&#####&B?7!B#BB###BGG#BB#BJJYB&#GP#&&&BG#&&&&&&&######&&&#55B&&#####&BB#&&BGPBBGGPYP
 */
const pk = randomBytes(32);
const sk = randomBytes(32);
const nonce = randomBytes(24);
const sharedKey = getSharedKey(sk, pk);
const msg = textEncode("Hello World");

/**
 *
 * @returns {BoxKeyPair} key pair
 * @example
 * const { publicKey, secretKey } = genBoxKeyPair();
 */
export function genBoxKeyPair(): BoxKeyPair {
  const { publicKey, secretKey } = box.keyPair();
  return { publicKey, secretKey };
}

/**
 * @param {Uint8Array} privateKey
 * @param {Uint8Array} publicKey
 * @returns {Uint8Array} shared key
 * @example
 * const sharedKey = getSharedKey(privateKey, publicKey);
 */
export function getSharedKey(
  privateKey: Uint8Array,
  publicKey: Uint8Array
): Uint8Array {
  return scalarMult(privateKey, publicKey);
}

/**
 *
 * @param privateKey
 * @param publicKey
 * @returns {string} base58 encoded shared key
 * @example
 * const sharedKey = getSharedKeyBase58(privateKey, publicKey);
 */
export function getSharedKeyBase58(
  privateKey: Uint8Array,
  publicKey: Uint8Array
): string {
  return base58.encode(getSharedKey(privateKey, publicKey));
}

/**
 *
 * @param message
 * @param nonce
 * @param sharedKey
 * @returns {Uint8Array} encrypted message
 * @example
 * const encryptedMessage = encryptMessage(message, nonce, sharedKey);
 */
export function encryptMessage(
  message: Uint8Array,
  nonce: Uint8Array,
  sharedKey: Uint8Array
): Uint8Array {
  return box.after(message, nonce, sharedKey);
}

/**
 *
 * @param encryptedMessage
 * @param nonce
 * @param sharedKey
 * @returns {Uint8Array} decrypted message
 * @example
 * const decryptedMessage = decryptMessage(encryptedMessage, nonce, sharedKey);
 */
export function decryptMessage(
  encryptedMessage: Uint8Array,
  nonce: Uint8Array,
  sharedKey: Uint8Array
): Uint8Array {
  return box.open.after(encryptedMessage, nonce, sharedKey) as Uint8Array;
}

/**
 *
 * @param message
 * @param nonce
 * @param sharedKey
 * @returns {string} base58 encoded encrypted message
 * @example
 * const encryptedMessage = encryptMessageBase58(message, nonce, sharedKey);
 */
export function encryptMessageBase58(
  message: Uint8Array,
  nonce: Uint8Array,
  sharedKey: Uint8Array
): string {
  return base58.encode(encryptMessage(message, nonce, sharedKey));
}

/**
 *
 * @param encryptedMessage
 * @param nonce
 * @param sharedKey
 * @returns {Uint8Array} decrypted message
 * @example
 * const decryptedMessage = decryptMessageBase58(encryptedMessage, nonce, sharedKey);
 */
export function decryptMessageBase58(
  encryptedMessage: string,
  nonce: Uint8Array,
  sharedKey: Uint8Array
): Uint8Array {
  return decryptMessage(base58.decode(encryptedMessage), nonce, sharedKey);
}

/**
 *
 * @param message
 * @returns {Uint8Array} encoded message
 * @example
 * const encodedMessage = textEncode(message);
 */
export function textEncode(message: string): Uint8Array {
  return new TextEncoder().encode(message);
}

/**
 *
 * @param message
 * @returns {string} decoded message
 * @example
 * const decodedMessage = textDecode(message);
 */
export function textDecode(message: Uint8Array): string {
  return new TextDecoder().decode(message);
}

/**
 *
 * @returns {Uint8Array} nonce
 * @example
 * const nonce = getNonce();
 */
export function getNonce(): Uint8Array {
  return randomBytes(24);
}

/**
 *
 * @param message
 * @param nonce
 * @param privateKey
 * @param publicKey
 * @returns {Uint8Array} encrypted message
 * @example
 * const encryptedMessage = encryptMessageKeyExchange(message, nonce, privateKey, publicKey);
 */
export function encryptMessageKeyExchange(
  message: Uint8Array,
  nonce: Uint8Array,
  privateKey: Uint8Array,
  publicKey: Uint8Array
): Uint8Array {
  return encryptMessage(message, nonce, getSharedKey(privateKey, publicKey));
}

/**
 *
 * @param encryptedMessage
 * @param nonce
 * @param privateKey
 * @param publicKey
 * @returns {Uint8Array} decrypted message
 * @example
 * const decryptedMessage = decryptMessageKeyExchange(encryptedMessage, nonce, privateKey, publicKey);
 */
export function decryptMessageKeyExchange(
  encryptedMessage: Uint8Array,
  nonce: Uint8Array,
  privateKey: Uint8Array,
  publicKey: Uint8Array
): Uint8Array {
  return decryptMessage(
    encryptedMessage,
    nonce,
    getSharedKey(privateKey, publicKey)
  );
}

/**
 *
 * @param message
 * @param nonce
 * @param privateKey
 * @param publicKey
 * @returns {string} base58 encoded encrypted message
 * @example
 * const encryptedMessage = encryptMessageKeyExchangeBase58(message, nonce, privateKey, publicKey);
 */
export function encryptMessageKeyExchangeBase58(
  message: Uint8Array,
  nonce: Uint8Array,
  privateKey: Uint8Array,
  publicKey: Uint8Array
): string {
  return base58.encode(
    encryptMessageKeyExchange(message, nonce, privateKey, publicKey)
  );
}

/**
 *
 * @param encryptedMessage
 * @param nonce
 * @param privateKey
 * @param publicKey
 * @returns {Uint8Array} decrypted message
 * @example
 * const decryptedMessage = decryptMessageKeyExchangeBase58(encryptedMessage, nonce, privateKey, publicKey);
 */
export function decryptMessageKeyExchangeBase58(
  encryptedMessage: string,
  nonce: Uint8Array,
  privateKey: Uint8Array,
  publicKey: Uint8Array
): Uint8Array {
  return decryptMessageKeyExchange(
    base58.decode(encryptedMessage),
    nonce,
    privateKey,
    publicKey
  );
}

/**
 *
 * @returns {SignKeyPair} key pair
 * @example
 * const keyPair = getSignKeyPair();
 */
export function getSignKeyPair(): SignKeyPair {
  const { publicKey, secretKey } = sign.keyPair();
  return { publicKey, secretKey };
}

/**
 *
 * @param message
 * @param secretKey
 * @returns {Uint8Array} signature
 * @example
 * const signature = signMessage(message, secretKey);
 */
export function signMessage(
  message: Uint8Array,
  secretKey: Uint8Array
): Uint8Array {
  return sign(message, secretKey);
}

/**
 * @param message
 * @param signature
 * @param publicKey
 * @returns {boolean} true if signature is valid
 * @example
 * const isValid = verifyMessage(message, signature, publicKey);
 */
export function verifyMessage(
  message: Uint8Array,
  signature: Uint8Array,
  publicKey: Uint8Array
): boolean {
  return sign.detached.verify(message, signature, publicKey);
}

/**
 *
 * @param message
 * @param secretKey
 * @returns {string} base58 encoded signature
 * @example
 * const signature = signMessageBase58(message, secretKey);
 */
export function signMessageBase58(
  message: Uint8Array,
  secretKey: Uint8Array
): string {
  return base58.encode(signMessage(message, secretKey));
}

/**
 *
 * @param message
 * @param signature
 * @param publicKey
 * @returns {boolean} true if signature is valid
 * @example
 * const isValid = verifyMessageBase58(message, signature, publicKey);
 */
export function verifyMessageBase58(
  message: Uint8Array,
  signature: string,
  publicKey: Uint8Array
): boolean {
  return verifyMessage(message, base58.decode(signature), publicKey);
}

/**
 *
 * @param message
 * @param secretKey
 * @param publicKey
 * @returns  {Uint8Array} signature
 * @example
 * const signature = signMessageKeyExchange(message, secretKey, publicKey);
 */
export function signMessageKeyExchange(
  message: Uint8Array,
  secretKey: Uint8Array,
  publicKey: Uint8Array
): Uint8Array {
  const sharedKey = getSharedKey(secretKey, publicKey);
  return signMessage(message, sharedKey);
}

/**
 *
 * @param message
 * @param signature
 * @param secretKey
 * @param publicKey
 * @returns {boolean} true if signature is valid
 * @example
 * const isValid = verifyMessageKeyExchange(message, signature, secretKey, publicKey);
 */
export function verifyMessageKeyExchange(
  message: Uint8Array,
  signature: Uint8Array,
  secretKey: Uint8Array,
  publicKey: Uint8Array
): boolean {
  const sharedKey = getSharedKey(secretKey, publicKey);
  return verifyMessage(message, signature, sharedKey);
}

/**
 *
 * @param message
 * @param secretKey
 * @param publicKey
 * @returns {string} base58 encoded signature
 * @example
 * const signature = signMessageKeyExchangeBase58(message, secretKey, publicKey);
 */
export function signMessageKeyExchangeBase58(
  message: Uint8Array,
  secretKey: Uint8Array,
  publicKey: Uint8Array
): string {
  return base58.encode(signMessageKeyExchange(message, secretKey, publicKey));
}

/**
 *
 * @param message
 * @param signature
 * @param secretKey
 * @param publicKey
 * @returns {boolean} true if signature is valid
 * @example
 * const isValid = verifyMessageKeyExchangeBase58(message, signature, secretKey, publicKey);
 */
export function verifyMessageKeyExchangeBase58(
  message: Uint8Array,
  signature: string,
  secretKey: Uint8Array,
  publicKey: Uint8Array
): boolean {
  return verifyMessageKeyExchange(
    message,
    base58.decode(signature),
    secretKey,
    publicKey
  );
}

/**
 *
 * @param message
 * @returns {Uint8Array} hash
 * @example
 * const hash = getHash(message);
 */
export function getHash(message: Uint8Array): Uint8Array {
  return hash(message);
}

/**
 *
 * @param message
 * @returns {string} base58 encoded hash
 * @example
 * const hash = getHashBase58(message);
 */
export function getHashBase58(message: Uint8Array): string {
  return base58.encode(getHash(message));
}

/**
 *
 * @returns {Uint8Array} secret key
 * @example
 * const secretKey = genSecretKey();
 */
export function genSecretKey(): Uint8Array {
  return randomBytes(32);
}

/**
 *
 * @param message
 * @param nonce
 * @param secretKey
 * @returns {Uint8Array} encrypted message
 * @example
 * const encryptedMessage = encryptSecretKey(message, nonce, secretKey);
 */
export function encryptSecretKey(
  message: Uint8Array,
  nonce: Uint8Array,
  secretKey: Uint8Array
): Uint8Array {
  return secretbox(message, nonce, secretKey);
}

/**
 *
 * @param encryptedMessage
 * @param nonce
 * @param secretKey
 * @returns {Uint8Array} decrypted message
 * @example
 * const decryptedMessage = decryptSecretKey(encryptedMessage, nonce, secretKey);
 */
export function decryptSecretKey(
  encryptedMessage: Uint8Array,
  nonce: Uint8Array,
  secretKey: Uint8Array
): Uint8Array {
  return secretbox.open(encryptedMessage, nonce, secretKey) as Uint8Array;
}

/**
 *
 * @param message
 * @param nonce
 * @param secretKey
 * @returns {string} base58 encoded encrypted message
 * @example
 * const encryptedMessage = encryptSecretKeyBase58(message, nonce, secretKey);
 */
export function encryptSecretKeyBase58(
  message: Uint8Array,
  nonce: Uint8Array,
  secretKey: Uint8Array
): string {
  return base58.encode(encryptSecretKey(message, nonce, secretKey));
}

/**
 *
 * @param encryptedMessage
 * @param nonce
 * @param secretKey
 * @returns {Uint8Array} decrypted message
 * @example
 * const decryptedMessage = decryptSecretKeyBase58(encryptedMessage, nonce, secretKey);
 */
export function decryptSecretKeyBase58(
  encryptedMessage: string,
  nonce: Uint8Array,
  secretKey: Uint8Array
): Uint8Array {
  return decryptSecretKey(base58.decode(encryptedMessage), nonce, secretKey);
}
