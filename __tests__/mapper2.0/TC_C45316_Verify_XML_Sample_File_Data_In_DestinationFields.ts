
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC45316 from "@testData/Mapper2.0/TC_C45316_Verify_XML_Sample_File_Data_In_DestinationFields.json";
import { allure } from "allure-playwright";

test.describe("TC_C45316_Verify_XML_Sample_File_Data_In_DestinationFields", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T18450 TC_C45316_Verify_XML_Sample_File_Data_In_DestinationFields", async ({io,page}, testInfo) => {
    test.step("*** Create flow ***", async ()=>{});
    await io.createResourceFromAPI(TC45316, 'FLOWS');

    test.step("*** Click on created import ***", async ()=>{});
    await io.homePage.click(
      await selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();

    var filepath = "/FTP_uploads/TC_C45316.xml";
    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles(`testData/assets${filepath}`);
    await io.homePage.loadingTime();

    test.step("*** Save and close the import ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    test.step("*** Click on import mappings ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

    test.step("*** Click on auto populate fields ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.OPENACTIONSMENU,
      2
    );
    await io.homePage.click(selectors.importPagePO.AUTO_POPULATE_MAPPINGS);

    test.step("*** Expand the Fields ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.EXPAND_ALL);
    await io.homePage.loadingTime();

    await test.step("*** Verifying the fileds as per the sample data ***", async ()=>{});
    var data: string[] = ["name", "url", "phone", "email"];

    let ele = await page.$$(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER);
    let flag = 0;
    for (let i = 0; i < ele.length; i++) {
      if (data.includes(await ele[i].getAttribute("value"))) {
        flag++;
      }
    }
    let valid = flag == data.length;
    await io.assert.expectToBeTrue(valid, "");

    test.step("*** Closing the import mappings***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );

    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
