import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C44917_C44916", () => {
  let webhookId1: any;
  let webhookId2: any;

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
    webhookId1 = await io.api.getExportId("TC_C44916_Webhook_Export");
    webhookId2 = await io.api.getExportId("TC_C44917_Webhook_Export");
    await io.api.deleteCall("v1/exports/" + webhookId1);
    await io.api.deleteCall("v1/exports/" + webhookId2);
    await io.homePage.loadingTime();
  });

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T18698 @Zephyr-IO-T18699 @Env-All TC_C44917_C44916", async ({io,page}, testInfo) => {
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
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C44916_Webhook_Export");
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
    var Data = await io.api.getExport("TC_C44916_Webhook_Export");
    if(Data.webhook.algorithm === "sha512") {
      test.step("*** verifiend HMAC property with SHA512 ***", async ()=>{});
    } else {
      test.step("*** Test case failed ***", async ()=>{});
    }

    await io.homePage.click(selectors.basePagePO.CLOSE);

    await io.homePage.loadingTime();
    test.step("*** Clicking on add page generator ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE_GENERATOR);
    await io.homePage.loadingTime();
    test.step("*** Clicked open Webhook ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.WEBHOOK);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Providing Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C44917_Webhook_Export");
    test.step("*** selecting hmac verification ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.VERIFICATION, "hmac");
    test.step("*** selecting sha512 algorithm ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.ALGORITHM, "sha384");
    test.step("*** selecting base64 encoding ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.ENCODING, "base64");
    test.step("*** Providing Key value ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.KEY, "Test_Key");
    test.step("*** Providing Header value ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HEADER, "Header");
    test.step("*** Clicking on Generate Public Key ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.WEBHOKKSGENERATEURL);
    await io.homePage.isPageReady();
    Data = await io.api.getExport("TC_C44917_Webhook_Export");
    if(Data.webhook.algorithm === "sha384") {
      test.step("*** verifiend HMAC property with SHA384 ***", async ()=>{});
    } else {
      test.step("*** Test case failed ***", async ()=>{});
    }
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
