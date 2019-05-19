export default function requireEnv(key, fallback) {
  const keys = Array.isArray(key) ? key : [key];
  const validKey = keys.find(key => process.env[key]);

  if (validKey) return process.env[validKey];
  if (fallback) return fallback;

  throw new Error(`Required environment variable [${keys.join(' or ')}] is not set!`);
}
