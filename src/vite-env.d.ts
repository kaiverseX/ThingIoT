/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  MODE: string;
  VITE_API_ORIGIN: string;
  VITE_API_SOCKET_URI: string;
  VITE_SERVICE_NAME: string;
  VITE_IDLE_TIMEOUT: number;
}
