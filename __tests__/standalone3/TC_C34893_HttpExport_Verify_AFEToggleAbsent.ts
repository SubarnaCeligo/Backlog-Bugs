import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C34893_HttpExport_Verify_AFEToggleAbsent", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T5566 @Env-All TC_C34893_HttpExport_Verify_AFEToggleAbsent", async ({io,page}, testInfo) => {
    /**Create Page Generator **/
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as export ***", async ()=>{});

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP ZENDESK CONNECTION');
    test.step("*** Choosing the HTTP ZD connection ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.clickButtonByIndex(selectors.exportsPagePO.HTTP_RELATIVEURI, 1);
    test.step("*** Clicked on HTTP RelativeUri Openhandler ***", async ()=>{});

    test.step("*** Verifying the AFE toggle should not be present ***", async ()=>{});
    var status01 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await expect(status01).toBeFalsy();
    var status02 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await expect(status02).toBeFalsy();

    test.step("*** Clicked on close ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);

    await io.homePage.click(selectors.exportsPagePO.HTTP_BODY);
    test.step("*** Clicked on HTTP Requestbody Openhandler ***", async ()=>{});

    test.step("*** Verifying the AFE toggle should not be present ***", async ()=>{});
    var status1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await expect(status1).toBeFalsy();
    var status2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await expect(status2).toBeFalsy();

    test.step("*** Clicked on close ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);

    await io.homePage.loadingTime();

    test.step("*** Clicked on close ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
  });
});
