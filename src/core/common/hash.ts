import crypto from 'crypto';

const SHA512 = 'sha512';
const SHA256 = 'sha256';

const hash = (algorithm: string, text: string) => {
  return crypto.createHash(algorithm).update(text).digest('hex');
};

const sha512 = (data: string): string => {
  return hash(SHA512, data);
};

const sha256 = (data: string): string => {
  return hash(SHA256, data);
};

export { sha512, hash, sha256 };
