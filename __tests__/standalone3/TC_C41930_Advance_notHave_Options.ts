import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41930_Advance_notHave_Options", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T9986 @Env-All TC_C41930_Advance_notHave_Options", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.GRAPHQL_CONNECTOR);
    test.step("*** Selected GraphQL as the adaptor ***", async ()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "GRAPHQL CONNECTION");
    test.step("*** Choosing the desired graphql connection ***", async ()=>{});
    await io.homePage.loadingTime()

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Graphql Import");
    test.step("*** writing Import Name ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    test.step("*** Clicking on Advance button ***", async ()=>{});

    let asyncHelper = await page.locator(selectors.flowBuilderPagePO.ASYNCHELPER).isVisible();
    await io.assert.expectToBeFalse(asyncHelper,"")
    test.step("*** Verified advance section should not have async helper checkbox options ***", async ()=>{});

    let idLockTemplate = await page.locator(
      selectors.importPagePO.ID_LOCK_TEMPLATE
    ).isVisible();
    await io.assert.expectToBeFalse(idLockTemplate,"")
    test.step("*** Verified advance section should not have concurrency id lock template options ***", async ()=>{});
  });
});
