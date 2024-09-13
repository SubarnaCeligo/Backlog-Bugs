
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C59397.json";

test.describe("TC_C59397_Use_ServerSideEncryption_CheckBox", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    test.step("*** End of Test Suite ***", async () => { });
    await io.api.deleteFlowsWithId([flowId]);
  });
  test("TC_C59397_Use_ServerSideEncryption_CheckBox @Env-All @Zephyr-IO-T4810", async ({ io, page }, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(HTTP);
    flowId = flows.get(HTTP.name)["flowId"];
    await test.step("*** Created Flows :" + flows.get(HTTP.name)["flowName"],async ()=>{}
    );
    await io.flowBuilder.navigateToTheFlow( flows.get(HTTP.name)["flowId"]
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Opening the flow ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on Import ***", async ()=>{});
    await io.assert.verifyElementAttributeContainsText(selectors.exportsPagePO.SSE1, "value", "false");
    await test.step("*** Verirfied ‘Use server-side encryption (SSE-S3)` checkbox is unchecked ***", async () => { });

    await io.homePage.click(selectors.exportsPagePO.SSE);
    test.step("*** Clicking on 'SSE-S3' checkbox ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked on Save And Close ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    // Checking BE Flag
    var importJson = await io.api.getImport(  HTTP.qa__api_tdata[0].pageProcessors[0].qa__import.name);
    console.log("Import Json details", importJson);
    await expect(importJson.hasOwnProperty("serverSideEncryptionType")).toBeTruthy;
    await expect(importJson.hasOwnProperty("AES256")).toBeTruthy;

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking on Import ***", async ()=>{});
    await io.assert.verifyElementAttributeContainsText(selectors.exportsPagePO.SSE1, "value", "true");
    await test.step("*** Verirfied ‘Use server-side encryption (SSE-S3)` checkbox is checked ***",async ()=>{}
    );
    await io.homePage.click(selectors.exportsPagePO.SSE);
    test.step("*** Clicking on 'SSE-S3' checkbox ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked on Save And Close ***", async ()=>{});

    // Checking BE Flag
    var importJson1 = await io.api.getImport( HTTP.qa__api_tdata[0].pageProcessors[0].qa__import.name);
    console.log("Import Json details", importJson1);
    await expect(importJson1.hasOwnProperty("serverSideEncryptionType")).toBeFalsy;
    await expect(importJson1.hasOwnProperty("AES256")).toBeFalsy;

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Import ***", async ()=>{});
    await io.assert.verifyElementAttributeContainsText(selectors.exportsPagePO.SSE1, "value", "false");
    await test.step("*** Verified ‘Use server-side encryption (SSE-S3)` checkbox should be updated successfully when we enable/disable. ***", async () => { });
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page ", async ()=>{});
  });
});
