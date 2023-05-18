import { Page, test as baseTest } from "@playwright/test";
import { IO } from "@controller/IO";

export const test = baseTest.extend<{
  io: IO;
}>({
  io: async ({ page }, use) => {
    await use(new IO(page));
  }
});

export default test;
export { expect } from "@playwright/test";
