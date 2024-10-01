
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C63646.json";

test.describe("TC_C63646", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
  });
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** End of Test Suite ***", async ()=>{});
    await io.api.deleteFlowsWithId([flowId]);
  });
  test("TC_C63646 @Env-All @Zephyr-IO-T8183", async ({io,page}, testInfo) => {
    // C63646 Verify 'Get More Info' link on Import hook page pointing to an incorrect KB article.
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(HTTP);
    flowId = flows.get(HTTP.name)["flowId"];
    await test.step("*** Created Flows :" + flows.get(HTTP.name)["flowName"],async ()=>{}
    );
    await io.flowBuilder.navigateToTheFlow( flows.get(HTTP.name)["flowId"]
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Opening the flow ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS);
    test.step("*** Clicking on the create script ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.PREMAPSCRIPT, 0);
    test.step("*** Clicking on help text ***", async ()=>{});

    const adv1 = await page.locator(selectors.flowBuilderPagePO.GETMOREINFOLINK);
    const areaEx1 = await adv1.getAttribute("href");
    await io.assert.expectToContainValue("https://docs.celigo.com/hc/en-us/articles/5926315530139-Import-hooks#preMapHook",areaEx1, "");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("Clicked On Close", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page ", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
});
