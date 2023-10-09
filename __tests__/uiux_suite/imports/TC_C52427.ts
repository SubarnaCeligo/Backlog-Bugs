import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C52427 For NS SS2.0 - Verify shipping address sub record is shown for subsidiary record", () => {
  test("C52427 For NS SS2.0 - Verify shipping address sub record is shown for subsidiary record", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'netsuite');
    await io.flowBuilder.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
    await io.flowBuilder.click('[data-value="importRecords"]');
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText('NETSUITE CONNECTION');
    await io.flowBuilder.click(selectors.basePagePO.SAVE);

    await io.flowBuilder.fill('[name="/netsuite_da/recordType"]', 'Subsidia');
    await io.flowBuilder.click('[name="/netsuite_da/recordType"]');
    await io.flowBuilder.clickByText('Subsidiary');
    await io.flowBuilder.clickByText('Add subrecord');
    await io.flowBuilder.click('[id="mui-component-select-fieldId"]');
    await io.flowBuilder.click('[data-value="celigo_address_shipping"]');
    await io.flowBuilder.click('input[id="jsonPath_celigo_address_shipping"]');
    await io.flowBuilder.click('[id="react-autowhatever-1"]')
    await io.flowBuilder.click(selectors.basePagePO.MFA_SAVE);
    await io.assert.verifyElementDisplayedByText('celigo_address_shipping', 'sub record not visible');
    await io.assert.verifyElementIsDisplayed('[aria-label="Edit subrecord"]', 'Edit subrecord not visible');
    await io.assert.verifyElementIsDisplayed('[aria-label="Delete subrecord"]', 'Delete subrecord not visible');
  });
});