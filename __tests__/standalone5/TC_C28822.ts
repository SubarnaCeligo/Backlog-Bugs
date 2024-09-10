
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C28822_Verify_if_an_error_is_shown_when_tryig_to_authorize_the_connection_with_providing_theInvalid _values.", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T4545 @Env-All TC_C28822_Paylocity_connection_type", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.PAYLOCITY);
    await io.homePage.loadingTime();
    test.step("*** clicked on Paylocity  adaptor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Paylocity_Connection");
    test.step("*** Naming the Paylocity Connection  ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.ENVIRONMENT);
    test.step("*** clicked on environment field   ***", async ()=>{});

    await io.homePage.click('[data-value="apisandbox"]')
    test.step("*** selecting the sandbox   ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.COMAPNY, "S2222");
    test.step("*** Naming the Company id  ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.ICLIENT_ID);
    test.step("*** Clicking on Iclient field   ***", async ()=>{});
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    test.step("*** Selecting the Iclient   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    test.step("*** Clicking on Test Connection  ***", async ()=>{});
    await io.myAccountPage.waitForElementAttached(selectors.basePagePO.NOTIFICTION_BAR)
    
    var result = await io.homePage.getTextFromElement(selectors.basePagePO.NOTIFICTION_BAR, "Your test was not successful. Check your information and try again");
    await io.assert.expectToBeTrue(result, "");
  });
});
