import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C34945_Import_shouldNot_Contain_AFE_Toggles", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T5574 @Env-All TC_C34945_Import_shouldNot_Contain_AFE_Toggles", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Imports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Creating an Import ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);

    test.step("*** Selecting FTP adapter ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);

    test.step("*** Choosing the desired FTP connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'FTP CONNECTION');
    test.step("*** Entering the Input Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "C34945 Test");
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on directory Handle bar ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.DIRECTORYHANLEBAR);
    test.step("*** Verifying toggles bars should not present ***", async ()=>{});
    var conc1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.assert.expectToBeFalse(conc1, "");
    var conc2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeFalse(conc2, "");
    test.step("*** Closing the handle bar ***", async ()=>{});
    await io.homePage.clickByIndex(selectors.basePagePO.CLOSE,1);
    test.step("*** Clicking on file name Handle bar ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.FILE_KEY);
    test.step("*** Verifying toggles bars should not present ***", async ()=>{});
    var data1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.assert.expectToBeFalse(data1, "");
    var data2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeFalse(data2, "");
    test.step("*** Closing the handle bar ***", async ()=>{});
    await io.homePage.clickByIndex(selectors.basePagePO.CLOSE,1);
    test.step("*** Clicking on Advance toggle bar ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.ADVANCED);

    test.step("*** Clicking on Back up path Handle bar ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.BACKUPPATHHANDLEBAR);
    test.step("*** Verifying toggles bars should not present ***", async ()=>{});
    var valid1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.assert.expectToBeFalse(valid1, "");
    var valid2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeFalse(valid2, "");
    test.step("*** Closing the handle bar ***", async ()=>{});
    await io.homePage.clickByIndex(selectors.basePagePO.CLOSE,1);
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
