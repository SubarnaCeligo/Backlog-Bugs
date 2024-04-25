import { test } from "@celigo/ui-core-automation"
import allure from "allure-playwright";
import NS from "@testData/Flows/edit/FTP-NS/TC_C30397_FTP_NS_mapping_setting.json"


test.describe("Edit Flows", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("TC_C30397_FTP_NS_mapping_setting", async ({
    io
  }, testInfo) => {
    var exportValidation, flowID, importValidation
    //*Flow Creation
    await test.step("*** Create flow through API ***", async () => {
      flowID = await io.api.createFlowFromAPI(NS.qa__dataVerification.importJSON)
    });
    //Edit Page Generator 
    await test.step("*** Edit Page Generator ***", async () => {
      exportValidation = await io.pageGenerator(
        allure,
        NS,
        flowID
      );
    });
    //Edit Page Processor 
    await test.step("*** Edit Page Processor ***", async () => {
      importValidation = await io.pageProcessor(
        allure,
        NS,
        flowID
      );
    });
    //Validate Edit flow 
    await test.step("*** Validate Edit Flow ***", async () => {
      await io.validation.validateEditFlow(
        testInfo,
        exportValidation,
        importValidation,
        NS
      );
    });
  });
});
