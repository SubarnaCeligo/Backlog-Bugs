
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C28963_Paylocity_connection_type.", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T4546 @Env-All TC_C28963_Paylocity_connection_type", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click("[data-test='Paylocity']");
    test.step("*** clicked on Paylocity  adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Paylocity_Connection");
    test.step("*** Naming the Paylocity Connection  ***", async ()=>{});

    await io.homePage.click("[data-test='settings.env']");
    test.step("*** clicked on Environment drop down ***", async ()=>{});
    await io.homePage.click('[data-value="api"]');
    test.step("*** selecting the production  drop down ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.ICLIENT_ID);
    test.step("*** clicked on Iclient  drop down ***", async ()=>{});
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPTS_LIST, 1);
    test.step("*** selecting the Iclient from the   drop down ***", async ()=>{});
    await io.homePage.fillWebPage("[data-test='http.unencrypted.companyId']", "Comp12");
    test.step("*** Naming the Company id field  ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    test.step("*** Clicking on Test Connection  ***", async ()=>{});
    await io.myAccountPage.waitForElementAttached(selectors.basePagePO.NOTIFICTION_BAR)

    var result = await io.homePage.getTextFromElement(selectors.basePagePO.NOTIFICTION_BAR, "Your test was not successful. Check your information and try again");
    await io.assert.expectToBeTrue(result, "");
    test.step("*** Validation of Connection is not succesfull and verifying the error  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
