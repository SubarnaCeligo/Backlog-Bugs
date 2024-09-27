import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C9473 Accounting period lookup is not displayed in record type for users with 2FA Role", () => {
  test("@Env-All @Zephyr-IO-T2726 C9473 Accounting period lookup is not displayed in record type for users with 2FA Role", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'netsuite');
    await io.flowBuilder.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
    await io.flowBuilder.click(selectors.connectionsPagePO.IMPORT_RECORDS)
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN)
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'NETSUITE CONNECTION');
    await io.flowBuilder.clickByTextByIndex('NETSUITE CONNECTION', 0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.importPagePO.NETSUITE_RECORD_TYPE)
    await io.flowBuilder.fill(selectors.importPagePO.NETSUITE_RECORD_TYPE, 'accounting per');
    await io.assert.verifyElementDisplayedByText('Accounting Period', 'Accounting period is not displayed');
  });
});