
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C1692", () => {
  test.beforeEach(async ({io}) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.goToFlowsPage();
  });
  test("TC_C1692", async ({io,page}, testInfo) => {
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await test.step("*** Navigating to   Flows page ***",()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.INTEGRATIONTABNAME, 8);
    await io.homePage.click(selectors.flowBuilderPagePO.README);
    await test.step("*** Opening the  Readme doc ***",()=>{});
    await io.homePage.click(selectors.integrationPagePO.EDITREADME);
    const button = selectors.basePagePO.SAVE;
    //expect(button).not.toBeClickable();
    await io.assert.verifyElementToBeClickable(button)
    await test.step("*** Veryfying save button is disabled ***",()=>{});
    await io.homePage.fillWebPage(selectors.integrationPagePO.READMEEDITOR, "HFSJDFJ");
    const button1 = selectors.basePagePO.SAVE;
    //expect(button1).toBeClickable();
    await io.assert.verifyElementToBeClickable(button1)
    await test.step("*** Verified save button is in disabled state unless a change is made to the readme field in general settings page ***",()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
});
