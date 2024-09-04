import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("TC_C33557_Http_Success_Error_MediaType_Fields_validation", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T9851 @Env-All TC_C33557_Http_Success_Error_MediaType_Fields_validation", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime()
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime() 

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "HTTP ZENDESK CONNECTION");
    test.step("*** Choosing the desired HTTP connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "HTTP Import");
    test.step("*** writing Import Name ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.EDITCLIENT);
    test.step("*** Clicking on editnewresource button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.MEDIA_TYPE);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.JSON, "JSON");
    await io.homePage.loadingTime();
    test.step("***Selecting JSON in request media type ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BASIC_PASSWORD, decrypt(process.env["HTTP_ZENDESK_PASSWORD"]));
    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "Your connection is working great! Nice Job!",
      "Connection is not successful"
    );
    test.step("*** Verifying that the connection is successful or not ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var data = await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    if(await data.isVisible()) {
      await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    }
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE, 0);
    test.step("*** Clicking on sucess media type in connection form ***", async ()=>{});
    const dropdownElements = ["JSON"];
    const loc = "ul div li";
    for(var a = 0; a < loc.length; a++) {
      let matching = await io.homePage.getDropDownValue(loc, dropdownElements[0]);
      await io.assert.expectToBeValue(String(matching), String(false), "");
    }
    test.step("*** Verifying  Media type of connection JSON is not present in success media type field  ***", async ()=>{});
    await io.homePage.clickButtonByIndex(loc, 0);
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_ERROR_RESPONSE, 0);
    test.step("*** Clicking on error  media type in connection form ***", async ()=>{});
    const dropdownElements1 = ["JSON"];
    const loc1 = "ul div li"
    for(var a1 = 0; a1 < loc1.length; a1++) {
      let matching1 = await io.homePage.getDropDownValue(loc1, dropdownElements1[0]);
      await io.assert.expectToBeValue(String(matching1), String(false), "");
    }
    test.step("*** Verifying  Media type of connection JSON is not present in error media type field ***", async ()=>{});
    test.step("***  Closing the export ***", async ()=>{});
    await io.homePage.clickButtonByIndex(loc, 0);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
  });
});
