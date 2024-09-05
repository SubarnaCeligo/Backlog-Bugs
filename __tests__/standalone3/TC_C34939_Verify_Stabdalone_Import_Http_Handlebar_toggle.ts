import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C34939_Verify_Stabdalone_Import_Http_Handlebar_toggle", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5568 @Env-All TC_C34939_Verify_Stabdalone_Import_Http_Handlebar_toggle", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Imports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    
    test.step("*** Selecting Http adapter ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.homePage.loadingTime();
    
    test.step("*** Choosing the desired Http connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP ZENDESK CONNECTION');
    
    test.step("*** Entering the Import Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "Test");
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    
    test.step("*** Http method clicking  ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD);
    await io.homePage.click(selectors.importPagePO.HTTPPOSTMETHOD);
    test.step("*** verifying sample data in Resources available for your handlebars template  in relative URI***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.HTTP_RELATIVEURI);
    test.step("*** Verifying toggles bars should not present ***", async ()=>{});
    var relativeURI1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.assert.expectToBeFalse(relativeURI1, "");
    var relativeURI2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeFalse(relativeURI2, "");
    test.step("*** Closing the relative URI handle bar ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Clicking on http body handle bar ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.HTTP_BODY);
    var httpBody1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.assert.expectToBeFalse(httpBody1, "");
    var httpBody2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeFalse(httpBody2, "");

    await io.homePage.clickByIndex(selectors.basePagePO.CLOSE,1);
    test.step("*** Discarding the changes ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
  });
});
