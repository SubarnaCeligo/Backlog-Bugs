
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/STANDALONE/TC_C2689_Verify_FTP_Connection_Error_Message_Invalid_Credentials.json";

test.describe("TC_C2689_Verify_FTP_Connection_Error_Message_Invalid_Credentials", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
  });
  test("@Env-All @Zephyr-IO-T6226 TC_C2689_Verify_FTP_Connection_Error_Message_Invalid_Credentials", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, FTP.name);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HOSTNAME, FTP.hostURI);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.USERNAME, FTP.userName);
    await io.homePage.fillWebPage(selectors.connectionsPagePO.FTP_PASSWORD, FTP.password);
    await io.homePage.click(selectors.connectionsPagePO.TEST_CONNECTION);
    await io.homePage.loadingTime();
  
    await io.homePage.click(`${selectors.basePagePO.NOTIFICATION_ID} button`);
    var result = await io.homePage.getTextFromElement(selectors.basePagePO.NOTIFICATION_ID, "Your test was not successful. Check your information and try again");
    await io.assert.expectToBeTrue(result, "");
   
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
  });
});
