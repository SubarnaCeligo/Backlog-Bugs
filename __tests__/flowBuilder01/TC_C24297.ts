import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C24297", () => {
  test("@Epic-IO-54539 @Priority-P2 @Zephyr-IO-T24297 @Env-All C24297", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);

    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Zuora');
    await io.flowBuilder.click(selectors.connectionsPagePO.ZUORA_CONNECTOR);


    await page.waitForTimeout(5000);
    const value = await io.flowBuilder.getText(selectors.flowBuilderPagePO.EXISTING_RESOURCE)
    console.log("value", value)
    const func = value.toString().includes("Clone a flow step from the marketplaceNo results found");
    await io.assert.expectToBeTrue(func, "Message is not displayed as expected")

});
});
