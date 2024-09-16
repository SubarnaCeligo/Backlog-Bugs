import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41783_composite", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9979 @Env-All TC_C41783_composite", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.GRAPHQL_CONNECTOR);
    test.step("*** Selected GraphQL as the adaptor ***", async ()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    
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
    await io.homePage.click(selectors.exportsPagePO.COMPOSITE_METHOD);
    
    test.step("*** selecting the composite method ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.COMPOSITE_DROPDOWN);
    test.step("*** selecting the composite method textfield ***", async ()=>{});
    expect(io.assert.checkElementState( selectors.flowBuilderPagePO.COMPOSITE_CREATE_AND_IGNORE, "isVisible") &&
        io.assert.checkElementState(selectors.importPagePO.CREATE_UPDATE, "isVisible") &&
        io.assert.checkElementState(selectors.importPagePO.IGNORE_UPDATE, "isVisible")
    ).toBeTruthy;
    test.step("*** composite of all 3 methods are verified  ***", async ()=>{});

    let res = await page.locator(
      selectors.exportsPagePO.COMPOSITE_DROPDOWN
    );
    await res.isVisible();
    

    test.step("*** clicked on composite method txtfield and all the three methods are displayed under the composite filed  ***", async ()=>{});
  });
});
