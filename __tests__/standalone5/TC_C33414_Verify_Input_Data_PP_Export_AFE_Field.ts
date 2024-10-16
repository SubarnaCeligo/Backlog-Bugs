
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/STANDALONE/TC_C33414_Verify_Input_Data_PP_Export_AFE_Field.json";
import FTP from "@testData/STANDALONE/ftp_connection.json";

test.describe("TC_C33414_Verify_Input_Data_PP_Export_AFE_Field", () => {
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
  test("@Zephyr-IO-T5524 @Env-All TC_C33414_Verify_Input_Data_PP_Export_AFE_Field", async ({io,page}, testInfo) => {
    flowID = await io.createResourceFromAPI(HTTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on Import button ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 1);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on directory path Handle bar ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.DIRECTORYHANLEBAR);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Verifying input data PP export AFE Field ***", async ()=>{});
    var data = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("Drug @ Name",data, "");
    await io.assert.expectToContainValue("Naproxen and Esomeprazole Magnesium",data, "");
    await io.assert.expectToContainValue("#Number",data, "");
    await io.assert.expectToContainValue("6495195850",data, "");

    test.step("*** Clicking on Directory Handlebar close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER_BUTTON);
    await io.homePage.loadingTime();

    test.step("*** Clicking on Filename starts with Handle bar ***", async ()=>{});
    await io.homePage.clickButtonByIndex('[data-testid="file-name"] + div svg', 0);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Verifying input data PP export AFE Field ***", async ()=>{});
    var data1 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("Drug @ Name",data1, "");
    await io.assert.expectToContainValue("Naproxen and Esomeprazole Magnesium",data1, "");
    await io.assert.expectToContainValue("#Number",data1, "");
    await io.assert.expectToContainValue("6495195850",data1, "");

    test.step("*** Clicking on Filename starts with Handlebar close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER_BUTTON);
    await io.homePage.loadingTime();

    test.step("*** Clicking on Filename ends with Handle bar ***", async ()=>{});
    await io.homePage.clickButtonByIndex('[data-testid="file-name"] + div svg', 1);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Verifying input data PP export AFE Field ***", async ()=>{});
    var data2 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("Drug @ Name",data2, "");
    await io.assert.expectToContainValue("Naproxen and Esomeprazole Magnesium",data2, "");
    await io.assert.expectToContainValue("#Number",data2, "");
    await io.assert.expectToContainValue("6495195850",data2, "");

    test.step("*** Clicking on Filename ends with Handlebar close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER_BUTTON);
    await io.homePage.loadingTime();

    test.step("*** Clicking FTP advanced ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);

    test.step("*** Clicking on Backup Files path handler ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.BACKUPFILESPATH, 1);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Verifying input data PP export AFE Field ***", async ()=>{});
    var data3 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("Drug @ Name",data3, "");
    await io.assert.expectToContainValue("Naproxen and Esomeprazole Magnesium",data3, "");
    await io.assert.expectToContainValue("#Number",data3, "");
    await io.assert.expectToContainValue("6495195850",data3, "");

    test.step("*** Clicking on Back Up File Handlebar close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER_BUTTON);

    test.step("*** Clicking on close button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
  });
});
