
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/STANDALONE/TC_C22697.json";

test.describe("TC_22697", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await io.api.deleteConnectionViaName("C22697_Microsoft Teams Connection");
  });

  test("@Env-All @Zephyr-IO-T4637 TC_22697", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.MTEAM);
    await io.homePage.loadingTime();
    test.step("*** clicked on Microsoft Teams adaptor ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "C22697_Microsoft Teams Connection");
    test.step("*** Name the Microsoft Teams connection ***", async ()=>{});

    var kbDOc = await io.homePage.isVisible("[href*='/360057833071-Set-up-a-connection-to-Microsoft-Teams']");
    await io.assert.expectToBeTrue(kbDOc, "");
    test.step("*** Verifying  KB doc hyperlink is visible   ***", async ()=>{});

    await io.assert.verifyElementToBeClickable("[href*='/360057833071-Set-up-a-connection-to-Microsoft-Teams']")
    test.step("*** Verifying  KB doc hyperlink is clickable   ***", async ()=>{});
    test.step("*** Verifying  KB doc link is present is create connection form    ***", async ()=>{});
    
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
