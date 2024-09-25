import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C44920_C37162.json";

test.describe("TC_C44920_C37162", () => {
  let webhookId1: any;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    // Delete the flow
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.flowBuilder.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETE_FLOW);
    //confirm  delete 
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    await io.flowBuilder.loadingTime();

    // Delete the webhooks
    await io.api.deleteCall("v1/exports/" + webhookId1);
    await io.homePage.loadingTime();
  });

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T1704 @Zephyr-IO-T18702 @Env-All TC_C44920_C37162", async ({io,page}, testInfo) => {
    test.step("*** Clicking on Create flow ***", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    test.step("*** Clicking on export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.loadingTime();
    test.step("*** Clicked opn Webhook ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.WEBHOOK);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Providing Name ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C44920_Webhook_Export");
    test.step("*** selecting hmac verification ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.VERIFICATION, "hmac");
    test.step("*** selecting sha512 algorithm ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.ALGORITHM, "sha512");
    test.step("*** selecting base64 encoding ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.ENCODING, "base64");
    test.step("*** Providing Key value ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.KEY, "Test_Key");
    test.step("*** Providing Header value ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HEADER, "Header");
    
    test.step("*** Clicking on Generate Public Key ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.WEBHOKKSGENERATEURL);
    await io.homePage.loadingTime();

    webhookId1 = await io.api.getExportId("TC_C44920_Webhook_Export");

    test.step("*** get Response from public URL ***", async ()=>{});
    var response = await io.api.getCall(`v1/exports/${webhookId1}/data`);

    test.step("*** Clicking on advanced ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    test.step("*** Open http response body handlebar ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.WEBHOOKHTTPBODY, 1);
    await io.homePage.loadingTime();
    test.step("*** validate the data in AFE window***", async ()=>{});
    var result = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("testMode",result, "");

    test.step("***Close the export***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
    test.step("*** Navigate to Home Page ***", async ()=>{});
  });
});
