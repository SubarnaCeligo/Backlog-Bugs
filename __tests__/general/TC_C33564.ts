
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C33564.json";


test.describe("TC_C33564", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C33564", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    await test.step("*** Clicking on Profile ***",()=>{});
    await io.homePage.click(selectors.basePagePO.MY_PROFILE_BUTTON);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await test.step("*** Validating check box ***",()=>{});

    await io.homePage.click(selectors.basePagePO.DATEFORMAT);
    await io.homePage.clickButtonByIndex("//*[@role='menuitem']", 3);

    var val = await page.locator(
      selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX
    ).isChecked();
    await io.homePage.isPageLoaded();
    if(val === true) {
      await test.step("*** Clicking on check box is true ***",()=>{});
    } else {
      await io.homePage.click(selectors.myAccountPagePO.SHOWTIMESTAMPRELATIVE);
      await test.step("*** Clicking On check box ***",()=>{});
      await io.homePage.click(selectors.basePagePO.MFA_SAVE);
      await test.step("*** Clicked on Save Button ***",()=>{});
    }
    await io.homePage.isPageLoaded();
    await io.goToFlowsPage();
    const search = await page.locator(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await search.isVisible();
    await io.homePage.click(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.homePage.fillWebPage(selectors.basePagePO.SEARCH_RECYCLEBIN, FTP.name);
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowGroupingPagePO.CLICKONFLOWGROUP, FTP.name);

    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    const FlowName = await page.locator(
      "//label[text()='Date']/parent::div/div/*[@aria-invalid='false']"
    );
    var x = await FlowName.getAttribute("placeholder");
    await await io.assert.expectToBeValue(x, "DD MMMM, YYYY", "");

    await test.step(" Verified date format during flow run ***",()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    await test.step("*** Clicking on Profile ***",()=>{});
    await io.homePage.click(selectors.basePagePO.MY_PROFILE_BUTTON);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await test.step("*** Clicked on Profile ***",()=>{});

    await io.homePage.click(selectors.basePagePO.DATEFORMAT);
    await io.homePage.click(selectors.basePagePO.NEWDATECLICK);

    await io.homePage.click(selectors.myAccountPagePO.SHOWTIMESTAMPRELATIVE);
    await test.step("*** Clicking On check box ***",()=>{});
    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    await test.step("*** Clicked on Save Button ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.goToFlowsPage();
    await io.homePage.click(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.homePage.fillWebPage(selectors.basePagePO.SEARCH_RECYCLEBIN, FTP.name);
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowGroupingPagePO.CLICKONFLOWGROUP, FTP.name);
    await io.homePage.reloadPage();
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    const FlowName1 = await page.locator(
      "//label[text()='Date']/parent::div/div/*[@aria-invalid='false']"
    );

    const y = await FlowName1.getAttribute("placeholder");
    await await io.assert.expectToBeValue(y, "MM/DD/YYYY", "");

    await test.step(" Verified date format during flow run ***",()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Naviating to Home Page ***",()=>{});
  });
});
