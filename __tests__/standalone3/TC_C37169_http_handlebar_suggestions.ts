import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import http from "@testData/STANDALONE/HTTP_connection.json";

test.describe("HTTP_Handlebar", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T9721 @Env-All TC_C37169_http_handlebar", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    var conn = http[0]["connectionId"];
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.loadingTime();
    test.step("*** Choosing the desired HTTP connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "HTTP handlebar ref");
    test.step("*** Renaming the PP ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.importPagePO.SELECTHTTPMETHOD, "POST");
    test.step("*** Seleting HTTP method as POST ***", async ()=>{});

    await io.homePage.click(selectors.exportsPagePO.HTTP_BODY);
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "{{");
    test.step("*** Opening handlebar and typing {{ for the suggestions dropdown ***", async ()=>{});
    await io.homePage.loadingTime();
    var store = await io.homePage.isVisible(selectors.integrationPagePO.REQUEST_TEXT);
    await io.assert.expectToBeTrue(store, "");
    test.step("*** Verifying that the dropdown is coming or not ***", async ()=>{});
  });
});
