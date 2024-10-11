
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Graphql from "@testData/STANDALONE/GraphQ_Application.json";

test.describe("TC_C_41539_Verify_Paging_Technique", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T9966 TC_C_41539_Verify_Paging_Technique", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.GRAPHQL_CONNECTOR);
    test.step("*** Selected GraphQL as the adaptor ***", async ()=>{});

    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});

    var conn = Graphql[0]["connectionId"];

    // await io.homePage.fillWebPage(selectors.basePagePO.CONNECTION, conn);
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.loadingTime();
    test.step("*** Choosing the desired GraphQL connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Graphql Export");
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE);
    await io.homePage.click(selectors.flowBuilderPagePO.SKIP);
    var first = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.PAGING_RELATIVEURI, "Custom relative URI");
    await io.assert.expectToBeTrue(first, "");
    test.step("*** Verifying Custom relative URI type showing under Paging Dropdown   ***", async ()=>{});

    var second = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.CUSTOM_REQUEST_BODY, "Custom request body");
    await io.assert.expectToBeTrue(second, "");
    test.step("*** Verifying Custom request body type showing under Paging Dropdown   ***", async ()=>{});

    var third = await io.homePage.getTextFromElement( selectors.flowBuilderPagePO.MANUAL, "Next page token (cursor)");
    await io.assert.expectToBeTrue(third, "");
    await test.step("*** Verifying Next page token (cursor) type showing under Paging Dropdown   ***",async ()=>{}
    );
  });
});
