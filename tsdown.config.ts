import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["./src/index.tsx"],

    clean: true,
    dts: {
      tsgo: true,

      compilerOptions: {
        noEmit: false,
        stripInternal: true,
      },
      resolve: true,
      tsconfig: "./tsconfig.src.json",
    },
    exports: true,
    external: ["@awesome.me/webawesome", "vitest", "@vitest/browser"],
    format: ["esm"],
    platform: "neutral",
  },
]);
