
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/GENERAL/TC_C2221_installTemplate.json";

test.describe("TC_C2221_installTemplate", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C2221_installTemplate", async ({io,page}, testInfo) => {
    await test.step("*** Navigating to Salesforce - FTP template in marketplace ***",()=>{});
    if(process.env["NODE_ENV"] == "qa" || process.env["NODE_ENV"] == "qaprod") {
      await io.homePage.navigateTo(TC.qa_url);

      await io.homePage.isPageReady();
      await io.homePage.isPageLoaded();
    } else {
      await io.homePage.navigateTo(TC.stag_url);

      await io.homePage.isPageReady();
      await io.homePage.isPageLoaded();
    }

    await io.homePage.click(".MuiButtonBase-root.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-disableElevation");

    await io.homePage.isPageReady();
    await io.homePage.isPageLoaded();

    await io.homePage.click(selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON);
    await io.homePage.click("[data-test='existing']");
    if(process.env["NODE_ENV"] == "qa" || process.env["NODE_ENV"] == "qaprod") {
      await io.homePage.fillWebPage(selectors.basePagePO.CONNECTION, TC.qaFTP);
    } else {
      await io.homePage.fillWebPage(selectors.basePagePO.CONNECTION, TC.stagFTP);
    }
    await io.homePage.click(selectors.basePagePO.SAVE);

    await io.homePage.isPageReady();
    await io.homePage.isPageLoaded();

    await io.homePage.click(selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON);
    await io.homePage.click("[data-test='existing']");
    if(process.env["NODE_ENV"] == "qa" || process.env["NODE_ENV"] == "qaprod") {
      await io.homePage.fillWebPage(selectors.basePagePO.CONNECTION, TC.qaSales);
    } else {
      await io.homePage.fillWebPage(selectors.basePagePO.CONNECTION, TC.stagSales);
    }
    await io.homePage.click(selectors.basePagePO.SAVE);

    await io.homePage.isPageReady();
    await io.homePage.isPageLoaded();
    await io.homePage.click(selectors.basePagePO.INSTALL);
    await io.homePage.isPageReady();
    await io.homePage.isPageLoaded();
    await test.step("*** Navigating to resources page ***",()=>{});
    const resources = await page.locator(
      selectors.basePagePO.EXPORTS
    );
    if(!(await resources.isVisible())) {
      await(await page.locator(selectors.basePagePO.RESOURCES)
      ).hover();
    }
    await io.homePage.isPageReady();
    await io.homePage.isPageLoaded();

    await test.step("*** Navigating to exports page ***",()=>{});
    await io.homePage.goToMenu("Resources","Exports");
    await io.homePage.isPageLoaded();
    await test.step("** Entered Exports Page **",()=>{});
    await io.homePage.click(selectors.basePagePO.SEARCH_RECYCLEBIN);

    await test.step("*** Searching export with name ***",()=>{});
    await io.homePage.fillWebPage(selectors.basePagePO.SEARCH_RECYCLEBIN, "Get Salesforce leads");
    await test.step("*** Open export ***",()=>{});
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.CLICKONCONNECTION, "Get Salesforce leads");
    await test.step("*** Clicked on close ***",()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
