import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Test to validate the colour grading, font, sentence case of newly added fields', () => {
  test("@Env-All @Zephyr-IO-T29347  @Priority-P2", async ({
    io,
    page
  }) => {
    
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.addStep("Navigated to home page");
    await page.click(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.homePage.addStep("Clicked the Resources Tab from menu and then clicked the connection tab and navigated to the connection page.");
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.connectionPage.addStep("Clicked on Create Connection icon");
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Azure');
    await io.connectionPage.addStep("Filled the search area to search for the connection with the required name");
    await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.AZURE_SYNAPSE, "Element not displayed");
    await io.connectionPage.addStep("Validated the display for 'Microsoft Azure Synapse Analytics' ");
    await io.connectionPage.click(selectors.connectionsPagePO.AZURE_SYNAPSE);
    await io.connectionPage.addStep("Selected the Azure Synapse connector");
    await io.assert.verifyElementAttributeContainsText(selectors.connectionsPagePO.APPLICATION,'value','Microsoft Azure Synapse Analytics');
    await io.connectionPage.addStep('validated user is able to see "Azure Synapse" selected at "Application" field after selecting the connector and it is hard coded')
    await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.HOST, "Host is not visible");
    await io.connectionPage.addStep("Host name is validated");
    await io.connectionPage.fill(selectors.connectionsPagePO.NAME_INPUT, "AzureConnectionCred_T29346");
    const background_color_saveandclose = await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).evaluate((el: any) => getComputedStyle(el).backgroundColor);
    await io.assert.expectToBeValue(background_color_saveandclose,"rgb(29, 118, 199)","Background Color not blue");
    const background_color_save = await page.locator(selectors.basePagePO.SAVE).evaluate((el: any) => getComputedStyle(el).backgroundColor);
    await io.assert.expectToBeValue(background_color_save,"rgb(255, 255, 255)","BackGround Color not white");

  });
});
