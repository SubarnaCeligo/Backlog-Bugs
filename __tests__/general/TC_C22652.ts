
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C22652", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C22652", async ({io,page}, testInfo) => {
    await io.homePage.clickUploadIntegrationButton();
    await test.step("*** Clicken on Install Zip ***",()=>{});

    const map = new Map();
    var filepath = "/FTP_uploads/632c128f0d23ce7ba882938e.zip";
    map.set("uploadFile", filepath);
    await io.homePage.zipUpload(map);

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

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

    await io.homePage.click(selectors.integrationPagePO.APPLYBUTTONDATERANGESELECTOR);


    var title = selectors.integrationPagePO.INTNAME
    await io.assert.expectToBeValue(title, "Install integration", "");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
});
