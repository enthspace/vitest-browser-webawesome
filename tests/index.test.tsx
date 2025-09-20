import type { VNode } from "preact";
import { expect, test } from "vitest";
import { page } from "@vitest/browser/context";
import { useCallback, useState } from "preact/hooks";

// oxlint-disable-next-line no-unassigned-import
import "vitest-browser-preact";
// oxlint-disable-next-line no-unassigned-import
import "vitest-browser-webawesome";

interface CounterProps {
  initialCount: number;
}

function Counter(props: CounterProps): VNode {
  const [count, setCount] = useState(props.initialCount);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <wa-button
      variant="brand"
      // @ts-expect-error Webawesome custom element type definiitions are missing onClick
      onClick={handleClick}
    >
      Clicked {count} times
    </wa-button>
  );
};

test("renders and updates after click", async (context) => {
  // oxlint-disable-next-line await-thenable
  await page.render(<Counter initialCount={0} />);

  await expect.element(page.getByText("Clicked 0 times")).toBeVisible();
  await page.getByRole("button", { name: "Clicked 0 times" }).click();
  await expect.element(page.getByText("Clicked 1 times")).toBeVisible();
  context.skip("This is currently failing in GitHub Actions");
  await expect
    .element(page.getByText("Clicked 1 times"))
    .toMatchScreenshot("clicked-once");
});
