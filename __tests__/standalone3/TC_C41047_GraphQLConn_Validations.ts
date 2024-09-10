import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41047_GraphQLConn_Validations", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T9955 @Env-All TC_C41047_GraphQLConn_Validations", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.GRAPHQL_CONNECTOR);
    test.step("*** clicked on Graphql adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    var baseuritext = await page.locator(
      selectors.connectionsPagePO.BASEURI
    ).textContent();
    
    await io.assert.expectToBeValue(String(baseuritext), "Base URI *", "");
    test.step("*** Verified the Base uri field name ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.BASEURIICON);
    test.step("*** Clicked on Base URI help icon ***", async ()=>{});

    const baseurihelptext = await page.locator(
      selectors.connectionsPagePO.CONNHELPTEXT
    ).textContent();

    await io.assert.expectToContainValue("Provide the specific URI/endpoint on the GraphQL server. Your GraphQL server operates on a single endpoint (traditionally /graphql), and all requests are directed to this endpoint.",String(baseurihelptext),""
    );
    test.step("*** Test passed as expected help text is shown for Base URI ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    await io.homePage.clickButtonByIndex(selectors.connectionsPagePO.QUERYICON, 0);
    test.step("*** Clicked on Query help icon ***", async ()=>{});

    const queryhelptext = await page.locator(
      selectors.connectionsPagePO.CONNHELPTEXT
    ).textContent();
    await io.assert.expectToContainValue("Enter the query to be processed by GraphQL server. The supported operation type is either query or mutation. The operation type is required unless you're using the query shorthand syntax, in which case you can't supply a name or variable definitions for your operation. The query may also include an operation name, which is required for a multi-operations query.", String(queryhelptext), "");
    test.step("*** Test passed as expected help text is shown for Query ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    await io.homePage.clickButtonByIndex(selectors.connectionsPagePO.OPERATIONICON, 0);
    test.step("*** Clicked on operation help icon ***", async ()=>{});

    const operationhelptext = await page.locator(
      selectors.connectionsPagePO.CONNHELPTEXT
    ).textContent();

    await io.assert.expectToContainValue("Provide the operation name if your query has two or more operations. Note that a request can only execute one operation at a time.", String(operationhelptext), "");
    test.step("*** Test passed as expected help text is shown for operation ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    await io.homePage.clickButtonByIndex(selectors.connectionsPagePO.VARIABLESICON, 0);
    test.step("*** Clicked on Variables help icon ***", async ()=>{});

    const variablehelptext = await page.locator(
      selectors.connectionsPagePO.CONNHELPTEXT
    ).textContent();
   
    await io.assert.expectToContainValue('Define the JSON variables used in your query. For example, if the query is "query HeroNameAndFriends($episode: Episode)", define the variable as {"episode":"JEDI"}.',variablehelptext,"")
    test.step("*** Test passed as expected help text is shown for variable ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    await io.homePage.loadingTime();
  });
});
