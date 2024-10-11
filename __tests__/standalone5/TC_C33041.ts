import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C33041_check_pop-up_text", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
    await io.api.deleteIntegrationRecursively("TC_C33041_int");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting Resources created for the test case ***" , async ()=>{});
    await io.api.deleteIntegrationRecursively("TC_C33041_int");
    test.step("Flows and Integration Deleted", async () => { });
    test.step("*** Test Suite End ***", async () => { });
  });
  test("@Zephyr-IO-T3959 @Env-All TC_C33041_check_pop-up_text", async ({io,page}, testInfo) => {
    await io.homePage.clickCreateIntegrationButton();
    test.step("*** Clicked on Create Integration ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.fillWebPage(selectors.connectionsPagePO.NAME_INPUT, "TC_C33041_int");
    test.step("*** Creating Integration with a Flow  ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.SAVE_AND_CREATE_FLOW);
    test.step("*** Clicked on Save And Create Flow button ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    
    let ex = await page.$$(selectors.connectionsPagePO.FLOW_NAME);
    await ex[0].click();
    await page.keyboard.type("1");
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.HELP_TEXT_ICON);
    await io.homePage.loadingTime();

    test.step("*** Enter Flow Name ***", async ()=>{});
    let url = await io.homePage.getCurrentUrl();
    let the_arr = (await url).split("/");
    the_arr.pop();
    let finalurl;
    finalurl = (await the_arr).join("/");
    await io.homePage.navigateTo(finalurl);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await page.locator(selectors.basePagePO.ALIASES).click();
    test.step("*** Go to Integration Page ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowBuilder.clickByText('Create alias');

    await page.locator(selectors.aliasesPagePO.ALIASES_ID).click();
    await page.keyboard.type("2");

    await io.homePage.click(selectors.aliasesPagePO.ALIASES_RESOURCES_TYPE);
    await io.homePage.click(selectors.connectionsPagePO.OPTION_FLOW);

    await io.homePage.click(selectors.aliasesPagePO.ALIASES_RESOURCES_NAME);
    await io.flowBuilder.clickByText("New flow1");

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Enter Aliases Details ***", async ()=>{});

    let alertBanner = await io.homePage.getText(selectors.connectionsPagePO.SNACKBAR_NOTIFICATION);
    await io.assert.expectToBeValue(String(alertBanner), "You’ve successfully created an alias.", "");

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.OPENACTIONSMENU);
    await io.homePage.click(selectors.aliasesPagePO.DELETE_ALIASES);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CONFIRM_DELETE_ALIAS);
    await io.homePage.loadingTime();

    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.SNACKBAR_NOTIFICATION);
    test.step("*** Verified the Banner ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
