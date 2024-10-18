
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("C28442 TC_C28441_Pagerduty_connection_type.", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T4536 @Zephyr-IO-T4535 C28442 TC_C28441_Verify_the_field_names_and_help_text ", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click("[data-test='PagerDuty']");
    test.step("*** clicked on Pagerduty  adaptor ***", async ()=>{});
    const httpMethod = await page.$(selectors.basePagePO.HTTP_2DOT0);
    if (httpMethod) {
      await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
      await io.homePage.loadingTime();
    }
    
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Pagerduty_Connection");
    test.step("*** Naming the Pagerduty Connection  ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    test.step("*** Clicking on Authentication Type  fields    ***", async ()=>{});
    await io.homePage.click( selectors.flowBuilderPagePO.MANUAL);
    test.step("*** Selecting the Token  type   ***", async ()=>{});
    var result = await io.homePage.getTextFromElement("[for='http.auth.type']", "Auth type");
    await io.assert.expectToBeTrue(result, "");
    test.step("*** Validation of 'Authentication type' field  is displaying or not  ***", async ()=>{});
    var rest = await io.homePage.isVisible("[id='http.auth.type'] [data-test='help-text-icon']"); 
    await io.assert.expectToBeTrue(rest, "");
    test.step("*** Checking that the Authentication type  helptext is getting displayed or not ***", async ()=>{});
    var results = await io.homePage.getTextFromElement("[for='http.auth.token.token']", "Token");
    await io.assert.expectToBeTrue(results, "");
  });
});
