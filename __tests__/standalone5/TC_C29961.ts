import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTPAcumatica from "@testData/STANDALONE/TC_C29961.json";

test.describe("TC_C29961", () => {
  let flowID;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId([flowID]);
    test.step("** Deleted flow **", async () => { });
  });
  test("@Zephyr-IO-T9930 @Env-All TC_C29961", async ({io,page}, testInfo) => {
    flowID = await io.createResourceFromAPI(HTTPAcumatica, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** cliking on the created Http Lookup ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.IMPORTLOOKUP);
    await io.homePage.loadingTime();
    
    await io.homePage.isVisible(selectors.importPagePO.HTTP_RELATIVEURI);
    await io.homePage.click(selectors.importPagePO.HTTP_RELATIVEURI);
    test.step("*** Clicking On Relative Url ***", async ()=>{});
    await io.homePage.loadingTime();
    var paste = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("previous_page",paste, "");
    await io.assert.expectToContainValue("full_response",paste, "");
    await io.assert.expectToContainValue("connection",paste, "");
    await io.assert.expectToContainValue("export",paste, "");
    await io.assert.expectToContainValue("settings",paste, "");
    test.step("***  Verified Model Format in AFE 2.0 For Skip Paging in Relative URI  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("***  Closing Relative URI Page  ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isVisible(selectors.exportsPagePO.HTTP_BODY);
    await io.homePage.click(selectors.exportsPagePO.HTTP_BODY);
    test.step("*** Clicking On Request Body ***", async ()=>{});
    await io.homePage.loadingTime();
    var pastee = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("previous_page",pastee, "");
    await io.assert.expectToContainValue("full_response",pastee, "");
    await io.assert.expectToContainValue("connection",pastee, "");
    await io.assert.expectToContainValue("export",pastee, "");
    await io.assert.expectToContainValue("settings",pastee, "");
    test.step("***  Verified Model Format in AFE 2.0 For skip  Paging in Http Request Body   ***", async ()=>{});
  });
});
