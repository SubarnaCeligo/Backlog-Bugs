
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C28443_Verify_if_an_error_is_shown_on_UI_when_tryig_to_authorize_the_connection_without_providing_the_mandatory_values.", () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T4537 @Env-All TC_C28443_Pagerduty_connection_type", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click("[data-test='PagerDuty']");
    await io.homePage.loadingTime();
    test.step("*** clicked on Pagerduty  adaptor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Pagerduty_Connection");
    test.step("*** Naming the Pagerduty Connection  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on save and Authorize without providing mandatory fields    ***", async ()=>{});
    test.step("*** Clicking on API Key  field   ***", async ()=>{});

    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.HTTP_CONNECTOR_API_ID, "A value must be provided");
  });
});
