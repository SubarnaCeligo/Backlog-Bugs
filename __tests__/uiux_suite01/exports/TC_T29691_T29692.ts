import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T29691_T29692_Test to validate user is able to see 'Azure Synapse' logo on the top right side corner of export page", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Epic-IO-65860 @Priority-P2 @Zephyr-IO-T29691 @Zephyr-IO-T29692 @Env-QA", async ({
        io,
        page
    }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources", "Exports");
        await io.homePage.addStep("*** Navigated back to export page ***");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.addStep("*** Clicked on create export***");
        await page.waitForSelector(selectors.connectionsPagePO.AZURESYNAPSE_IMAGE)
        const azuresynapseImage = await page.$(selectors.connectionsPagePO.AZURESYNAPSE_IMAGE)
        const src = await azuresynapseImage?.getAttribute("src");
        const height = await azuresynapseImage?.evaluate((node) => (node as HTMLImageElement).height);
        const width = await azuresynapseImage?.evaluate((node) => (node as HTMLImageElement).width);
        // need selectors PR
        // checking for image src and minimum height and width to verify it is rendered correctly
        expect(src).toContain("azuresynapse.png");
        expect(height).toBeGreaterThan(10);
        expect(width).toBeGreaterThan(10);
    });
});


