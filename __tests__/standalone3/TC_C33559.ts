import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C33559", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T4639 @Env-All TC_C33559", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** clicked on HTTP adaptor ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.MEDIA_TYPE);
    test.step("*** Click on media type***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.XMLVALUE);
    test.step("***Selecting XML in request media type ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.OVERRIDE_MEDIA_SUCCESS_RESPONSE);
    test.step("*** Clicking on success media type ***", async ()=>{});

    const dropdownElements = ["XML"];
    const loc = "ul div li"
    for(var a = 0; a < loc.length; a++) {
      let matching = await io.homePage.getDropDownValue(loc, dropdownElements[0]);
      await io.assert.expectToBeValue(String(matching), String(false), "");
    }
    test.step("*** Verifying  Media type of connection XML is not present in success media type field  ***", async ()=>{});
    await io.homePage.click("[data-value='csv']");
    await io.homePage.clickButtonByIndex("[data-test='http.errorMediaType']", 0);
    test.step("*** Clicking on error  media type ***", async ()=>{});
    const dropdownElements1 = ["XML"];
    const loc1 = "ul div li"
    for(var a1 = 0; a1 < loc1.length; a1++) {
      let matching1 = await io.homePage.getDropDownValue(loc1, dropdownElements1[0]);
      await io.assert.expectToBeValue(String(matching1), String(false), "");
    }
    test.step("*** Verifying  Media type of connection XML is not present in error media type field  ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.JSON);

    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.HOME);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
