import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C34938_Verify_HttpExport_AFEToggle", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T5567 @Env-All TC_C34938_Verify_HttpExport_AFEToggle", async ({io,page}, testInfo) => {
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

    await io.homePage.loadingTime()
    test.step("*** Selecting HTTP Method ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_METHOD, "GET");

    test.step("*** Entering Relative Uri ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVE_URI, "/users");

    test.step("*** Clicking on Advanced dropdown ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.ADVANCED);

    test.step("*** Clicking on DataUri template handler ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.DATAURITEMPLATE, 1);

    test.step("*** Verifying the AFE toggle is present ***", async ()=>{});
    var status1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.assert.expectToBeTrue(status1, "");
    var status2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeTrue(status2, "");

    test.step("*** Clicked on close ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);

    test.step("*** Clicking on Override tracekey template handler ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.TRACEKAY_TEMPLATEHANDLER, 1);
    var status01 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await expect(status01).toBeFalsy();
    var status02 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await expect(status02).toBeFalsy();

    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("*** Clicked on close ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);

    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    
  });
});
