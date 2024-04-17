import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C24282", () => {
  test("@Epic-IO-54539 @Priority-P2 @Zephyr-IO-T24282 @Env-STAGING C24282", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);

    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON)

        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Zuora');
        await io.flowBuilder.click(selectors.connectionsPagePO.ZUORA_CONNECTOR);
       
        await page.waitForTimeout(5000);
       const value = await io.flowBuilder.getText(selectors.flowBuilderPagePO.EXISTING_RESOURCE)

     const func = value.toString().includes("No results found.");
     await io.assert.expectToBeTrue(func, "help text doesn't match")
     await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
     await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
 
     await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
 
     const valu1 = await io.flowBuilder.getText(selectors.flowBuilderPagePO.EXISTING_RESOURCE)

     const func1 = value.toString().includes("No results found.");
     await io.assert.expectToBeTrue(func1, "help text doesn't match")
     
  });
});
