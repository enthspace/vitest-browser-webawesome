import { playwright } from "@vitest/browser/providers/playwright";
import { defineConfig } from "vitest/config";
import { preact } from "@preact/preset-vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), preact()],
  test: {
    name: "preact",

    browser: {
      enabled: true,
      headless: true,
      instances: [{ browser: "chromium" }],
      provider: playwright(),
      screenshotFailures: false,
    },
  },
});
