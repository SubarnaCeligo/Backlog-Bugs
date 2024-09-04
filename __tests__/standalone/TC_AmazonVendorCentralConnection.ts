import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import exp from "constants";

test.describe("AmazonVendorCentralConnection", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });

  test("@Env-All @Zephyr-IO-T22122 C45226_C45227_C45228_C62571", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime()
    var displayed = await page.locator(
      selectors.flowBuilderPagePO.AMAZONVENDORCENTRAL
    ).isVisible();
    await io.assert.expectToBeTrue(displayed, "");
  });

  test("@Env-All @Zephyr-IO-T22121 C45226_C45227_C45228_C62571", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.AMAZONVENDORCENTRAL);
    await io.homePage.loadingTime();

    const nameField = await page.locator(selectors.flowBuilderPagePO.RENAME).isVisible();
    await io.assert.expectToBeTrue(nameField, "");

    await io.homePage.click(selectors.exportsPagePO.NAME_HELP_TEXT);
    await io.homePage.loadingTime();

    var nametext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)
    await io.assert.expectToContainValue( "Enter a unique name for your connection so that you can easily reference it from other parts of the application.", String(nametext),"");

    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "amazon vendor central connection");
      
    // API Type field
    var apiType = await page.locator(selectors.flowBuilderPagePO.APITYPE).isVisible();
    await io.assert.expectToBeTrue(apiType, "");
    await io.homePage.click(`${selectors.connectionsPagePO.API_TYPE} ${selectors.exportsPagePO.HELP_TEXT_ICLIENT}`);
    var apitext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)
    await expect(String(apitext)).toContain("Selling Partner API (SP-API): The Selling Partner API is a REST-based API and is an evolution of the legacy Amazon Marketplace Web Service (MWS) APIs.");
  });

  test("@Env-All @Zephyr-IO-T22127 C45226_C45227_C45228_C62571", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.flowBuilderPagePO.AMAZONVENDORCENTRAL);
    await io.homePage.loadingTime();

    var spApi = await page.locator("//div[text()='Selling Partner API (SP-API)']").isVisible();
    await io.assert.expectToBeTrue(spApi, "");
    
  });

  test("@Env-All @Zephyr-IO-T22123 C45226_C45227_C45228_C62571", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime()
    
    await io.homePage.click(selectors.flowBuilderPagePO.AMAZONVENDORCENTRAL);
    await io.homePage.loadingTime();

    // Selling Region field
    var sellingRegion = await page.locator(selectors.connectionsPagePO.SELLING_REGION).isVisible();
    await io.assert.expectToBeTrue(sellingRegion, "");
    const sellingRegionEl = await page.getByLabel("Selling region").first();
    
    await io.homePage.click("//div[@id='http.unencrypted.sellingRegion']//button");
    var apitext1 = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)
    await io.assert.expectToContainValue( "Select AWS regions to associate your API Endpoints. The region is required for calculating a signature when calling the Selling Partner API.",String(apitext1), "");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    //Marketplace field
    var marketPlace = await page.locator(
      selectors.connectionsPagePO.MARKET_PLACE
    ).isVisible();
    await io.assert.expectToBeTrue(marketPlace, "");
    await io.homePage.click("//div[@id='http.unencrypted.marketplace']//button");
    var apitext2 = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)

    await io.assert.expectToContainValue( "Select a country or marketplace for your connection request. This field is populated based on the selling region chosen above.",String(apitext2), "");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    //Selling regions
    await io.homePage.click(selectors.connectionsPagePO.SELLING_REGION);
    var northamerica = await io.homePage.isVisible(selectors.connectionsPagePO.NORTHAMERICA);
    await io.assert.expectToBeTrue(northamerica, "");
    var europe = await io.homePage.isVisible(selectors.connectionsPagePO.EUROPE);
    await io.assert.expectToBeTrue(europe, "");
    var farEast = await io.homePage.isVisible(selectors.connectionsPagePO.FAREAST);
    await io.assert.expectToBeTrue(farEast, "");

    // North america
    await io.homePage.click(selectors.connectionsPagePO.NORTHAMERICA);
    await io.homePage.click(selectors.connectionsPagePO.MARKET_PLACE);
    var brazil = await io.homePage.isVisible(selectors.connectionsPagePO.BRAZIL);
    await io.assert.expectToBeTrue(brazil, "");
    var canada = await io.homePage.isVisible(selectors.connectionsPagePO.CANADA);
    await io.assert.expectToBeTrue(canada, "");
    var mexico = await io.homePage.isVisible(selectors.connectionsPagePO.MEXICO);
    await io.assert.expectToBeTrue(mexico, "");
    var usa = await io.homePage.isVisible(selectors.connectionsPagePO.USA);
    await io.assert.expectToBeTrue(usa, "");

    // Europe
    await io.homePage.click(selectors.connectionsPagePO.BRAZIL);
    await io.homePage.click(selectors.connectionsPagePO.SELLING_REGION);
    await io.homePage.click(selectors.connectionsPagePO.EUROPE);
    await io.homePage.click(selectors.connectionsPagePO.MARKET_PLACE);
    await io.homePage.loadingTime();
    var belgium = await io.homePage.isVisible(selectors.connectionsPagePO.BELGIUM);
    await io.assert.expectToBeTrue(belgium, "");
    var egypt = await io.homePage.isVisible(selectors.connectionsPagePO.EGYPT);
    await io.assert.expectToBeTrue(egypt, "");
    var france = await io.homePage.isVisible(selectors.connectionsPagePO.FRANCE);
    await io.assert.expectToBeTrue(france, "");
    var germany = await io.homePage.isVisible(selectors.connectionsPagePO.GERMANY);
    await io.assert.expectToBeTrue(germany, "");
    var india = await io.homePage.isVisible(selectors.connectionsPagePO.INDIA);
    await io.assert.expectToBeTrue(india, "");
    let element = await page.locator(selectors.connectionsPagePO.INDIA);
    await element.scrollIntoViewIfNeeded();
    await page.waitForSelector(selectors.connectionsPagePO.ITALY);
    var italy = await io.homePage.isVisible(selectors.connectionsPagePO.ITALY);
    await io.assert.expectToBeTrue(italy, "");
    var netherland = await io.homePage.isVisible(selectors.connectionsPagePO.NETHERLAND);
    await io.assert.expectToBeTrue(netherland, "");
    var poland = await io.homePage.isVisible(selectors.connectionsPagePO.POLAND);
    await io.assert.expectToBeTrue(poland, "");
    element = await page.locator(selectors.connectionsPagePO.POLAND);
    await element.scrollIntoViewIfNeeded();
    
    var saudi_arabia = await io.homePage.isVisible(selectors.connectionsPagePO.SAUDI_ARABIA);
    await io.assert.expectToBeTrue(saudi_arabia, "");
    var spain = await io.homePage.isVisible(selectors.connectionsPagePO.SPAIN);
    await io.assert.expectToBeTrue(spain, "");

    element = await page.locator(selectors.connectionsPagePO.SPAIN);
    await element.scrollIntoViewIfNeeded();
    await page.waitForSelector(selectors.connectionsPagePO.SWEDEN);

    var sweden = await io.homePage.isVisible(selectors.connectionsPagePO.SWEDEN);
    await io.assert.expectToBeTrue(sweden, "");
    element = await page.locator(selectors.connectionsPagePO.SWEDEN);
    await element.scrollIntoViewIfNeeded();

    var turkey = await io.homePage.isVisible(selectors.connectionsPagePO.TURKEY);
    await io.assert.expectToBeTrue(turkey, "");
    element = await page.locator(selectors.connectionsPagePO.TURKEY);
    await element.scrollIntoViewIfNeeded();
    var uae = await io.homePage.isVisible(selectors.connectionsPagePO.UAE);
    await io.assert.expectToBeTrue(uae, "");
    var uk = await io.homePage.isVisible(selectors.connectionsPagePO.UK);
    await io.assert.expectToBeTrue(uk, "");
    await io.homePage.click(selectors.connectionsPagePO.UAE);

    // Far East
    await io.homePage.click(selectors.connectionsPagePO.SELLING_REGION);
    await io.homePage.click(selectors.connectionsPagePO.FAREAST);
    await io.homePage.click(selectors.connectionsPagePO.MARKET_PLACE);
    var australia = await io.homePage.isVisible(selectors.connectionsPagePO.AUSTRALIA);
    await io.assert.expectToBeTrue(australia, "");
    var japan = await io.homePage.isVisible(selectors.connectionsPagePO.JAPAN);
    await io.assert.expectToBeTrue(japan, "");
    var singapore = await io.homePage.isVisible(selectors.connectionsPagePO.SINGAPORE);
    await io.assert.expectToBeTrue(singapore, "");
  });
});
