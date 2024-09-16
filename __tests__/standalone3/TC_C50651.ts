import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/TC_C50651.json";

test.describe("TC_C50651", () => {
  test("@Zephyr-IO-T23344 @Env-All TC_C50651_Verify_userAble_To_CreateConnection_without_Adding_TokenPaths", async ({ io, page }, testInfo) => {
    test.step("** Getting response from post request ***", async () => { });
    await io.api.postCall("v1/connections", JSON.stringify(FTP.PostBody));
    test.step("** Creating Connection from post request ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("** Navigating to Home Page ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Connections");
    test.step("*** clicked on connection button ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C50651_Connection");
    await io.homePage.loadingTime();
    var connName = await io.homePage.getText(selectors.myAccountPagePO.CONN_NAME);
    await io.assert.expectToBeValue(String(connName), "TC_C50651_Connection", "");
    test.step("*** Verified Connection should be created in IO ***", async () => { });
    var connNameStatus = await io.homePage.getText(selectors.basePagePO.CONNSTATUS);
    await io.assert.expectToContainValue("Online", String(connNameStatus), "");
    test.step("*** Verified Connection should be Online ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    // confirm  delete 
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
    test.step("** clicked on confirm Delete **", async () => { });
  });
});
