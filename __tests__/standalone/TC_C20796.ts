import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C20796", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T2968 @Zephyr-IO-T3874 TC_C20796", async ({io,page}, testInfo) => {

    await io.flowBuilder.clickCreateFlowButton();

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});
     
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "HTTP ZENDESK");
    await io.homePage.clickByTextByIndex("HTTP ZENDESK CONNECTION", 0);
    await io.homePage.loadingTime();
    test.step("*** Choosing the desired HTTP connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "HTTP Import");
    test.step("*** writing Import Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_METHOD, "COMPOSITE");
    test.step("*** Selecting the desired Http method  ***", async () => { });
    test.step("*** clicking on the composity type dropdown ***", async () => { });
    await io.homePage.fillWebPage(selectors.exportsPagePO.COMPOSITE_DROPDOWN, "createandupdate");

    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    
    const errorText = await io.homePage.isVisible("text='Request Type'");
    await io.assert.expectToBeFalse(errorText, "");
    
    test.step("*** RequestType field is not displayed  ***", async ()=>{});
  });
});
