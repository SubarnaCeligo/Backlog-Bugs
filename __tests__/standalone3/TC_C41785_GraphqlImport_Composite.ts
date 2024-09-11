import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41785_GraphqlImport_Composite_Field", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9981 @Env-All TC_C41785_GraphqlImport_Composite", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

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

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Graphql Import");
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_METHOD, "COMPOSITE");
    test.step("*** Selecting the method from the DROPDOWN ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.COMPOSITE_DROPDOWN);
    test.step("*** clicking on the composite type dropdown ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.IGNORE_UPDATE);
    test.step("*** clicking on the Ignore new records & update existing records ***", async ()=>{});
    test.step("*** Selecting the Composite method from the DROPDOWN ***", async ()=>{});

    var exist = await io.homePage.isVisible(selectors.importPagePO.IGNORE_EXISTING);
    await io.assert.expectToBeTrue(exist, "");
    test.step("*** Verifying users will see Identify existing records   ***", async ()=>{});
    var update = await io.homePage.isVisible(selectors.importPagePO.UPDATE_VERIFY);
    await io.assert.expectToBeTrue(update, "");
    test.step("*** Verifying users will see Update existing records”   ***", async ()=>{});
    var query = await io.homePage.isVisible(selectors.flowBuilderPagePO.GRAPHQLQUERYUPDATE);
    await io.assert.expectToBeTrue(query, "");
    test.step("*** Verifying Updating existing records will have Query fields to form the request”   ***", async ()=>{});
    var operationName = await io.homePage.isVisible(selectors.flowBuilderPagePO.GRAPHQLOPERATIONNAME);
    await io.assert.expectToBeTrue(operationName, "");
    test.step("*** Verifying Updating existing records will have operationName fields to form the request”   ***", async ()=>{});
    var variables = await io.homePage.isVisible(selectors.flowBuilderPagePO.GRAPHQLVARIABLE);
    await io.assert.expectToBeTrue(variables, "");
    test.step("*** Verifying Updating existing records will have variable fields to form the request”   ***", async ()=>{});
  });
});
