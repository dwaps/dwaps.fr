import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const define = {};

  if (mode !== "production") define["import.meta"] = import.meta;
  else define["import.meta"] = process.env;

  return {
    define,
    plugins: [react()],
  };
});
