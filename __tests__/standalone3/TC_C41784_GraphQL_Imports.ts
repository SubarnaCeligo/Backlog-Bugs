import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41784_GraphQLImport", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9980 @Env-All TC_C41784_GraphQLImport", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor  ***", async ()=>{});

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

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "GraphQL_Import");
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD);
    test.step("*** Http method clicking  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.COMPOSITE_METHOD, "composite");
    test.step("*** Selecting the desired Http method  ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.COMPOSITE_DROPDOWN);
    test.step("*** clicking on the composity type dropdown ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CREATE_UPDATE);
    test.step("*** clicking on the create  and update existing type ***", async ()=>{});
    
    var rest = await io.homePage.getTextFromElement(selectors.importPagePO.CREATE_VERIFY, "Create new records");
    await io.assert.expectToBeTrue(rest, "");
    test.step("*** Verifying whether the create new records ***", async ()=>{});
    var ret = await io.homePage.getTextFromElement(selectors.importPagePO.QUERY, "Query");
    await io.assert.expectToBeTrue(ret, "");
    test.step("*** Verifying whether the Query is displayed or not   ***", async ()=>{});
    var rap = await io.homePage.getTextFromElement(selectors.importPagePO.OPERATION, "Operation name");
    await io.assert.expectToBeTrue(rap, "");
    test.step("*** Verifying whether the Operation name is displayed or not   ***", async ()=>{});
    var sang = await io.homePage.getTextFromElement(selectors.importPagePO.VARIABLE, "Variables");
    await io.assert.expectToBeTrue(sang, "");
    test.step("*** Verifying whether the Variables is displayed or not   ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.IGNORE_EXISTING);
    test.step("*** clicking on identify existing records ***", async ()=>{});
    var resti = await io.homePage.getTextFromElement(selectors.importPagePO.IGNORE_EXISTING, "Identify existing records");
    await io.assert.expectToBeTrue(resti, "");
    test.step("*** Verifying whether the Identify existing records is displayed  ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.UPDATE_VERIFY);
    test.step("*** clicking on Update existing records ***", async ()=>{});
    var restii = await io.homePage.getTextFromElement(selectors.importPagePO.UPDATE_VERIFY, "Update existing records");
    await io.assert.expectToBeTrue(restii, "");
    test.step("*** Verifying whether the Update existing records is displayed  ***", async ()=>{});
  });
});
