import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C24282", () => {
  test("TC_C24282", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);

    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON)

        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Zuora');
        await io.flowBuilder.click(selectors.connectionsPagePO.ZUORA_CONNECTOR);
       
        await page.waitForTimeout(5000);
       const value = await io.flowBuilder.getText(selectors.flowBuilderPagePO.EXISTING_RESOURCE)

     const func = value.toString().includes("No results found.");
     await io.assert.expectToBeTrue(func, "help text doesn't match")
     
  });
});
