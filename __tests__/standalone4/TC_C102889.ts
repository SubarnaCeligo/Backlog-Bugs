
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C102889_C102894_C102897_C102898_C102899", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("TC_C102889_C102894_C102897_C102898_C102899 @Zephyr-IO-T23718 @Zephyr-IO-T23722 @Zephyr-IO-T23724 @Zephyr-IO-T23725 @Zephyr-IO-T23726 @Env-QA @Env-STAGING @Env-IAQA", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.MARKETPLACE);
    test.step("*** Clicking on the marketplace ***", async ()=>{});
    await io.homePage.loadingTime();

    //TC_C102889 Verify view start with 'By Application' expanded and visible.
    var byApplication = await io.homePage.isVisible(selectors.marketplacePagePO.APPLICATION_FILTER_LIST);
    await io.assert.expectToBeTrue(byApplication, "The filter is not visible or expanded");
    test.step("*** Verified 'By Application' should be expanded and visible ***", async () => { });

    //TC_C102899 Verify changes when we don't have any search result to show.
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "No Result");
    await io.homePage.loadingTime();

    //1.Header should show : "No results for 'text' "
    await io.assert.verifyElementDisplayedByText(
      "We could not find anything related to 'No Result'...",
      "No search result header is not displayed"
    );
    test.step("*** Verified header label ***", async ()=>{});

    //2. Message
    await io.assert.verifyElementDisplayedByText(
      "Don't see your application? Integrate with thousands of apps easily using our universal connectors.",
      "No search result message is not displayed"
    );
    test.step("*** Verified message if we don't have any result ***", async ()=>{});
    const connLink = await (
      await page.locator(selectors.flowBuilderPagePO.GETMOREINFOLINK)
    ).getAttribute("href");
    await io.assert.expectToContainValue("https://docs.celigo.com/hc/en-us/categories/5926399756187", connLink, "");

    //3. It should suggest 4 popular apps and label = "You might be interested in these popular integration app and templates..."
    await io.assert.verifyElementDisplayedByText(
      "You might be interested in these popular integration apps and templates...",
      "Suggestion message is not displayed"
    );
    test.step("*** Verified label for popular integration ***", async ()=>{});
    var length = (await page.$$(selectors.marketplacePagePO.CONTACTLESS_REQUEST_DEMO)).length;
    await io.assert.expectToBeValue(String(length), String(4), "");
    test.step("*** Verified It should suggest 4 popular apps ***", async ()=>{});

    //TC_C102897 Verify Helpful link added to the Marketplace place.
    await io.assert.verifyElementContainsText(selectors.marketplacePagePO.MARKETPLACE_DOC_TEXT, "How to jump-start integrations with templates and apps");
    test.step("*** Verified label- 'How to jump-start integrations with templates and apps' ***", async ()=>{});
    const helpLink = await (await page.locator(selectors.marketplacePagePO.MARKETPLACE_DOC_LINK)
    ).getAttribute("href");
    await io.assert.expectToContainValue("https://docs.celigo.com/hc/en-us/articles/4403702343195-Jump-start-integrations-with-templates-and-apps",helpLink, "");

    //TC_C102898 Verify search result header should display when result are drawn.
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "HTTP");
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "integration app(s) and template(s)",
      "Search result header is not displayed"
    );
    test.step("*** Verified header label ***", async ()=>{});
    await io.homePage.click(selectors.marketplacePagePO.CLEAR_SEARCH_BUTTON);  
    test.step("*** Clicking on clear search ***", async ()=>{});

    //TC_C102894 Verify changes if user select multiple application in By application filter.
    let elem = await page.$$(selectors.marketplacePagePO.APPLICATION_FILTER_LIST_OPTIONS);
    for(var i = 0; i <= 3; i++) {
      await elem[i].focus();
      await elem[i].hover();
      await elem[i].click();
      await io.homePage.loadingTime();
    }
    test.step("*** Clicking on multiple application in By application filter ***", async ()=>{});
    var count = await page.$$(selectors.marketplacePagePO.APPLICATION_FILTER_OPTIONS_CLEAR);
    var result = await count[0].textContent();
    await io.assert.expectToContainValue("clear[4]", result, "");
    test.step("*** Verified After selection, this action 'Clear + [count of selected items], appears and should remain visible when expanded. ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.marketplacePagePO.FILTERS_ICON, 0);
    test.step("*** Clicking on collapse by application filter ***", async ()=>{});
    await io.homePage.loadingTime();
    var count1 = await page.$$(selectors.marketplacePagePO.APPLICATION_FILTER_OPTIONS_CLEAR);
    var result1 = await count1[0].textContent();
    await io.assert.expectToContainValue("clear[4]", result1, "");
    test.step("*** Verified After selection, this action 'Clear + [count of selected items], appears and should remain visible when collapsed. ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to home page ***", async ()=>{});
  });
});
