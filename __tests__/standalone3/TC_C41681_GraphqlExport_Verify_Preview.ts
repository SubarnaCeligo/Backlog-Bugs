import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import json from "@testData/STANDALONE/Graphql_body.json";

test.describe("TC_C41681_GraphqlExport_Verify_Preview", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9969 @Env-All TC_C41681_GraphqlExport_Verify_Preview", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on Export ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.GRAPHQL_CONNECTOR);
    test.step("*** Selected Graphql as the adaptor ***", async ()=>{});

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "GRAPHQL CONNECTION");
    test.step("*** Choosing the desired graphql connection ***", async ()=>{});

    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C41681_GraphqlExport_Verify_Preview");
    test.step("*** Renaming the PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD);
    test.step("*** clicking on the http method field  ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.HTTPPOSTMETHOD);
    test.step("*** selecting post method***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.GRAPHQL_QUERY);
    test.step("*** selecting the query textfield ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.GRAPHQL_QUERY, json.data);
    test.step("*** Writing Request Body ***", async ()=>{});
    test.step("*** Saving the Request Body ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    test.step("*** clicking the export type textfield ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DATA_VALUE_ALL);
    test.step("*** selecting the all export type textfield ***", async ()=>{});
    var res = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.TYPE, "All - always export all data");
    await io.assert.expectToBeTrue(res, "");
    test.step("*** Verifying whether the proper type selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.PAGE);
    test.step("*** Clicking on Paging Method ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SKIP, "body");
    test.step("*** Selectting the desired Paging Method ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.PAGING_GRAPHQL_QUERY, json.data);
    test.step("*** Writing Paging Request Body ***", async ()=>{});
    var res1 = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.SKIP, "Custom request body");
    await io.assert.expectToBeTrue(res1, "");
    test.step("*** Verifying whether the proper method selected ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    test.step("*** Clicking On Preview ***", async ()=>{});
    var previewData = await page.locator(
      selectors.importPagePO.PREVIEWDATA
    ).textContent();

    expect(JSON.stringify(previewData)).toContain("record");
    expect(JSON.stringify(previewData)).toContain("orders");
    test.step("***Verified the Preview working Fine***", async ()=>{});
  });
});
