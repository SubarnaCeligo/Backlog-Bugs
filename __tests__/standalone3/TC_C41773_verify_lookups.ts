import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41773_verify_lookups", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9973 @Env-All TC_C41773_verify_lookups", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.GRAPHQL_CONNECTOR);
    test.step("*** Selected GraphQL as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();

    var importOpt = await io.homePage.isVisible(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    await io.assert.expectToBeTrue(importOpt, "");

    var lookup1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.SELECT_LOOKUP);
    await io.assert.expectToBeTrue(lookup1, "");

    var lookup2 = await io.homePage.isVisible(selectors.mappings.LOOKUP_RECORD);
    await io.assert.expectToBeTrue(lookup2, "");
    test.step("*** verifying the both lookup files and lookup records ***", async ()=>{});
  });
});
