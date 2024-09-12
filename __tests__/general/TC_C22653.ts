import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C22653", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T2258 @Env-All TC_C22653_Case1", async ({io,page}, testInfo) => {
    await io.homePage.clickUploadIntegrationButton();
    await test.step("*** Clicken on Install Zip ***",()=>{});

    var filepath = "/testData/assets/FTP_uploads/33486.zip";
    await io.homePage.zipUpload(filepath);
    

    const flow = await page.locator(selectors.flowGroupingPagePO.FLOWS);
    const areaExpand = await flow.getAttribute("aria-expanded");
    await await io.assert.expectToBeValue(areaExpand, "true", "");
    var name1 = (await io.homePage.getText(selectors.flowBuilderPagePO.NAME_WDIO)).toString()
    var name = name1.split(",")
    await io.assert.expectToBeValue(name[1], "Name", "");

    var description1 = (await io.homePage.getText(selectors.flowBuilderPagePO.DESCRIPTION_WDIO)).toString()
    var description = description1.split(",")
    await io.assert.expectToBeValue(description[1], "Description", "");

    const integration1 = await page.locator(
      selectors.flowGroupingPagePO.INTEGRATIONS
    );
    const areaExpand1 = await integration1.getAttribute("aria-expanded");
    await await io.assert.expectToBeValue(areaExpand1, "false", "");

    const Connections1 = await page.locator(
      selectors.flowGroupingPagePO.CONNECTIONS
    );
    const areaExpand2 = await Connections1.getAttribute("aria-expanded");
    await await io.assert.expectToBeValue(areaExpand2, "false", "");

    const Exports1 = await page.locator(selectors.flowGroupingPagePO.EXPORT);
    const areaExpand3 = await Exports1.getAttribute("aria-expanded");
    await await io.assert.expectToBeValue(areaExpand3, "false", "");

    const Imports1 = await page.locator(selectors.flowGroupingPagePO.IMPORT);
    const areaExpand4 = await Imports1.getAttribute("aria-expanded");
    await await io.assert.expectToBeValue(areaExpand4, "false", "");
    await io.homePage.loadingTime();
    await io.homePage.clickByText("Install integration")
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.templatePagePO.PROCEED_BUTTON);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
  test("@Zephyr-IO-T2258 @Env-All TC_C22653_Case2", async ({io,page}, testInfo) => {
    await io.homePage.isPageLoaded();
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(
      io.connectorUrl + "marketplace"
    );
    await io.homePage.loadingTime();
    await test.step("*** Clicked on Marketplace ***",()=>{});
    await io.homePage.isPageReady();
    // await io.homePage.clearTextValue(selectors.marketplacePagePO.SEARCH_MARKETPLACE);
    await io.homePage.click(selectors.marketplacePagePO.SEARCH_MARKETPLACE);
 
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "Microsoft SQL");
    await io.homePage.isPageReady();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    const dropDownItem = await page.$$(selectors.homePagePO.INSTALL_TEMPLATE);
    await io.homePage.isPageLoaded();
    await dropDownItem[0].click();
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    const flows = await page.locator(selectors.flowGroupingPagePO.FLOWS);
    const areaExpanded = await flows.getAttribute("aria-expanded");
    await await io.assert.expectToBeValue(areaExpanded, "true", "");
    var name1 = (await io.homePage.getText(selectors.flowBuilderPagePO.NAME_WDIO)).toString()
    var name = name1.split(",")
    await io.assert.expectToBeValue(name[0], "Name", "");

    var description1 = (await io.homePage.getText(selectors.flowBuilderPagePO.DESCRIPTION_WDIO)).toString()
    var description = description1.split(",")
    await io.assert.expectToBeValue(description[0], "Description", "");

    const integration = await page.locator(
      selectors.flowGroupingPagePO.INTEGRATIONS
    );
    const areaExpanded1 = await integration.getAttribute("aria-expanded");
    await await io.assert.expectToBeValue(areaExpanded1, "false", "");

    const Connections = await page.locator(
      selectors.flowGroupingPagePO.CONNECTIONS
    );
    const areaExpanded2 = await Connections.getAttribute("aria-expanded");
    await await io.assert.expectToBeValue(areaExpanded2, "false", "");

    const Exports = await page.locator(selectors.flowGroupingPagePO.EXPORT);
    const areaExpanded3 = await Exports.getAttribute("aria-expanded");
    await await io.assert.expectToBeValue(areaExpanded3, "false", "");

    const Imports = await page.locator(selectors.flowGroupingPagePO.IMPORT);
    const areaExpanded4 = await Imports.getAttribute("aria-expanded");
    await await io.assert.expectToBeValue(areaExpanded4, "false", "");
    await io.homePage.clickByText("Install now");
    
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
});
