import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import DB from "@testData/STANDALONE/DB_connection.json";

test.describe("TC_C34948_Verify_AFE_Toggle_Present_InDB_DataURI", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5577 @Env-All TC_C34948_Verify_AFE_Toggle_Present_InDB_DataURI", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    test.step("*** Navigate to Resources ***", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();

    await io.homePage.loadingTime();
    test.step("*** Clicking on exports ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);

    test.step("*** Selecting My SQL adapter ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.MYSQL);

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    test.step("*** Choosing the desired My Sql connection ***", async ()=>{});
    var conn = DB[0]["connectionId"];
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.importPagePO.ADVANCED);
    test.step("*** Clicking on Advance section  ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.DATAURITEMPLATE, 1);
    test.step("*** Clicked on Data URI template handlebar ***", async ()=>{});

    var ele = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    var ele1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.assert.expectToBeTrue(ele, "");
    await io.assert.expectToBeTrue(ele1, "");
    test.step("*** Verifying AFE Toggle Is present ***", async ()=>{});
  });
});
