
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C22563", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    
  });
  test("@Env-All @Zephyr-IO-T4633 TC_C22563", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** selecting HTTP adaptor  ***", async ()=>{});
    let result1 = await io.homePage.getText(selectors.connectionsPagePO.HTTPCONNECTIONGUIDELINK);
    await io.assert.expectToBeValue(String(result1), "Connection guide", "");

    let result2 = await io.homePage.getElement(selectors.marketplacePagePO.HTTP);
    expect(result2).toBeDefined();
    test.step(" *** Verify that  connection form with respective connection guide link is shown *** ", async ()=>{});
    var kbDOc = await io.homePage.isVisible(selectors.connectionsPagePO.HTTPCONNECTIONGUIDELINK);
    await io.assert.expectToBeTrue(kbDOc, "");
    test.step("*** Verifying  KB doc hyperlink is visible   ***", async ()=>{});
    await io.assert.verifyElementToBeClickable(selectors.connectionsPagePO.HTTPCONNECTIONGUIDELINK)
    
    test.step("*** Verifying clicking on the link is redirecting to the respective connection guide page in KB   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
