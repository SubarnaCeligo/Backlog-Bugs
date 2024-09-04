
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/STANDALONE/ftp_connection.json";

test.describe("Verification of various records file uploads", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T8191 TC_001_C23843_verification_of_various_records_file_uploads", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    test.step("*** Selected FTP as the adaptor ***", async ()=>{});

    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});

    var conn = FTP[0]["connectionId"];

    await io.homePage.fillWebPage(selectors.exportsPagePO.CREATE_SELECT_CONNECTION, conn);
    await io.homePage.loadingTime();
    test.step("*** Choosing the desired FTP connection ***", async ()=>{});


    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "FTP_export_preview_record_verification");
    test.step("*** Renaming the PageGenerator ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.exportsPagePO.FILE_TYPE, "json");
    test.step("*** Selecting the file type from the DROPDOWN ***", async ()=>{});

    var map = new Map();
    var filepath = "/FTP_uploads/TC_C23843_1_records.json";
    map.set("uploadFile", filepath);
    var upload = await io.homePage.fileUpload(map);
    await io.homePage.loadingTime();
    test.step("*** Uploading the desired File ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    test.step("*** Clicking on PREVIEW ***", async ()=>{});

    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.SELECT_PREVIEW_RECORDS);
    await page.keyboard.type("1");
    await io.homePage.loadingTime();
    test.step("*** Entering the desired number of records want to view ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    test.step("*** Clicking on PREVIEW ***", async ()=>{});
    const exRecord = await page.locator(
      "//button[@data-test='fetch-preview']/../../div[3]/div[2]"
    ).textContent();
    
    if(exRecord.indexOf("1 Page, 1 Record") > -1) {
      test.step("*** Checking the number of data per records ***", async ()=>{});
    }
    test.step("*** Checking the number of data per records ***", async ()=>{});

    map = new Map();
    filepath = "/FTP_uploads/TC_C23843_10_records.json";
    map.set("uploadFile", filepath);
    upload = await io.homePage.fileUpload(map);
    await io.homePage.loadingTime();
    test.step("*** Uploading the desired File ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    test.step("*** Clicking on PREVIEW ***", async ()=>{});

    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.SELECT_PREVIEW_RECORDS);
    await page.keyboard.type("10");
    await io.homePage.loadingTime();
    test.step("*** Entering the desired number of records want to view ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    test.step("*** Clicking on PREVIEW ***", async ()=>{});

    const exRecord1 = await page.locator(
      "//button[@data-test='fetch-preview']/../../div[3]/div[2]/p"
    ).textContent();
    if(exRecord1.indexOf("1 Page, 10 Records") > -1) {
      test.step("*** Checking the number of data per records ***", async ()=>{});
    }

    map = new Map();
    filepath = "/FTP_uploads/TC_C23843_100_records.json";
    map.set("uploadFile", filepath);
    upload = await io.homePage.fileUpload(map);
    test.step("*** Uploading the desired File ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    test.step("*** Clicking on PREVIEW ***", async ()=>{});

    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.SELECT_PREVIEW_RECORDS);
    await page.keyboard.type("100");
    test.step("*** Entering the desired number of records want to view ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    test.step("*** Clicking on PREVIEW ***", async ()=>{});

    const exRecord2 = await page.locator(
      "//button[@data-test='fetch-preview']/../../div[3]/div[2]/p"
    ).textContent();
    if(exRecord2.indexOf("1 Page, 100 Records") > -1) {
      test.step("*** Checking the number of data per records ***", async ()=>{});
    }
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
    test.step("*** Closing the export ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on Discard Changes on the pop-up ***", async ()=>{});
  });
});
