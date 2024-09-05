import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C37006", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    await io.connections.deleteConnection("C37006_Bigquery_Test1");
    await io.connections.deleteConnection("C37006_Bigquery_Test2");
    await io.connections.deleteConnection("C37006_Bigquery_Test3");
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T7665 @Env-All TC_C37006", async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    test.step("Clicking on create flow", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    test.step("Clicking on Export", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("Clicking on Google bigquery", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.BIGQUERYADAPTOR);
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("Clicking on New Connection", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("provided Name", async ()=>{});
    await io.homePage.clickByIndex(selectors.basePagePO.ADD_NAME, 1);
    await page.keyboard.type("C37006_Bigquery_Test1");
    test.step("provided Project Key", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BQPROJECTID, "project Key");
    test.step("Provided Email", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BQCLIENTEMAIL, "Bigquery@email");
    test.step("Provided Private Key", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BQPRIVATEKEY, "Private Key");
    test.step("Provided Dataset", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BQDATASET, "1234");
    test.step("Clicked on save and close button", async ()=>{});
    await io.homePage.clickByIndex(selectors.basePagePO.SAVE, 1);

    var saveButton = await io.homePage.isVisible(selectors.basePagePO.MFA_SAVE)
    if(saveButton)
    {
      await io.homePage.click(selectors.basePagePO.MFA_SAVE)
    }

    await io.homePage.loadingTime()
    await io.homePage.clickByIndex(selectors.basePagePO.CLOSE, 1);

    test.step("Clicked on Discard changes for export", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    
    test.step("Clicked on Imports", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Imports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("Clicked on new Resource", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("Clicking on Google bigquery", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.BIGQUERYADAPTOR);
    test.step("Clicked on new Resource", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADD_NEW_RESOURCE, 1);
    await io.homePage.loadingTime();
    test.step("provided Name", async ()=>{});
    await io.homePage.clickByIndex(selectors.basePagePO.ADD_NAME, 1);
    await page.keyboard.type("C37006_Bigquery_Test2");

    test.step("provided Project Key", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BQPROJECTID, "project Key");
    test.step("Provided Email", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BQCLIENTEMAIL, "Bigquery@email");
    test.step("Provided Private Key", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BQPRIVATEKEY, "Private Key");
    test.step("Provided Dataset", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BQDATASET, "1234");
    test.step("Clicked on save and close button", async ()=>{});
    await io.homePage.clickByIndex(selectors.basePagePO.SAVE, 1);

    var saveButton = await io.homePage.isVisible(selectors.basePagePO.MFA_SAVE)
    if(saveButton)
    {
      await io.homePage.click(selectors.basePagePO.MFA_SAVE)
    }

    await io.homePage.loadingTime()
    await io.homePage.clickByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("Clicked on Discard changes for export", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);

    test.step("Clicked on Exports", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Exports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("Clicked on new Resource", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("Clicking on Google bigquery", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.BIGQUERYADAPTOR);
    test.step("Clicked on new Resource", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADD_NEW_RESOURCE, 1);
    await io.homePage.loadingTime();
    test.step("provided Name", async ()=>{});
    await io.homePage.clickByIndex(selectors.basePagePO.ADD_NAME, 1);
    await page.keyboard.type("C37006_Bigquery_Test3");

    test.step("provided Project Key", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BQPROJECTID, "project Key");
    test.step("Provided Email", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BQCLIENTEMAIL, "Bigquery@email");
    test.step("Provided Private Key", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BQPRIVATEKEY, "Private Key");
    test.step("Provided Dataset", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BQDATASET, "1234");
    test.step("Clicked on save and close button", async ()=>{});
    await io.homePage.clickByIndex(selectors.basePagePO.SAVE, 1);

    var saveButton = await io.homePage.isVisible(selectors.basePagePO.MFA_SAVE)
    if(saveButton)
    {
      await io.homePage.click(selectors.basePagePO.MFA_SAVE)
    }

    await io.homePage.loadingTime()
    await io.homePage.clickByIndex(selectors.basePagePO.CLOSE, 1);

    test.step("Clicked on Discard changes for export", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
  });
});
