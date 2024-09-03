
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import NS from "@testData/STANDALONE/TC_C108496.json";

test.describe("TC_C108496", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    await io.api.deleteFlowsWithId([flowId]);
    await io.homePage.loadingTime();
    test.step("*** End of Test Suite ***", async () => { });
  });
  test("TC_C108496 @Zephyr-IO-T23762 @Env-All", async ({ io, page }, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(NS);
    flowId = flows.get(NS.name)["flowId"];
    await test.step("*** Created Flows :" + flows.get(NS.name)["flowName"],async ()=>{}
    );
    await io.flowBuilder.navigateToTheFlow( flows.get(NS.name)["flowId"]
    );
    test.step("*** Navigate to Flow ***", async ()=>{});
    await io.homePage.loadingTime();

    //GraphQL lookup
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.LOOKUP, 0);
    test.step("*** Clicked on graphql lookup ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.ADVANCED);
    test.step("*** clicking on the advanced dropdown  ***", async ()=>{});
    var async = await io.homePage.isVisible("[data-test='configureAsyncHelper']");
    await io.assert.expectToBeFalse(async, "");
    test.step("*** Veriied Configure Async Helper should be hidden for GraphQL Lookups ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** clicking on close  ***", async ()=>{});
    await io.homePage.loadingTime();
    //HTTP lookup
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.LOOKUP, 1);
    test.step("*** Clicked on graphql lookup ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.ADVANCED);
    test.step("*** clicking on the advanced dropdown  ***", async ()=>{});
    var async1 = await io.homePage.isVisible("[data-test='configureAsyncHelper']");
    await io.assert.expectToBeFalse(async1, "");
    test.step("*** Veriied Configure Async Helper should be hidden for HTTP Lookups ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** clicking on close  ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async ()=>{});
  });
});
