const getEnv = (key: string, fallback?: string): string => {
  const value = import.meta.env[key];
  if (!value && fallback === undefined) {
    throw new Error(`Missing env variable: ${key}`);
  }
  return value ?? fallback!;
};

export const config = {
  apiUrl: getEnv("VITE_API_URL"),
  appName: getEnv("VITE_APP_NAME", "Echo Chat"),
  env: getEnv("VITE_ENV", "production"),
  socketUrl: getEnv("VITE_SOCKET_URL"),
};
