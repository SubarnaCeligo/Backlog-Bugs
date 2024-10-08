
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_Only_SuiteApp.json";

test.describe("TC_C61011_Verify that SuiteApp SuiteScript 1 option is clickable while creating new NS export and only suiteapp is installed", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C61011 @Env-All @Zephyr-IO-T23048", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on Add Source button in flowbuilder page ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
    test.step("*** Selected Netsuite  as the adaptor ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_EXPORT_RECORDS);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var conn = TC[0]["connectionId"];

    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.clickByText("NETSUITE_WITH_NO_BUNDLE CONNECTION");
    test.step("*** Choosing the desired connection ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    test.step("*** Clicking on Advanced section ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SUITEAPP1POINT0);
    var isChecked = await page.locator(
     selectors.flowBuilderPagePO.SUITEAP1
    ).isChecked();
    await io.assert.expectToBeTrue(isChecked, "");
  });
});
