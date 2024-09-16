
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import NS from "@testData/STANDALONE/IO-26223_limit_exportType.json";

test.describe("TC_C55441_C55442_C55456_C55457", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C55441_C55442_C55456_C55457 @Env-All @Zephyr-IO-T14444 @Zephyr-IO-T14445 @Zephyr-IO-T14455 @Zephyr-IO-T14456", async ({ io, page }, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.APPLICATION);
    await page.keyboard.type("zendesk support");
    await io.homePage.click(selectors.flowBuilderPagePO.ZENDESKSUPPORT);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    let conn = NS["connectionId"];
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.clickByText("ZENDESK CONNECTION");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "test export");
    await io.homePage.fillWebPage(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE, "users_api");
    await io.homePage.fillWebPage(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION, "list_users");
    var exportTypeAssistant = await page.$(selectors.exportsPagePO.ASSISTANT_META_DATA_EXPORT_TYPE);
    await exportTypeAssistant.focus();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_EXPORT_TYPE);
    var limit = await page.$(selectors.flowBuilderPagePO.LIMITTYPE);
    await limit.focus();
    await io.homePage.click(selectors.flowBuilderPagePO.LIMITTYPE);
    await io.homePage.click(selectors.exportsPagePO.MOCK_OUTPUT_ARIA_EXPAND_BUTTON);
    await io.homePage.click(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD);

    let data = NS["TenRecordsMockData"];
    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD);
    await io.homePage.enterHugeData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD,
      JSON.stringify(data)
    );
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var exportBubble = await io.homePage.isVisible(selectors.flowBuilderPagePO.EXPORT);
    await io.assert.expectToBeTrue(exportBubble, "");

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.APPLICATION);
    await page.keyboard.type("zendesk support");
    await io.homePage.click(selectors.flowBuilderPagePO.ZENDESKSUPPORT);
    await io.homePage.click(selectors.mappings.LOOKUP_RECORD);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.clickByText("ZENDESK CONNECTION");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "test export");
    await io.homePage.fillWebPage(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE, "users_api");
    await io.homePage.fillWebPage(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION, "list_users");
    await io.homePage.click(selectors.exportsPagePO.MOCK_OUTPUT_ARIA_EXPAND_BUTTON);
    let data3 = NS["TenRecordsMockData"];
    await io.homePage.enterHugeData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD,
      JSON.stringify(data3)
    );
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    var exportBubble1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.EXPORT);
    await io.assert.expectToBeTrue(exportBubble1, "");
    test.step("*** Validation for TC_C55441_C55442 ***", async ()=>{});
  });
});
