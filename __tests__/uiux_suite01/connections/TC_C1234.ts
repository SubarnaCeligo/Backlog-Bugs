import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C39816 To Verify Anaplan Logo on Connection form", () => {
  test("@Env-All C39816 To Verify Anaplan Logo on Connection form", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await page.click(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await page.pause();

    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Azure');
    await io.assert.verifyElementIsDisplayed("[data-test='Microsoft Azure Synapse Analytics']", "Element not displayed");
    await io.flowBuilder.clickByText("Microsoft Azure Synapse Analytics");
    await io.connectionPage.fill(selectors.connectionsPagePO.NAME_INPUT, "AzureConn");
    await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.HOST, "Host is not visible");
    await io.assert.verifyElementIsDisplayed('[data-test="rdbms.database"]', "Database not displayed");
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.USERNAME_RDBMS, "Username field is not displayed");
    await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.RDBMS_PASSWORD, "Password field is not displayed");
    // await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.INSTANCE_NAME, 'Instance name field is not displayed');
    await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.HELP_TEXT_ICLIENT, 'Help text with ? is not displayed');
    await io.assert.verifyElementDisplayedByText('Configure properties', "Configure properties field is not displayed");
    await io.assert.verifyElementDisplayedByText('Borrow concurrency from', "Borrow concurrency from is not displayed");
    await io.assert.verifyElementDisplayedByText('Target concurrency level *', 'Target concurrency level is not displayed');
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.CONN_CONCURRENCY, 'Concurrency level is not displayed');
    // await io.assert.verifyElementDisplayedByText('Microsoft SQL connection guide', "connection guide not displayed");
    // await io.connectionPage.clickByText('Microsoft SQL connection guide');
    // await io.connectionPage.loadingTime();
    // const expectedTitle = "Celigo integrator.io: Integration Platform-as-a-Service (iPaaS)";
    // var Title = await io.homePage.getTitle();
    // console.log(URL);
    // await io.assert.expectToContainValue(expectedTitle, Title, "Not navigated to proper page");
    // await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    // await page.click(selectors.basePagePO.RESOURCES);
    // await io.homePage.goToMenu("Resources", "Connections");
    // await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    // // await page.pause();
    // await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Microsoft Azure Synapse Analytics');
    // await io.assert.verifyElementIsDisplayed("[data-test='Microsoft Azure Synapse Analytics']", "Element not displayed");
    // await io.flowBuilder.clickByText("Microsoft Azure Synapse Analytics");
    await io.connectionPage.fill(selectors.connectionsPagePO.NAME_INPUT, "AzureConn");
    // await io.connectionPage.click('[data-test="rdbms.version"]')
    // await io.connectionPage.selectTextfromDropDown(page, 'Azure');
    await io.connectionPage.waitForElementAttached('[name="/rdbms/host"]');
    await io.connectionPage.fill('[name="/rdbms/host"]', "celigo.files.com")
    await io.connectionPage.waitForElementAttached('[name="/rdbms/database"]');
    await io.connectionPage.fill('[name="/rdbms/database"]', "unitest");
    await io.connectionPage.waitForElementAttached('[name="/rdbms/user"]');
    await io.connectionPage.fill('[name="/rdbms/user"]', "io.auto.qa+300@celigo.com")
    await io.connectionPage.waitForElementAttached('[name="/rdbms/password"]');
    await io.connectionPage.fill('[name="/rdbms/password"]', "itZDKb3PJ43bLQIS")
    await io.connectionPage.click(selectors.basePagePO.TEST_CONNECTION)
    await io.connectionPage.loadingTime();
    // await io.assert.verifyElementText(selectors.loginPagePO.CLIENT_SNACKBAR," Connection lost - read ECONNRESET");
   // await page.locator('div').filter({ hasText: /^Save & closeSaveCloseConnection lost - read ECONNRESETTest connection$/ }).getByRole('button').nth(3).click();
    await io.assert.verifyElementDisplayedByText('Your test was not successful. Check your information and try again', "Connection essage  is not displayed ")
   
    // await io.connectionPage.fill('[data-test="rdbms.host"]','www.google.com');
    // await io.connectionPage.fill('[data-test="rdbms.database"]',"unnitestDB");
    // await io.connectionPage.fill('[data-test="rdbms.user"]',"subarna.ghatak@celigo.com");
    // await io.connectionPage.fill('[data-test="rdbms.password"]',"abcdef");
    // await io.connectionPage.click('[data-test="save"]');
    await io.connectionPage.click('[data-test="cancel"]');
    // await io.connectionPage.click('[data-test="saveAndClose"]');

  });
  test("@Env-All @Zephyr-IO-T11736  C39816 To Verify Anaplan Logo on Connection form", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await page.click(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    const azureImage = await page.waitForSelector('[data-test="Microsoft Azure Synapse Analytics"] img'  )
    
    const src = await azureImage?.getAttribute("src");
    console.log(src);
    const height = await azureImage?.evaluate((node) => (node as HTMLImageElement).height);
    const width = await azureImage?.evaluate((node) => (node as HTMLImageElement).width);

    // checking for image src and minimum height and width to verify it is rendered correctly
    expect(src).toContain("azuresynapse.png");
    expect(height).toBeGreaterThan(10);
    expect(width).toBeGreaterThan(10);
  });
});
