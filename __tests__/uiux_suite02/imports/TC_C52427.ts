import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C52427 For NS SS2.0 - Verify shipping address sub record is shown for subsidiary record", () => {
  test("@Env-All @Zephyr-IO-T26755 C52427 For NS SS2.0 - Verify shipping address sub record is shown for subsidiary record", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'netsuite');
    await io.flowBuilder.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
    await io.flowBuilder.click(selectors.connectionsPagePO.IMPORT_RECORDS);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.selectConnectionDropDown(page, 'NETSUITE CONNECTION');

    await io.flowBuilder.fill(selectors.importPagePO.NETSUITE_RECORD_TYPE, 'Subsidia');
    await io.flowBuilder.click(selectors.importPagePO.NETSUITE_RECORD_TYPE);
    await io.flowBuilder.clickByText('Subsidiary');
    await io.flowBuilder.clickByText('Add subrecord');
    await io.flowBuilder.click(selectors.importPagePO.MUI_SELECT_FIELD_ID);
    await io.flowBuilder.click(selectors.importPagePO.CELIGO_ADDRESS_SHIPPING);
    await io.flowBuilder.click(selectors.importPagePO.JSONPATH_CELIGO_ADDRESS_SHIPPING);
    await io.flowBuilder.click(selectors.importPagePO.REACT_AUTO_WHATEVER_1)
    await io.flowBuilder.click(selectors.basePagePO.MFA_SAVE);
    await io.assert.verifyElementDisplayedByText('celigo_address_shipping', 'sub record not visible');
    await io.assert.verifyElementIsDisplayed(selectors.importPagePO.EDIT_SUBRECORDS, 'Edit subrecord not visible');
    await io.assert.verifyElementIsDisplayed(selectors.importPagePO.DELETE_SUBRECORDS, 'Delete subrecord not visible');
  });
});