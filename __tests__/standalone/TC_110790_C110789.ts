import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_110790_C110789", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T14158 TC_110790", async ({io,page}, testInfo) => {
    test.step("*** Clicking on create flow ***", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    test.step("*** Clicking on create export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.loadingTime();
    await io.homePage.click("[data-test='Coupa']");
    test.step("*** Selected Coupa as the adaptor ***", async ()=>{});

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime();
    var noConnectionText = await page.locator(
      'p:has(+ [data-test="addNewResource"])'
    ).textContent();

    await io.assert.expectToContainValue( "You don’t have any connections for this application.", noConnectionText,"");

    test.step("*** click on connection ***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);

    test.step("*** close connection drawer ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.importPagePO.IMPORT_CLOSE_DRAWER, 1);

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("***  Navigating to Home Page ***", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T14157 TC_110789", async ({io,page}, testInfo) => {
    test.step("*** Clicking on create flow ***", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    test.step("*** Clicking on create import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.homePage.loadingTime();
    await io.homePage.click("[data-test='Coupa']");
    test.step("*** Selected Coupa as the adaptor ***", async ()=>{});

    io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);

    await io.homePage.loadingTime();
    test.step("*** Clicking on Import Records into Destination Application ***", async ()=>{});
    await io.homePage.loadingTime();

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    var noConnectionText = await page.locator(
      'p:has(+ [data-test="addNewResource"])'
    ).textContent();

    test.step("*** Checking no connection label ***", async ()=>{});

    await io.assert.expectToContainValue( "You don’t have any connections for this application.", noConnectionText,"");

    test.step("*** click on connection ***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);

    test.step("*** close connection drawer ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.importPagePO.IMPORT_CLOSE_DRAWER, 1);

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("***  Navigating to Home Page ***", async ()=>{});
  });
});
