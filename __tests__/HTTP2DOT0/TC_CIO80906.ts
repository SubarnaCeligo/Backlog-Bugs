import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_CIO80906", () => {
  test("@Env-QA @Zephyr-T35372 @Zephyr-T35373 @Zephyr-T35374 @Zephyr-T35375 @Zephyr-T35376 @Zephyr-T35377 @Zephyr-T35378 @Zephyr-T35379 @Zephyr-T35380 @Zephyr-T35381 @Zephyr-T35382 @Zephyr-T35383 @Zephyr-T35384 @Priority-P2 Verify error and success field values", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilderDashboard.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "HTTP"
    );
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(
      selectors.importPagePO.HTTP_BASEURI, "https://google.com"
    );
    await io.flowBuilder.fill(
      selectors.exportsPagePO.BQNAME, "Success and errorpath test"
    );
    await io.connectionPage.click(selectors.connectionsPagePO.AUTH_TYPE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CUSTOM);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.CUSTOM);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.HOW_TO_TESTCONNECTION);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.connectionsPagePO.ERRORVALUES,"testerror");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.loadingTime();
    await expect(page.getByText('A value must be provided')).toBeVisible();
    await io.flowBuilder.fill(selectors.connectionsPagePO.ERRORPATH,"/errorpath");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.connectionsPagePO.SUCCESSVALUES,"testsuccess")
   await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await expect(page.getByText('A value must be provided')).toBeVisible();
    await io.flowBuilder.fill(selectors.connectionsPagePO.SUCCESSPATH,"/successpath");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NONSTANDARD);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.connectionsPagePO.RATELIMITERROR,"testratelimit");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await expect(page.getByText('A value must be provided')).toBeVisible();
    await io.flowBuilder.fill(selectors.connectionsPagePO.RATELIMITERRORPATH,"/ratelimitpath");
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.AUTH_TYPE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.OAUTH);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.OAUTH);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.ICLIENTID);
    await io.flowBuilder.loadingTime();
    await page.locator(selectors.flowBuilderPagePO.MENUITEM).nth(1).waitFor();
    await page.locator(selectors.flowBuilderPagePO.MENUITEM).nth(1).click();
    await io.flowBuilder.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.flowBuilder.fill(selectors.connectionsPagePO.OVERRIDEERROR,"overrideerror");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await expect(page.getByText('A value must be provided')).toBeVisible();
    await io.flowBuilder.fill(selectors.connectionsPagePO.OVERRIDEPATH,"/overridepath");
    await io.connectionPage.click(selectors.connectionsPagePO.AUTH_TYPE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CUSTOM);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.CUSTOM);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.connectionsPagePO.AUTHERRORVALUE,"autherrorvalue");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await expect(page.getByText('A value must be provided')).toBeVisible();
    await io.flowBuilder.fill(selectors.connectionsPagePO.AUTHERRORPATH,"/autherrorpath");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, "Success and errorpath test");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.flowBuilderPagePO.APIMPUSHOPTION);
    await io.homePage.loadingTime();
    const errorvalue = await page.locator(selectors.connectionsPagePO.ERRORVALUES).getAttribute("value");
    const succesvalue = await page.locator(selectors.connectionsPagePO.SUCCESSVALUES).getAttribute("value");
    const ratelimiterrorvalue = await page.locator(selectors.connectionsPagePO.RATELIMITERROR).getAttribute("value");
    const autherrorvalue = await page.locator(selectors.connectionsPagePO.AUTHERRORVALUE).getAttribute("value");
    expect(succesvalue).toBe("testsuccess");
    expect(errorvalue).toBe("testerror");
    expect(ratelimiterrorvalue).toBe("testratelimit");
    expect(autherrorvalue).toBe("autherrorvalue");
   await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
   await io.homePage.loadingTime();
    // deleting the created Connection
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, "Success and errorpath test");
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.DELETE_CONNECTION);
    await io.flowBuilder.click(selectors.basePagePO.DELETE);
  });
});