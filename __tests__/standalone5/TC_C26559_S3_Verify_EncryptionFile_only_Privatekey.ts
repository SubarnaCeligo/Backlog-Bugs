
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import S3 from "@testData/STANDALONE/S3_Pgp_Connection_crypto.json";

test.describe("TC_C26559_S3_Verify_EncryptionFile_only_Privatekey", () => {
  test("@Env-All @Zephyr-IO-T13704 TC_C26559_S3_Verify_EncryptionFile_only_Privatekey", async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.AMAZONS3);
    test.step("*** Clicked on AmazonS3 Adaptor ***", async ()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.TRANSFER_FILES);

    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await page.keyboard.type("S3 CONNECTION");
    var connbutton = await page.locator(
      selectors.connectionsPagePO.CONNECTIONDROP0
    );
    await connbutton.isVisible({ timeout: 20000 });
    await connbutton.click();
    test.step("*** Choosing the desired AmazonS3 connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});

    test.step("*** Entering name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "S3 Import");

    test.step("*** Selecting file type ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.FILE_TYPE, "json");

    test.step("*** Entering Bucket Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.BUCKETNAME, "S3import");

    test.step("*** Entering File Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.FILENAMEFIELD, "C26559");

    test.step("*** Clicking on Advance Button ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);

    await io.assert.checkElementState(selectors.flowBuilderPagePO.ENCRYPTFILES, "isDisabled");
  });
});
