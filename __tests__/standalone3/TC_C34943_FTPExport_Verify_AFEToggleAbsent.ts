import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C34943_FTPExport_Verify_AFEToggleAbsent", () => {
  test("@Zephyr-IO-T5572 @Env-All TC_C34943_FTPExport_Verify_AFEToggleAbsent", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Exports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FTP);
    test.step("*** Choosing the desired FTP connection ***", async ()=>{});

    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'FTP CONNECTION');

    test.step("*** Entering testcase name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C34943_FTPExport_Verify_AFEToggleAbsent");

    test.step("*** Clicking on next button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);

    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.FTPDIRECTORYPATH, 1);
    await io.homePage.loadingTime();
    test.step("*** Verifying the AFE toggle should not be present ***", async ()=>{});
    var status1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await expect(status1).toBeFalsy();
    var status2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await expect(status2).toBeFalsy();

    test.step("*** Clicked on close ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.FILENAMESTARTSWITH, 1);
    await io.homePage.loadingTime();
    test.step("*** Verifying the AFE toggle should not be present ***", async ()=>{});
    var status3 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await expect(status3).toBeFalsy();
    var status4 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await expect(status4).toBeFalsy();
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("*** Clicked on close ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.FILENAMEENDSWITH, 1);
    await io.homePage.loadingTime();
    test.step("*** Verifying the AFE toggle should not be present ***", async ()=>{});
    var status5 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await expect(status5).toBeFalsy();
    var status6 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await expect(status6).toBeFalsy();
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("*** Clicked on close ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.ADVANCED);
    test.step("*** Clicked on Advanced dropdown ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.BACKUPFILESPATH, 1);
    await io.homePage.loadingTime();
    test.step("*** Verifying the AFE toggle should not be present ***", async ()=>{});
    var status7 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await expect(status7).toBeFalsy();
    var status8 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await expect(status8).toBeFalsy();
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);

    test.step("*** Clicking on Override tracekey template handler ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.TRACEKAY_TEMPLATEHANDLER, 1);
    test.step("*** Verifying the AFE toggle should not be present ***", async ()=>{});
    await io.homePage.loadingTime();
    var status9 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await expect(status9).toBeFalsy();
    var status10 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await expect(status10).toBeFalsy();

    await io.homePage.loadingTime();

    test.step("*** Clicked on close ***", async ()=>{});
    await io.homePage.clickByIndex(selectors.basePagePO.CLOSE,1);

    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
  });
});
