import { page } from "@vitest/browser/context";
import { afterAll, beforeAll } from "vitest";

import {
  allDefined,
  setBasePath,
  startLoader,
  stopLoader,
} from "@awesome.me/webawesome/dist/webawesome.loader.js";

import "@awesome.me/webawesome/dist/styles/webawesome.css";

// Dynamically determine the base path for Web Awesome assets
// This assumes that Vite is configured to handle the `@awesome.me/webawesome` alias correctly
// and that the assets are served from the correct location in the test environment.
const base = import.meta.resolve("/node_modules/@awesome.me/webawesome/dist");
setBasePath(base);

// @ts-expect-error - page.render is added by another library (e.g. vitest-browser-preact or vitest-browser-react)
const existingRender = page["render"];

if (!existingRender || typeof existingRender !== "function") {
  throw new Error(
    "[vitest-browser-webawesome] No page render function found." +
      "\nMake sure to import/add a render function (e.g. `vitest-browser-preact`) in your test files before importing this one." +
      "\nSee https://main.vitest.dev/guide/browser/#examples for more details.",
  );
}

// Wrap the existing render function to ensure all Web Awesome components are defined before returning
// This ensures that tests don't try to interact with components before they are ready
page.extend({
  // @ts-expect-error - page.render is added by another library (e.g. vitest-browser-preact or vitest-browser-react)
  render: async function render(...args: unknown[]) {
    const result: unknown = await existingRender.apply(this, args);
    await allDefined();
    return result;
  },
});

beforeAll(() => {
  startLoader();
});

afterAll(() => {
  stopLoader();
});
