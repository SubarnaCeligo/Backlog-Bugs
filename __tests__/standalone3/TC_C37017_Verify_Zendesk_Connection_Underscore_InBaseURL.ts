import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import * as Zendesk from "@testData/STANDALONE/TC_C37017_Verify_Zendesk_Connection_Underscore_InBaseURL.json";

test.describe("TC_C37017_Verify_Zendesk_Connection_Underscore_InBaseURL", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
  });
  test("@Zephyr-IO-T4708 @Env-All TC_C37017_Verify_Zendesk_Connection_Underscore_InBaseURL", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.click(selectors.flowBuilderPagePO.ZENDESKSUPPORT);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, Zendesk.name);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.AUTHORIZATIONTYPE, "basic");
    await io.homePage.fillWebPage(selectors.connectionsPagePO.SUBDOMAINZENDESK, Zendesk.subDomain);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.BASICUSERNAME, Zendesk.userName);
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BASIC_PASSWORD, decrypt(Zendesk.passoword));
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    const error = await io.homePage.getText(selectors.basePagePO.DIALOGBOX);
    await io.assert.expectNotToContainValue("underscore", String(error), "");

    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    await io.homePage.loadingTime();

    var expec = await io.homePage.isVisible(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.assert.expectToBeTrue(expec, "");
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, Zendesk.name);
    await io.homePage.click(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    // confirm  delete 
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
  });
});
