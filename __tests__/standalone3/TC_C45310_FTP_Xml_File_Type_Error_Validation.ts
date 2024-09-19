import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/ftp_connection.json";

test.describe("TC_C45310_FTP_Xml_File_Type_Error_Validation", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
  });
  test("@Zephyr-IO-T18452 @Env-All TC_C45310_FTP_Xml_File_Type_Error_Validation", async ({io,page}, testInfo) => {
    test.step("*** Clicking on create flow ***", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime()
    test.step("*** Clicking on export button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

    test.step("*** selecting FTP ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);

    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.TRANSFER_FILES);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime() 

    test.step("*** Choosing the desired FTP connection ***", async ()=>{});
    var conn = FTP[0]["FTPStage_Standalone3"];
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.loadingTime();
    test.step("*** Enter the name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "test");

    test.step("*** Select file type as xlsx ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.FILE_TYPE, "xml");
    await io.homePage.loadingTime();

    test.step("*** upload the sample data greater than 10mb***", async ()=>{});
    const fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput1.setInputFiles(`testData/assets/FTP_uploads/TC_C45310.xml`);
    await io.homePage.loadingTime();

    test.step("*** Validating the error message ***", async ()=>{});
    var data = await io.homePage.getText(selectors.myAccountPagePO.NAMEVALIDATION);
    await io.assert.expectToContainValue("File exceeds max file size",String(data), "");

    test.step("*** upload the sample data of typ json***", async ()=>{});
    const fileInput2 = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput2.setInputFiles(`testData/assets/FTP_uploads/TC_C32404.json`);
    await io.homePage.loadingTime();

    test.step("*** Validating the error message ***", async ()=>{});
    var erorMsg = await io.homePage.getText(selectors.myAccountPagePO.NAMEVALIDATION);
    await io.assert.expectToContainValue("Please select valid xml file",String(erorMsg), "");

    test.step("*** Closing the import***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
  });
});
