
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import NS from "@testData/STANDALONE/TC_C108533.json";

test.describe("TC_C108533", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    await io.api.deleteFlowsWithId([flowId]);
    test.step("*** Deleted Flow ***", async () => { });
  });
  test("TC_C108533 @Zephyr-IO-T25657 @Env-All", async ({ io, page }, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(NS);
    flowId = flows.get(NS.name)["flowId"];
    await test.step("*** Created Flows :" + flows.get(NS.name)["flowName"],async()=>{}
    );
    await io.flowBuilder.navigateToTheFlow( flows.get(NS.name)["flowId"]
    );
    test.step("*** Navigate to Flow ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    test.step("*** Clicked on export ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.EXPORTTYPE, "once");
    test.step("*** Clicked on once export type ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.REFRESH_RESOURCE, 1);
    test.step("*** clicking on refresh  ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ONCE_FIELDS);
    test.step("*** Clicking on the ONCE drop ***", async ()=>{});

    var dropdownElements = ["TC_C108533 automation DND", "Testing IO-24985"];
    for(var a in dropdownElements) {
      let matching = await io.homePage.getDropDownValue(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS, dropdownElements[a]);
      await io.assert.expectToBeTrue(matching, "");
    }
    test.step("*** Verified ONCE field Dropdown ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** clicking on close  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** clicking on discard changes  ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async ()=>{});
  });
});
