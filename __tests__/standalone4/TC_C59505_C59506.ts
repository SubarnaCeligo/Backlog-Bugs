
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C59506.json";

test.describe("TC_C59505_C59506", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    test.step("*** End of Test Suite ***", async () => { });
    await io.api.deleteFlowsWithId([flowId]);
  });
  test("TC_C59505_C59506 @Env-All @Zephyr-IO-T2342 @Zephyr-IO-T2343", async ({ io, page }, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(HTTP);
    flowId = flows.get(HTTP.name)["flowId"];
    await test.step("*** Created Flows :" + flows.get(HTTP.name)["flowName"],async ()=>{}
    );
    await io.flowBuilder.navigateToTheFlow( flows.get(HTTP.name)["flowId"]
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Opening the flow ***", async ()=>{});

    await io.homePage.click(selectors.flowBranchingPO.ROUTER_BUTTON);
    test.step("*** Clicked on routerButton ***", async ()=>{});

    await io.homePage.clickButtonBasedOnLabelName(selectors.basePagePO.MENU_ITEM, "Add branching");
    test.step("Clicked on Add branching", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var URL = await io.homePage.getCurrentUrl();
    let routerID = URL.split("/").at(-1);
    await io.assert.expectToContainValue("router-",routerID, "");

    let router = URL.split("-").at(-1);
    let routerLength = router.length;
    await expect(routerLength).toEqual(11);
    test.step("*** Verified User should see 11-digit char id in the URL which starts with 'router-'. ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Clicked on Close ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicked on discard changes ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    //59505 Url id length on Mapping Settings
    //Mapper 2.0
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    test.step("*** clicking on import mapping ***", async ()=>{});
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.mappings.SETTINGSICON_1);
    test.step("*** clicking on setting option ***", async ()=>{});
    await io.homePage.loadingTime();
    var URL1 = await io.homePage.getCurrentUrl();
    let rout = URL1.split("/").at(-1);
    let mappSett = rout.length;
    await expect(mappSett).toEqual(11);
    test.step("*** Verified User should see id with length 11 in the URL when we click on the settings option in the mapping fields of Mapper 2.0 ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE_RIGHT_DRAWER, 2);

    //Mapper 1.0
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.MAPPER1DOT0BUTTON);
    test.step("*** clicking on mapper 1.0 ***", async ()=>{});
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.mappings.SETTINGSICON_1);
    
    test.step("*** clicking on setting option ***", async ()=>{});
    await io.homePage.loadingTime();
    var URL2 = await io.homePage.getCurrentUrl();
    let routs = URL2.split("settings/").at(-1);
    let mappSetts = routs.length;
    await expect(mappSetts).toEqual(11);
    test.step("*** Verified User should see id with length 11 in the URL when we click on the settings option in the mapping fields of Mapper 1.0 ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE_RIGHT_DRAWER, 2);

    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE_RIGHT_DRAWER, 1);
    test.step("*** Clicked on Close ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page ", async ()=>{});
  });
});
