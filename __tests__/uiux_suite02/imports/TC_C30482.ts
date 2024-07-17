import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C30482_Verify support for record type 'price plan' in search criteria and import as well`, () => {
  test(`@Env-All @Zephyr-IO-T1754 C30482_Verify support for record type 'price plan' in search criteria and import as well UI_Backlog`, async ({ io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'netsuite');
    await io.flowBuilder.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
    await io.flowBuilder.click(selectors.connectionsPagePO.IMPORT_RECORDS);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.selectConnectionDropDown(page, 'NETSUITE CONNECTION');
    await io.flowBuilder.fill(selectors.importPagePO.NETSUITE_RECORD_TYPE, 'Price Plan');
    await io.flowBuilder.click(selectors.importPagePO.NETSUITE_RECORD_TYPE);
    await io.flowBuilder.clickByText('Price Plan');
    await io.flowBuilder.clickByText('Add');
    await io.flowBuilder.clickByText('Ignore existing records');
    // Validating the able to configure the Price Plan record type
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NETSUITE_INTERNAL_LOOKUP, "Not able to configure");

  });
});