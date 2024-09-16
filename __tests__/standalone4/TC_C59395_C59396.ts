
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("HTTP_standalone_imports", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C59395_C59396 @Env-All @Zephyr-IO-T4808 @Zephyr-IO-T4809", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.AMAZONS3);
    test.step("*** Selected Amazon S3  as the adaptor ***", async ()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.TRANSFER_FILES);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicking on Create from scratch button ***", async () => { });
    await io.homePage.loadingTime();

    await io.homePage.fill(selectors.importPagePO.NAME, "AMAZON S3 IMPORT");
    test.step("*** Renaming the PageProcessor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.FILE_TYPE, "json");
    test.step("*** Choosing File Type  ***", async ()=>{});

    await test.step("*** Validating 'serverSideEncryption option (SSE-S3)' checkbox should be present ***", async () => { });

    // C59395 - Verify serverSideEncryption option (SSE-S3) checkbox in S3 imports form
    const isServerSideEncryptionCheckboxVisible = await io.homePage.isVisible(selectors.exportsPagePO.SSE);
    await io.assert.expectToBeTrue(isServerSideEncryptionCheckboxVisible, "ServerSideEncryption checkbox is not visible");
    await io.assert.verifyElementContainsText(selectors.importPagePO.SSELABEL, "Use server-side encryption (SSE-S3)");

    // C59396 - Verify help text for Use server-side encryption (SSE-S3)
    await io.homePage.click(selectors.importPagePO.SSE_HELP);
    const serverSideEncryptionHelpText = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    await io.assert.expectToContainValue("Use this field to instruct Amazon S3 to server-side encrypt files using Amazon S3 managed keys (SSE-S3). Please note that integrator.io also supports the ability to encrypt files before they are sent to Amazon S3.", serverSideEncryptionHelpText, "");

    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    test.step("*** Clicking on Close ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on Discard Changes ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page ", async ()=>{});
  });
});
