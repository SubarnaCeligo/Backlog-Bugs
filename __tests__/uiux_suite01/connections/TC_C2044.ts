import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C2044 Verify that Commerce category should be displayed in the 'Record Type' drop-down in the NS Export Page.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
});
test.afterEach(async ({ io }) => {
  await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
});
  test("@Env-All @Zephyr-IO-T8270 C2044 Verify that Commerce category should be displayed in the 'Record Type' drop-down in the NS Export Page.", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'netsuite');
    await io.flowBuilder.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
    await io.flowBuilder.clickByText('Export records from source application');
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN)
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'NETSUITE CONNECTION');
    await io.flowBuilder.clickByTextByIndex('NETSUITE CONNECTION', 0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.EXPORT_RECORDTYPE_ADD,'Customer Categ');
    
    await io.assert.verifyElementDisplayedByText(
        "Customer Category",
        "Customer Category is present "
      );
  });
}); 
