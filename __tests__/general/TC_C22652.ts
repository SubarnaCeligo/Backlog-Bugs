import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
 


test.describe("TC_C22652", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T2257 @Env-All  TC_C22652", async ({io,page}, testInfo) => {
    await io.homePage.clickUploadIntegrationButton();
    await test.step("*** Clicken on Install Zip ***",()=>{});

    var filepath = "/testData/assets/FTP_uploads/33486.zip";
    await io.homePage.zipUpload(filepath);

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

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
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
});
