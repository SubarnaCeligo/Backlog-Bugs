import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Test to validate user is able to see the "Azure Synapse" logo at top right corner', () => {
  test("@Env-All @Zephyr-IO-T29344 @Priority-P2 This is to verify the Azure Synapse logo beside connection name after clicking create connection" , async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await page.click(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    const azureImage = await page.waitForSelector(selectors.connectionsPagePO.AZURE_SYNAPSE_IMAGE )
    
    const src = await azureImage?.getAttribute("src");
    const height = await azureImage?.evaluate((node) => (node as HTMLImageElement).height);
    const width = await azureImage?.evaluate((node) => (node as HTMLImageElement).width);

    // checking for image src and minimum height and width to verify it is rendered correctly
    expect(src).toContain("azuresynapse.png");
    expect(height).toBeGreaterThan(10);
    expect(width).toBeGreaterThan(10); 
  });
  test("@Env-All  @Zephyr-IO-T29344 @Priority-P2 'Azure Synapse' logo at top right corner ", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await page.click(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Azure');
    await io.connectionPage.addStep("Filled the search area to search for the connection with the required name");
    await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.AZURE_SYNAPSE, "Element not displayed");
    await io.connectionPage.addStep("Validated the display for 'Microsoft Azure Synapse Analytics' ");
    await io.connectionPage.click(selectors.connectionsPagePO.AZURE_SYNAPSE);
    const azureImage = await page.waitForSelector(selectors.connectionsPagePO.AZURE_SYNAPSE_LOGO);
    
    const src = await azureImage?.getAttribute("src");
    const height = await azureImage?.evaluate((node) => (node as HTMLImageElement).height);
    const width = await azureImage?.evaluate((node) => (node as HTMLImageElement).width);

    // checking for image src and minimum height and width to verify it is rendered correctly
    expect(src).toContain("azuresynapse.png");
    expect(height).toBeGreaterThan(10);
    expect(width).toBeGreaterThan(10);
  });
});