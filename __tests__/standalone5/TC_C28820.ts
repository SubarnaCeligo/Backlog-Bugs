
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C28820_Verify_if_an_error_is_shown_on_UI_when_tryig_to_authorize_the_connection_without_providing_the_mandatory_values.", () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4544 @Zephyr-IO-T4543 @Zephyr-IO-T4542 C28818 C28819 TC_C28820_Paylocity_connection_type", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.PAYLOCITY);
    await io.homePage.loadingTime();

    await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.ICLIENT_ID, "iClientId is not displayed, but should be");
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.COMPANY_ID, "Company is not displayed, but should be");

    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.HELP_TEXT_ICON, 3);
    await io.assert.verifyElementContainsText(selectors.myAccountPagePO.HELP_BUBBLE,"OAuth 2.0 clients are used to securely link your integrator.io account to an external OAuth 2.0 provider for the purpose of acquiring API access tokens. OAuth 2.0 clients can be reused by any number of connections.");

    await io.homePage.click(selectors.exportsPagePO.CLOSE_ICON_HELP_POPOVER_EXPORT);

    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.HELP_TEXT_ICON, 4);
    await io.assert.verifyElementContainsText(selectors.myAccountPagePO.HELP_BUBBLE,"Enter the company ID that you provided while creating the Paylocity account.")

    test.step("*** clicked on Paylocity  adaptor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Paylocity_Connection");
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();

    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.COMPANY_ID, "A value must be provided")
  });
});
