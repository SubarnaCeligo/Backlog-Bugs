import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C108557_C102896", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("TC_C108557_C102896 @Env-All @Zephyr-IO-T23727 @Zephyr-IO-T23723", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.MARKETPLACE);
    test.step("*** Clicking on the marketplace ***", async ()=>{});

    //Landing page label
    //Group filter=Most popular and Type=All
    await io.assert.verifyElementContainsText(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE, "Popular Integration Apps and Templates");
    test.step("*** Verified label for landing page ***", async ()=>{});
    await io.homePage.loadingTime();

    //Group filter=Most recent and Type=All
    await io.homePage.clickButtonByIndex(selectors.marketplacePagePO.FILTERS_ICON, 2);
    test.step("*** Clicking on By Group dropdown ***", async ()=>{});
    await io.homePage.click(selectors.marketplacePagePO.BY_GROUP_MOST_RECENT_OPTION);
    test.step("*** Clicking on most recent group radio button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE, "Latest Integration Apps and Templates");
    test.step("*** Verified label for Group filter=Most recent and Type=All ***", async ()=>{});
    await io.homePage.loadingTime();

    //Group filter=A>Z and Type= ALL
    await io.homePage.click(selectors.marketplacePagePO.BY_GROUP_ALPHABETICAL_OPTION);
    test.step("*** Clicking on most A>Z group radio button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE, "Integration Apps and Templates");
    test.step("*** Verified label for Group filter=A>Z and Type= ALL ***", async ()=>{});
    await io.homePage.loadingTime();

    //Group filter=A>Z and Type= Templates
    await io.homePage.clickButtonByIndex(selectors.marketplacePagePO.FILTERS_ICON, 1);
    test.step("*** Clicking on Group filter dropdown ***", async ()=>{});
    await io.homePage.click(selectors.marketplacePagePO.BY_TYPE_TEMPLATE_OPTION);
    test.step("*** Clicking on Group filter = Template ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE, "All Templates");
    test.step("*** Verified label for Group filter=A>Z and Type=Templates ***", async ()=>{});
    await io.homePage.loadingTime();

    //Group filter=Most recent and Type= Templates
    await io.homePage.clickButtonByIndex(selectors.marketplacePagePO.FILTERS_ICON, 2);
    await io.homePage.click(selectors.marketplacePagePO.BY_GROUP_MOST_RECENT_OPTION);
    test.step("*** Clicking on Group filter = Most recent ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE, "Latest Templates");
    test.step("*** Verified label for Group filter=Most recent and Type=Templates ***", async () => { });
    await io.homePage.loadingTime();

    //Group filter=Most popular and Type= Templates
    await io.homePage.click(selectors.marketplacePagePO.BY_GROUP_MOST_POPULAR_OPTION);
    test.step("*** Clicking on Group filter = Most popular ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE, "Popular Templates");
    test.step("*** Verified label for Group filter=Popular and Type=Templates ***", async () => { });
    await io.homePage.loadingTime();

    //Group filter=Most popular and Type= Integration Apps
    await io.homePage.clickButtonByIndex(selectors.marketplacePagePO.FILTERS_ICON, 1);
    await io.homePage.click(selectors.marketplacePagePO.BY_TYPE_INTEGRATION_OPTION);
    test.step("*** Clicking on Group filter = Integration Apps ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE, "Popular Integration Apps");
    test.step("*** Verified label for Group filter=Most popular and Type=Integration Apps ***", async () => { });
    await io.homePage.loadingTime();

    //Group filter=Most recent and Type= Integration Apps
    await io.homePage.clickButtonByIndex(selectors.marketplacePagePO.FILTERS_ICON, 2);
    await io.homePage.click(selectors.marketplacePagePO.BY_GROUP_MOST_RECENT_OPTION);
    test.step("*** Clicking on Group filter = Most recent ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE, "Latest Integration Apps");
    test.step("*** Verified label for Group filter=Most recent and Type=Integration Apps ***", async () => { });
    await io.homePage.loadingTime();

    //Group filter=A > Z and Type= Integration Apps
    await io.homePage.click(selectors.marketplacePagePO.BY_GROUP_ALPHABETICAL_OPTION);
    test.step("*** Clicking on Group filter = A > Z ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE, "All Integration Apps");
    test.step("*** Verified label for Group filter=A > Z and Type=Integration Apps ***", async () => { });
    await io.homePage.loadingTime();

    //Group filter=Select Any app and Type= Integration Apps
    await io.homePage.clickButtonByIndex(selectors.marketplacePagePO.FILTERS_ICON, 0);
    await io.homePage.loadingTime();
    var add = await page.locator(selectors.marketplacePagePO.BY_APPLICATION_NETSUITE_OPTION);
    await add.hover();
    await add.click();
    test.step("*** Clicking on Netsuite app ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE, "integration app(s)");
    test.step("*** Verified label for Group filter=Select Any app and Type= Integration Apps ***", async ()=>{});
    await io.homePage.loadingTime();

    //Group filter=Select Any app and Type= templates
    await io.homePage.clickButtonByIndex(selectors.marketplacePagePO.FILTERS_ICON, 1);
    await io.homePage.click(selectors.marketplacePagePO.BY_TYPE_TEMPLATE_OPTION);
    test.step("*** Clicking on Type = Template ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE, "template(s)");
    test.step("*** Verified label for Group filter=Select Any app and Type= templates ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.marketplacePagePO.APPLICATION_FILTER_OPTIONS_CLEAR);
    test.step("*** Clicking on clear ***", async () => { });
    await io.homePage.loadingTime();

    //Group filter=Select Any app(No result found) and Type= templates
    await io.homePage.clickButtonByIndex(selectors.marketplacePagePO.FILTERS_ICON, 0);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.marketplacePagePO.ALL_APPLICATIONS);
    await io.homePage.loadingTime();
    var add1 = await page.locator(selectors.marketplacePagePO.BY_APPLICATION_FULFILLMENT_OPTION);
    await add1.focus();
    await add1.hover();
    await add1.click();
    test.step("*** Clicking on fulfilment ***", async () => { });
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE, "You might be interested in these popular integration apps and templates...");
    await test.step("*** Verified label for Group filter=Select Any app (No result found) and Type= templates ***"
    ,async ()=>{});
    await io.homePage.loadingTime();

    //Group filter=Select Any app(No result found) and Type= Integration apps
    await io.homePage.clickButtonByIndex(selectors.marketplacePagePO.FILTERS_ICON, 1);
    await io.homePage.click(selectors.marketplacePagePO.BY_TYPE_INTEGRATION_OPTION);
    test.step("*** Clicking on integration apps ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE, "You might be interested in these popular integration apps and templates...");
    await test.step("*** Verified label for Group filter=Select Any app (No result found) and Type= Integration apps ***"
    ,async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.marketplacePagePO.APPLICATION_FILTER_OPTIONS_CLEAR);
    await io.homePage.loadingTime();
    test.step("*** Clicking on clear ***", async () => { });

    //Group filter=Keyword Search and Type= Integration apps
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "HTTP");
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE, "integration app(s)");
    test.step("*** Verified label for Group filter=Keyword Search and Type= Integration apps ***", async ()=>{});
    await io.homePage.loadingTime();

    //Group filter=Keyword Search and Type= Template
    await io.homePage.click(selectors.marketplacePagePO.BY_TYPE_TEMPLATE_OPTION);
    test.step("*** Clicking on Type = Template ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE, "template(s)");
    test.step("*** Verified label for Group filter=Keyword Search and Type= Template ***", async ()=>{});
    await io.homePage.loadingTime();

    //Group filter=Keyword Search(No result found) and Type= Template
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "No Result");
    await io.homePage.loadingTime();
    const searchHeader = await page.$$(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE);
    const resultMessageForTemplates1 = await searchHeader[0].textContent();
    await io.assert.expectToContainValue("We could not find anything related to 'No Result'...", resultMessageForTemplates1, "Search result header is not displayed");
    const resultMessageForTemplates2 = await searchHeader[1].textContent();
    await io.assert.expectToContainValue("You might be interested in these popular integration apps and templates...", resultMessageForTemplates2, "Suggestions header is not displayed");
    await test.step("*** Verified label for Group filter=Keyword Search (No result found) and Type= Template ***"
    ,async ()=>{});
    await io.homePage.loadingTime();

    //Group filter=Keyword Search(No result found) and Type= Integration apps
    await io.homePage.click(selectors.marketplacePagePO.BY_TYPE_INTEGRATION_OPTION);
    test.step("*** Clicking on Type = Integration apps ***", async ()=>{});
    await io.homePage.loadingTime();
    const searchHeader2 = await page.$$(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE);
    const resultMessageForConnectors1 = await searchHeader2[0].textContent();
    await io.assert.expectToContainValue("We could not find anything related to 'No Result'...", resultMessageForConnectors1, "Search result header is not displayed");
    const resultMessageForConnectors2 = await searchHeader2[1].textContent();
    await io.assert.expectToContainValue("You might be interested in these popular integration apps and templates...", resultMessageForConnectors2, "Suggestions header is not displayed");
    await test.step("*** Verified label for Group filter=Keyword Search (No result found) and Type= Integration apps ***"
    ,async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to home page ***", async ()=>{});
  });
});
