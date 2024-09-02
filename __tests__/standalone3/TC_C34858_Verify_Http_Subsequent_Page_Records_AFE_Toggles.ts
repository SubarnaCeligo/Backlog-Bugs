
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C34858_Verify_Http_Subsequent_Page_Records_AFE_Toggles", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5564 @Env-All TC_C34858_Verify_Http_Subsequent_Page_Records_AFE_Toggles", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Exports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Creating an export ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);

    test.step("*** Selecting hTTP adapter ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);

    test.step("*** Choosing the desired Http connection ***", async ()=>{});
     
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP ZENDESK CONNECTION');
    test.step("*** Entering the export Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "Test");
    test.step("*** Clicking on next button***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var data = await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    if(await data.isVisible()) {
      await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    }
    test.step("*** Clicking on Does this API use paging option ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE);
    test.step("*** Selecting Custom relative URI method for paging ***", async ()=>{});
    await io.homePage.click( selectors.flowBuilderPagePO.SKIP);
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.SELECTPAGINGMETHOD, "Custom relative URI");
    test.step("*** Clicking on Overide Relative URI handlebar ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.OVERRIDERELATIVEURIHANDLEBAR);
    test.step("*** Verifying toggles bars should not present ***", async ()=>{});
    var relativeURI1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.assert.expectToBeTrue(relativeURI1, "");
    var relativeURI2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeTrue(relativeURI2, "");

    test.step("*** Clicking on the close button ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);

    test.step("*** Selecting Custom request body method for paging ***", async ()=>{});
    await io.homePage.click( selectors.flowBuilderPagePO.SKIP);
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.SELECTPAGINGMETHOD, "Custom request body");
    test.step("*** Clicking on Overide Relative URI handlebar ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.OVERRIDEHTTPBODYHANDLEBAR);
    test.step("*** Verifying toggles bars should not present ***", async ()=>{});
    var requestBody1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.assert.expectToBeTrue(requestBody1, "");
    var requestBody2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeTrue(requestBody2, "");

    test.step("*** Clicking on the close button ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("*** Discarding the changes ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
  });
});
