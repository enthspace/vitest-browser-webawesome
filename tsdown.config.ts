import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["./src/index.ts"],

    clean: true,
    exports: true,
    format: ["esm"],
    external: ["@awesome.me/webawesome", "vitest", "@vitest/browser"],
    dts: {
      tsgo: true,

      compilerOptions: {
        noEmit: false,
        stripInternal: true,
      },
      resolve: true,
      tsconfig: "./tsconfig.src.json",
    },
    platform: "neutral",
  },
]);
