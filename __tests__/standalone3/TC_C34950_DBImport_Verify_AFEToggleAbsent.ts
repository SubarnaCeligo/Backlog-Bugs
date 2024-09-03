import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as  FTP from "@testData/STANDALONE/TC_C21036_Verify_HTTP_REST_DB_AFE_Import_Data_RecordFormat.json";

test.describe("TC_C34950_DBImport_Verify_AFEToggleAbsent", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Imports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T5579 @Env-All TC_C34950_DBImport_Verify_AFEToggleAbsent", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.click(selectors.flowBuilderPagePO.MYSQL);
    test.step("*** Choosing the desired MySQL connection ***", async ()=>{});
    var conn = FTP._connectionId;

    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);

    test.step("*** Entering testcase name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C34950_DBImport_Verify_AFEToggleAbsent");

    test.step("*** Clicking on next button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);

    await io.homePage.click(selectors.importPagePO.MARIADB_PER_RECORD);
    test.step("*** Clicked on Insert Query Radio button ***", async ()=>{});

    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR);

    test.step("*** Verifying the AFE toggle should not be present ***", async ()=>{});
    var status1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await expect(status1).toBeFalsy();
    var status2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await expect(status2).toBeFalsy();

    test.step("*** Clicked on close ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);

    await io.homePage.click(selectors.importPagePO.ADVANCED);
    test.step("*** Clicked on Advanced dropdown ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.importPagePO.ID_LOCK_TEMPLATE, 1);

    test.step("*** Verifying the AFE toggle should not be present ***", async ()=>{});
    var status3 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await expect(status3).toBeFalsy();
    var status4 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await expect(status4).toBeFalsy();

    test.step("*** Clicked on close ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);

    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.DATAURITEMPLATE, 1);

    test.step("*** Verifying the AFE toggle should not be present ***", async ()=>{});
    var status5 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await expect(status5).toBeFalsy();
    var status6 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await expect(status6).toBeFalsy();

    await io.homePage.loadingTime();

    test.step("*** Clicked on close ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBUTTON);

    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);

    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
  });
});
