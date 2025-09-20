import { expect, test, vitest } from "vitest";

test("importing before another import fails", async () => {
  await expect(
    async () => await vitest.importActual("vitest-browser-webawesome"),
  ).rejects.toThrowError();
});
