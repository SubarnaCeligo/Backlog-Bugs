import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-26222_MockOutput_C55468_C55469", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("C55468-C55469 - Verify If the connection is offline, then the Populate with Preview data is grayed out/disabled - export & lookup @Env-All @Zephyr-IO-T14466 @Zephyr-IO-T14467", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.APPLICATION);
    await page.keyboard.type("zendesk");
    await io.homePage.click(selectors.connectionsPagePO.ZENDESK);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    let conn = "ZENDESK OFFLINE CONNECTION - Offline";
    
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS, 0);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "test export");

    await io.homePage.click(selectors.exportsPagePO.MOCK_OUTPUT_ARIA_EXPAND_BUTTON);
    var disabledPopulateBtn = await io.homePage.isVisible(selectors.flowBuilderPagePO.DISABLEDPOPULATEBTN);
    await io.assert.expectToBeTrue(disabledPopulateBtn, "");

    await io.homePage.hover(selectors.flowBuilderPagePO.DISABLEDPOPULATEBTN, 0, true);
    let disabledHoverText = await io.homePage.getText(selectors.mappings.TOOLTIP);
    await io.assert.expectToContainValue( "Bring your connection online to enable this action.", String(disabledHoverText),"");
    test.step("*** Validation for C55468-C55469 - Verify If the connection is offline, then the Populate with Preview data is grayed out/disabled - export & lookup ***", async ()=>{});
  });
});
