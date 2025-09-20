# Vitest Browser Web Awesome

[![npm](https://img.shields.io/npm/v/vitest-browser-webawesome)](https://www.npmjs.com/package/vitest-browser-webawesome)
[![CI](https://github.com/enthspace/vitest-browser-webawesome/actions/workflows/unit-test.yml/badge.svg)](https://github.com/enthspace/vitest-browser-webawesome/actions/workflows/unit-test.yml)

Easily test [Web Awesome](https://webawesome.com/) components in [Vitest](https://vitest.dev/)'s browser mode. This library ensures Web Awesome components and CSS are fully loaded before your tests run by dynamically loading only those that are referenced in the tests.

## Getting Started

### Prerequisites

This library is designed to work with any Vitest browser integration that provides a `page.render` function, including custom renderers. The primary example uses `vitest-browser-preact`.

See the [Vitest Browser Mode documentation](https://vitest.dev/guide/browser.html) for a list of available integrations for common frameworks.

### Installation

```bash
pnpm add -D vitest-browser-webawesome
```

### Setup

To enable the library for all your browser tests, add it to a file in your `setupFiles` in your `vitest.config.ts`:

```ts
// In setup.ts
import "vitest-browser-preact"; // Must be imported before this library
import "vitest-browser-webawesome";

// ... other test setup, including custom CSS
```

```ts
// In vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["setup.ts"],
    // ... other browser options
  },
});
```

Alternatively, you can import it at the top of individual test files:

```tsx
import "vitest-browser-preact";
import "vitest-browser-webawesome";
```

### Example Test

Here is an example of testing a simple Preact component that uses a `<wa-button>`.

```tsx
// tests/Counter.test.tsx
import { expect, test } from "vitest";
import { page } from "@vitest/browser/context";
import { useState } from "preact/hooks";

type CounterProps = {
  initialCount: number;
};

const Counter = (props: CounterProps) => {
  const [count, setCount] = useState(props.initialCount);
  return (
    <wa-button variant="brand" onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </wa-button>
  );
};

test("renders and updates after click", async () => {
  // Make sure to await the render call
  await page.render(<Counter initialCount={0} />);

  // The button is ready for interaction
  const button = page.getByRole("button", { name: "Clicked 0 times" });
  await expect.element(button).toBeVisible();

  await button.click();

  // The component updates as expected
  await expect.element(page.getByText("Clicked 1 times")).toBeVisible();
  await expect
    .element(page.getByText("Clicked 1 times"))
    .toMatchScreenshot("clicked-once");
});
```

## Supported Frameworks

This library has been tested with `vitest-browser-preact`. It should be compatible with any other `vitest-browser-*` integration that correctly implements the `page.render` function. You can use a custom render function so long as you use the following to add it to `page`:

```ts
page.extend({
  render: customRenderFunction,
});
```

## Contributing

Feel free to open issues and pull requests. All contributions are welcome!

## License

[MIT](./LICENSE)
