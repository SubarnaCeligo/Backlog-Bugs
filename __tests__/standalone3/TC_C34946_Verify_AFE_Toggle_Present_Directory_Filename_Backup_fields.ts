import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C34946_Verify_AFE_Toggle_Present_Directory_Filename_Backup_fields", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T5575 @Env-All TC_C34946_Verify_AFE_Toggle_Present_Directory_Filename_Backup_fields", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on Pageprocessor ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    test.step("*** Selected FTP as the adaptor ***", async ()=>{});

    test.step("*** Clicking on what would you like to do ", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.TRANSFER_FILES);

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime()

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'FTP CONNECTION');
    test.step("***Choosing the desired FTP connection ***", async ()=>{});
    await io.homePage.loadingTime()

    test.step("*** Clicking on directory Handle bar ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.DIRECTORYHANLEBAR);
    test.step("*** Verifying toggles bars present Directory AFE Field ***", async ()=>{});
    var conc1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.assert.expectToBeTrue(conc1, "");
    var conc2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeTrue(conc2, "");
    test.step("*** Closing the handle bar ***", async ()=>{});
    await io.homePage.clickByIndex(selectors.basePagePO.CLOSE,1);
    test.step("*** Clicking on file name Handle bar ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.FILE_KEY);
    test.step("*** Verifying toggles bars present FileName AFE Field ***", async ()=>{});
    var data1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.assert.expectToBeTrue(data1, "");
    var data2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeTrue(data2, "");
    test.step("*** Closing the handle bar ***", async ()=>{});
    await io.homePage.clickByIndex(selectors.basePagePO.CLOSE,1);

    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
