import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41926_custom_request_body", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9983 @Env-All TC_C41926_custom_request_body", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on Page Generator ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.GRAPHQL_CONNECTOR);
    test.step("*** Selected GraphQL as the adaptor ***", async ()=>{});

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "GRAPHQL CONNECTION");
    test.step("*** Choosing the desired graphql connection ***", async ()=>{});
    await io.homePage.loadingTime()

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "AutomationStandalone_GraphQl_import");
    test.step("*** writing the desired name ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD);
    test.step("*** selecting the http method ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.HTTPPOSTMETHOD);

    await io.homePage.click(selectors.flowBuilderPagePO.GRAPHQL_QUERY);
    test.step("*** selecting the query textfield ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.GRAPHQL_QUERY, 'some query');
    test.step("*** writing in the query textfield ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.GRAPHQL_OPERATION_NAME_TEXTFIELD);
    test.step("*** clicking the operation field ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.GRAPHQL_OPERATION_NAME_TEXTFIELD, "GraphQl_import");
    test.step("*** writing in the operation field ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.GRAPHQL_VARIABLES_TEXTFIELD);
    test.step("*** clicking the variable text field ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.GRAPHQL_VARIABLES_TEXTFIELD, "GraphQl_import");
    test.step("*** writing in the variable text field ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    test.step("*** clicking the export type textfield ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DATA_VALUE_ALL);
    test.step("*** selecting the all export type textfield ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE);
    test.step("*** clicking on does api paging dropdown  ***", async ()=>{});
    await io.homePage.click( selectors.flowBuilderPagePO.SKIP);
    test.step("*** clicking paging method textfield   ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CUSTOM_REQUEST_BODY);
    test.step("*** selecting the custom request body  ***", async ()=>{});
    await page.locator(
      selectors.flowBuilderPagePO.CUSTOM_REQUEST_BODY
    ).isVisible();
    test.step("*** verified the element existed  ***", async ()=>{});
    await page.locator(
      selectors.flowBuilderPagePO.PAGING_GRAPHQL_QUERY
    ).first().isVisible();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.PAGING_GRAPHQL_QUERY, 'some query');
    test.step("*** clicking and filling the paging query textfield    ***", async ()=>{});
    test.step("*** verifying and configured the pagination using custom request body ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
