import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C36999_Invalid_Creds_for_Bigquery_Connection", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});
    await io.connections.deleteConnection("C36999_Bigquery_Connection");
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T7660 @Env-All TC_C36999_Invalid_Creds_for_Bigquery_Connection", async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await(await page.locator(selectors.basePagePO.ADD_NEW_RESOURCE)).click();
    test.step("*** Clicking on the Google Bigquery ***", async ()=>{});
    await(await page.locator(selectors.flowBuilderPagePO.GOOGLE_BIGQUERY)).click();
    test.step("*** Providing Name ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "C36999_Bigquery_Connection");
    test.step("*** Providing projbect id ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BQPROJECTID, "TestprojectID");
    test.step("*** providing invalid email ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BQCLIENTEMAIL, "TestCLientEmail");
    test.step("*** providing invalid private key ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BQPRIVATEKEY, "TestPrivateKey");
    test.step("*** providing invalid dataset ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BQDATASET, "TestDataset");
    test.step("*** Clicking on test button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);

    test.step("*** validating the error message ***", async ()=>{});
    var saveButton = await io.homePage.isVisible(selectors.basePagePO.MFA_SAVE)
    if(saveButton)
    {
      await io.homePage.click(selectors.basePagePO.MFA_SAVE)
    }

    await io.homePage.loadingTime()
    
    var Result = await io.homePage.getTextFromElement(selectors.basePagePO.NOTIFICATION_ID, "This connection is currently offline. Re-enter your credentials to bring it back online.");
    await io.assert.expectToBeTrue(Result, "");
    test.step("*** validated the error message ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicked on cancel button ***", async ()=>{});
  });
});
