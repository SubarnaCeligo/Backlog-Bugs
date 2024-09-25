
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import Graphql from "@testData/STANDALONE/GraphQ_Application.json";

test.describe("TC_41247__FormView_inGraphQLExport", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T9964 TC_41247__FormView_inGraphQLExport", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on Export ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.GRAPHQL_CONNECTOR);
    test.step("*** Selected GraphQL as the adaptor ***", async ()=>{});

    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Graphql Export");

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "Graph");
    await io.homePage.clickByTextByIndex("GraphQL", 0, {exact: false});
    await io.homePage.loadingTime();
    test.step("*** Choosing the desired GraphQL connection ***", async ()=>{});
    


    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});

    var view = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.FORMVIEW, "GraphQL");
    await io.assert.expectToBeTrue(view, "");
    test.step("*** Verifying Form view field will have the default value of GraphQL   ***", async ()=>{});
  });
});
