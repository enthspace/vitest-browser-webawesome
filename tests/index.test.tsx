import { expect, test } from "vitest";
import { page } from "@vitest/browser/context";
import { useState } from "preact/hooks";

import "vitest-browser-preact";
import "vitest-browser-webawesome";

type CounterProps = {
  initialCount: number;
};

const Counter = (props: CounterProps) => {
  const [count, setCount] = useState(props.initialCount);
  return (
    <wa-button
      variant="brand"
      // @ts-expect-error Webawesome custom element type definiitions are missing onClick
      onClick={() => setCount(count + 1)}
    >
      Clicked {count} times
    </wa-button>
  );
};

test("renders and updates after click", async () => {
  // oxlint-disable-next-line await-thenable
  await page.render(<Counter initialCount={0} />);

  await expect.element(page.getByText("Clicked 0 times")).toBeVisible();
  await page.getByRole("button", { name: "Clicked 0 times" }).click();
  await expect.element(page.getByText("Clicked 1 times")).toBeVisible();
  await expect
    .element(page.getByText("Clicked 1 times"))
    .toMatchScreenshot("clicked-once");
});
