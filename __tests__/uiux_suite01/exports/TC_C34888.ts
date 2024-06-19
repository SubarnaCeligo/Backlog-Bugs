import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C34888 Verify weather Restricted report type checkbox and help text is being displayed as expected for Hybrid SP-API Connection with /reports/2021-06-30/documents/ in relative URI", () => {
  test("@Env-All @Zephyr-IO-T1917  C34888 Verify weather Restricted report type checkbox and help text is being displayed as expected for Hybrid SP-API Connection with /reports/2021-06-30/documents/ in relative URI", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'http');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'AMAZON SP API CONNECTION');
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
    await io.flowBuilder.fill(selectors.exportsPagePO.HTTP_RELATIVE_URI,'/reports/2021-06-30/documents/');
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.RESTRICTED_REPORT_TYPE, "Restricted button not available")
  });
});