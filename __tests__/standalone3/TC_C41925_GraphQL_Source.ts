import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41925_Source_inGraphQLExport", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9982 @Env-All TC_C41925_Source_inGraphQLExport", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.GRAPHQL_CONNECTOR);
    test.step("*** Selected GraphQL as the adaptor ***", async ()=>{});

    var source = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.EXPORT_TYPE, "Export records from source application");
    await io.assert.expectToBeTrue(source, "");
    test.step("*** Verifying source only having Export records from source application  ***", async ()=>{});
  });
});
