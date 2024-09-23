import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Test to validate user is able to see "Azure Synapse" logo on the top right side corner of importpage', () => {
  test("@Env-All @Epic-IO-65860 @Zephyr-IO-T29714 @Priority-P2 This is to verify the Azure Synapse logo beside connection name after clicking create connection" , async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await page.click(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Resources", "Imports");
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
});