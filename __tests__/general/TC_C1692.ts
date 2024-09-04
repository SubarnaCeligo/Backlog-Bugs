import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C1692", () => {
  test.beforeEach(async ({io}) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.goToFlowsPage();
  });
  test("@Zephyr-IO-T2230 @Env-All  TC_C1692 Verify save button is in disabled state unless a change is made to the readme field in general settings page", async ({io,page}, testInfo) => {
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await test.step("*** Navigating to   Flows page ***",()=>{});
    
    await io.homePage.click('[data-test="Admin"]');

    await io.homePage.click(selectors.flowBuilderPagePO.README);
    await test.step("*** Opening the  Readme doc ***",()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.LAUNCH_EDITOR);
    await io.homePage.loadingTime();
    const button = selectors.basePagePO.SAVE;

    await io.assert.verifyElementNotToBeClickable(button)
    await test.step("*** Veryfying save button is disabled ***",()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.integrationPagePO.READMEEDITOR, "HFSJDFJ");
    const button1 = selectors.basePagePO.SAVE;
    await io.homePage.loadingTime();
    await io.assert.verifyElementToBeClickable(button1)
    await test.step("*** Verified save button is in disabled state unless a change is made to the readme field in general settings page ***",()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    await test.step(" Navigating to Home Page",()=>{});
  });
});
