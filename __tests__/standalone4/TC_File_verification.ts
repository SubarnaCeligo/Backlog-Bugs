
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/ftp_connection.json";

test.describe("File_verification Verification of file uploads to check there correctness | Golden", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("TC_001_C29688_checking_file_uploaded_newly_is_displaying_correctly_or_not @Env-All @Zephyr-IO-T2885", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.FTP);
    test.step("*** Selected FTP as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var conn = FTP[0]["connectionId"];

    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.clickByText("FTP CONNECTION");
    test.step("*** Choosing the desired FTP connection ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "FTP_export_preview_button_verification");
    test.step("*** Renaming the PageGenerator ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.FILE_TYPE, "json");
    test.step("*** Selecting the file type from the DROPDOWN ***", async ()=>{});

    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/assets/FTP_uploads/ftp_verification.json");
    await io.homePage.loadingTime();
    test.step("*** Uploading the desired File ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    test.step("*** Clicking on PREVIEW ***", async ()=>{});
    await io.homePage.loadingTime();
    const res1 = await io.homePage.getText(selectors.flowBuilderPagePO.PARSED_OP_KEY);
    const for_res1 = await io.homePage.removeInvertedCommas(res1);
    const res2 = await io.homePage.getText(selectors.flowBuilderPagePO.PARSED_OP_VALUE);
    const for_res2 = await io.homePage.removeInvertedCommas(res2);
    const res3 = for_res1 + ":" + for_res2;
    await io.assert.expectToContainValue(res3, FTP[0].expected, "");
    test.step("*** Checking that correct data is displaying or not test.afterEach clicking preview ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
    test.step("*** Closing the export ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on Discard Changes on the pop-up ***", async ()=>{});
  });
});
