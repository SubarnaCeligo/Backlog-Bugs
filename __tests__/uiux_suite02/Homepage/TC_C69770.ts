import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C69770 Verify Create and upload buttons should be alligned correctly,next to each other", () => {
  test("@Env-All @Zephyr-IO-T25943 C69770 Verify Create and upload buttons should be alligned correctly,next to each other", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    const createButton = page.getByRole("button", { name: "Create" });
    const uploadButton = await page
      .getByRole("button", { name: "Upload" })
      .evaluate(node => node);
    const createButtonSibling = await createButton.evaluate(
      node => node.nextElementSibling
    );
    expect(createButtonSibling).toEqual(uploadButton);
    await io.homePage.addStep(
      "Verified Create and Upload buttons are next to each other"
    );
  });
});
