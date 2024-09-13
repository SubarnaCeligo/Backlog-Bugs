import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41679_ExportType_inGraphQLExport", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9967 @Env-All TC_C41679_ExportType_inGraphQLExport", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.GRAPHQL_CONNECTOR);
    test.step("*** Selected GraphQL as the adaptor ***", async ()=>{});
    
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "GRAPHQL CONNECTION");
    test.step("*** Choosing the desired GraphQL connection ***", async ()=>{});
    await io.homePage.loadingTime()

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Graphql Export");
    await io.homePage.click(selectors.flowBuilderPagePO.TYPE);

    var all = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.REDSHIFT_SELECTED_EXPORT_RECORDS, "All - always export all data");
    await io.assert.expectToBeTrue(all, "");
    test.step("*** Verifying All export type showing under Export Type Dropdown   ***", async ()=>{});

    var delta = await io.homePage.getTextFromElement(selectors.exportsPagePO.DELTA, "Delta - export only modified data");
    await io.assert.expectToBeTrue(delta, "");
    test.step("*** Verifying Delta export type showing under Export Type Dropdown   ***", async ()=>{});
   
    var once = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.HTTP_EXPORT_TYPE_ONCE, "Once - export records only once");
    await io.assert.expectToBeTrue(once, "");
    test.step("*** Verifying Once export type showing under Export Type Dropdown   ***", async ()=>{});
    
    var text = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.LIMITTYPE, "Limit - export a set number of records");
    await io.assert.expectToBeTrue(text, "");
    test.step("*** Verifying Test export type showing under Export Type Dropdown   ***", async ()=>{});
  });
});
