import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41538_GraphQL_Export_Default_Value_data", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9965 @Env-All TC_C41538_GraphQL_Export_Default_Value_data", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
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
    test.step("*** Choosing the desired connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Graphql Export");
    test.step("*** Renaming the Export ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_METHOD, "POST");
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.TYPE, "delta");
    test.step("*** Selecting the desired Export Type ***", async ()=>{});
    var res = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.TYPE, "Delta - export only modified data");
    await io.assert.expectToBeTrue(res, "export Type is incorrect");
    test.step("*** Verifying whether the proper type selected ***", async ()=>{});
    await io.homePage.isVisible(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.homePage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    test.step("*** Clicking on Non-standard API response patterns ***", async ()=>{});

    expect(await page.locator(selectors.flowBuilderPagePO.HTTPRESPONSEPATH).getAttribute('value')).toBe("data");
    test.step("***  Verified the default value is data   ***", async ()=>{});
  });
});
