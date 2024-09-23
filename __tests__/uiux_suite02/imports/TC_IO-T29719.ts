import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Test to validate user is able to delete the Azure synapse import', () => {
    test("@Env-All @Epic-IO-65860 @Zephyr-IO-T29719 @Priority-P2", async ({
        io,
        page
    }) => {

        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("Navigated to home page");
        await page.click(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources", "Imports");
        await io.homePage.addStep("Clicked the Resources Tab from menu and then clicked the imports tab and navigated to the imports page.");
        await io.importsPage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR,'AzureSynapseImports');
        await io.importsPage.loadingTime();
        await io.importsPage.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU,1);
        await io.importsPage.clickByText('Delete import');
        await io.importsPage.clickByText('Delete');
        await io.importsPage.addStep("Verified Deletion of Imports");
        
    });
});
