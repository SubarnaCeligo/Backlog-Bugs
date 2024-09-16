import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41782_verify_query_textfield", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9978 @Env-All TC_C41782_verify_query_textfield", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();
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
    await io.homePage.loadingTime();

    test.step("*** selecting the desired GrapghQl connection ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "AutomationStandalone_GraphQl_import");
    test.step("*** writing the desired name ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD);
    test.step("*** selecting the http method ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.HTTPPUTMETHOD);

    const query = await page.locator(selectors.flowBuilderPagePO.GRAPHQL_QUERY_STAR).textContent();
    await io.assert.expectToContainValue( "*", String(query),"");
    const operation = await page.locator(selectors.flowBuilderPagePO.OPERATION_NAME_STAR).textContent();
    await io.assert.expectNotToContainValue( "*", String(operation),"");
    const variables = await page.locator(selectors.flowBuilderPagePO.VARIABLES_STAR).textContent();
    await io.assert.expectNotToContainValue( "*", String(variables),"");

    test.step("*** verified Query field, operational name testfield and variables textfield   ***", async ()=>{});
    
  });
});
