import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C24270", () => {
  test("@Epic-IO-54539 @Priority-P2 @Zephyr-IO-T24270 @Env-All C24270", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON)
        const value = await io.flowBuilder.getText(selectors.flowBuilderPagePO.EXISTING_RESOURCE)
        const func = value.toString().includes("Your existing flow steps");
        await io.assert.expectToBeTrue(func, "help text doesn't match")
  
  });
});
