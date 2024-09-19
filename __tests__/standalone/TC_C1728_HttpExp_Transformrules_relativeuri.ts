import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/STANDALONE/TC_C1728_HttpExp_Transformrules_relativeuri.json";

test.describe("TC_C1728_HttpExp_Transformrules_relativeuri", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T9508 TC_C1728_HttpExp_Transformrules_relativeuri", async ({io,page}, testInfo) => {
    //*Create Page Generators
    test.step("*** Creating PageGenerator ***", async ()=>{});
    // await io.pageGenerator("Allure", HTTP);
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as export ***", async ()=>{});

    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});
  
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "HTTP ZENDESK");
    await io.homePage.clickByTextByIndex("HTTP ZENDESK CONNECTION", 0);
    await io.homePage.loadingTime();
    test.step("*** Choosing the desired HTTP connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_1728 export");
    test.step("*** writing Import Name ***", async ()=>{});

    test.step("*** Choosing the HTTP ZD connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_METHOD, "GET");
    test.step("*** Entering Relative Uri ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVE_URI, "/organizations");
    await io.homePage.fillWebPage(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "all");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
    await page.waitForTimeout(1000);
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    test.step("*** Clicking Transformation button***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.RULES1);
    await io.homePage.loadingTime();

    await io.homePage.fill(selectors.mappings.MAPPER2DOT0PO.EXTRACTFIRST, "organizations[0].name")
    await io.homePage.fill(selectors.flowBuilderPagePO.GENERATE_RULES, "Name")
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    test.step("*** Clicking on save and close button at export level***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    test.step("*** Clicking Transformation button***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.RULES1);
    await io.homePage.loadingTime();

    var result1 = await page.locator(selectors.flowBuilderPagePO.GENERATE_RULES);
    await result1.click();
    const value = await result1.getAttribute("value");

    await io.assert.expectToBeValue(String(value), "Name", "");
    test.step("*** Validated Transformation rules test.afterEach changing relative uri***", async ()=>{});
  });
});
