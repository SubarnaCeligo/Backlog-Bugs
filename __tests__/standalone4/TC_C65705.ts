
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C65705", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("TC_C65705 @Env-All @Zephyr-IO-T23168", async ({io,page}, testInfo) => {
    // C65705 Verify ""What would you like to do"" dropdown automatically opening while creating new export/import
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Clicked on Create Flow ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on Export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.NETSUITE);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();

    var value = await(await page.locator(selectors.flowBuilderPagePO.SELECTED_EXPORT_RECORDS)
    ).isVisible();
    await io.assert.expectToBeTrue(value, "");
    var value1 = await(await page.locator( selectors.flowBuilderPagePO.REALTIME_EXPORT_TYPE)
    ).isVisible();
    await io.assert.expectToBeTrue(value1, "");

    test.step("*** Verified 'What would you like to do' dropdown should be automatically opening while creating new export ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.REALTIME_EXPORT_TYPE);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicken on Close ***", async ()=>{});

    //Import
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on Import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.NETSUITE);
    test.step("*** Selected netsuite as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    var value2 = await(await page.locator(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS)
    ).isVisible();
    await io.assert.expectToBeTrue(value2, "");
    var value3 = await(await page.locator(selectors.flowBuilderPagePO.SELECT_LOOKUP)
    ).isVisible();
    await io.assert.expectToBeTrue(value3, "");

    test.step("*** Verified 'What would you like to do' dropdown should be automatically opening while creating new import ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicken on Close ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page ", async ()=>{});
  });
});
