
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C28133_HTTP_connection_type.", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T4504 @Env-All TC_C28133_HTTP_connection_with_digest_type ", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** clicked on HTTP  adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "HTTP_Connection");
    test.step("*** Naming the HTTP Connection  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.HTTP_BASE_URI, "https://slack.com/api");
    test.step("*** Naming the Base URL Field   ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    test.step("*** Clicking on the Auth  type dropdown   ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.DIGEST);
    test.step("*** Selecting the Digest   from the dropdown  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.USERNAME_DIGEST, "test");
    test.step("*** Naming the Username  Field   ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.PASSWORD_DIGEST, "test");
    test.step("*** Naming the Password Field   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    test.step("*** Clicking on Test Connection  ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var result = await io.homePage.getTextFromElement(selectors.basePagePO.NOTIFICTION_BAR, "Your connection is working great! Nice Job!");
    await io.assert.expectToBeTrue(result, "");
    test.step("*** Validation of Connection is working fine or not ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Saving the Connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    var car = await page.$$(selectors.integrationPagePO.OPENACTIONSMENU);
    await car[0].click();
    test.step("*** Clicking on  Action menu     ***", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    test.step("*** Deleting the Connection  ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.CLOSEBUTTON);
    test.step("*** Confirm delete  ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
