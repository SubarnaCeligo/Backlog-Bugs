
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C22653", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C22653_Case1", async ({io,page}, testInfo) => {
    await io.homePage.clickUploadIntegrationButton();
    await test.step("*** Clicken on Install Zip ***",()=>{});

    const map = new Map();
    var filepath = "/FTP_uploads/632c128f0d23ce7ba882938e.zip";
    map.set("uploadFile", filepath);
    await io.homePage.zipUpload(map);
    

    const flow = await page.locator(selectors.flowGroupingPagePO.FLOWS);
    const areaExpand = await flow.getAttribute("aria-expanded");
    await await io.assert.expectToBeValue(areaExpand, "true", "");
    var name1 = selectors.flowBuilderPagePO.NAME_WDIO
    await io.assert.expectToBeValue(name1, "Name", "");

    var description1 = selectors.flowBuilderPagePO.DESCRIPTION_WDIO
    await io.assert.expectToBeValue(description1, "Description", "");

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
    await io.homePage.click(selectors.integrationPagePO.APPLYBUTTONDATERANGESELECTOR);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.templatePagePO.PROCEED_BUTTON);


    var title = selectors.integrationPagePO.INTNAME
    await io.assert.expectToBeValue(title, "Install integration", "");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
  test("TC_C22653_Case2", async ({io,page}, testInfo) => {
    await io.homePage.isPageLoaded();
    await io.homePage.click(selectors.basePagePO.MARKETPLACE);
    await test.step("*** Clicked on Marketplace ***",()=>{});
    await io.homePage.isPageReady();
    await io.homePage.clearTextValue("//input[@type='text']");
    await io.homePage.fillWebPage("//input[@type='text']", "Microsoft SQL");
    await io.homePage.isPageReady();
    await io.homePage.isPageReady();
    const dropDownItem = await page.$$(selectors.homePagePO.INSTALL_TEMPLATE);
    await io.homePage.isPageLoaded();
    await dropDownItem[0].click();
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    const flows = await page.locator(selectors.flowGroupingPagePO.FLOWS);
    const areaExpanded = await flows.getAttribute("aria-expanded");
    await await io.assert.expectToBeValue(areaExpanded, "true", "");
    var name = selectors.flowBuilderPagePO.NAME_WDIO
    await io.assert.expectToBeValue(name, "Name", "");

    var description = selectors.flowBuilderPagePO.DESCRIPTION_WDIO
    await io.assert.expectToBeValue(description, "Description", "");

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

    await io.homePage.click(".MuiButtonBase-root.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-disableElevation");


    var title = selectors.integrationPagePO.INTNAME
    await io.assert.expectToBeValue(title, "Install integration", "");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
});
