import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/Flows/create/ftp/FTPExport_GroupedData_InputFilter.json"

test.describe("TC_C29585_FTP_Export_grouping_validation", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T11671 @Env-All TC_C29585_FTP_Export_grouping_validation", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on FTP Export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();

    test.step("*** Editing field of FTP Export ***", async ()=>{});
    await io.homePage.click("//input[@name='hasHeaderRow']");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    test.step("*** Verifying the old grouping fields in FTP Export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.SORTANDGROUP);
    let data = await io.homePage.isVisible("//span[contains(text(),'LastName')]");
    await io.assert.expectToBeTrue(data, "");
  });
});
