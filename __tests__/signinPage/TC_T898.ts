import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T898 Verify if user deletes existing flows/connections/imports/exports/API token/Agents then verify whether user is able to see empty statestext,buttons and hyperlinks", () => {
    test("@Env-All @Zephyr-IO-T898 @Priority-P2 T898 Verify if user deletes existing flows/connections/imports/exports/API token/Agents then verify whether user is able to see empty statestext,buttons and hyperlinks", async ({ io, page }) => {
        await io.homePage.addStep('*** Navigating to Connections Page ***');
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.click(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources", "Connections");
        await io.homePage.loadingTime();
        await io.homePage.addStep('*** Verifying the details of connection page ***');
        expect(page.getByText("You don’t have any connections")).toBeVisible();
        expect(page.getByText("Connections store credentials and other access information for an application. See all of your connections at a glance, determine where they’re being used, and make edits on this page.")).toBeVisible();
        expect(page.getByRole('link', { name: 'Learn how to establish connection' })).toBeVisible();
        expect(page.locator('a', { hasText: 'Create connection' }).nth(1)).toBeVisible();

        await io.homePage.addStep('*** Navigating to Imports Page ***');
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.click(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources", "Imports");
        await io.homePage.loadingTime();
        await io.homePage.addStep('*** Verifying the details of imports page ***');
        expect(page.getByText("You don’t have any imports")).toBeVisible();
        expect(page.getByText("Imports are used to insert data into an application. See all of your imports at a glance, determine where they’re being used, and make edits on this page.")).toBeVisible();
        expect(page.getByRole('link', { name: 'Learn more about imports' })).toBeVisible();
        expect(page.locator('a', { hasText: 'Create import' }).nth(1)).toBeVisible();

        await io.homePage.addStep('*** Navigating to Exports Page ***');
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.click(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources", "Exports");
        await io.homePage.loadingTime();
        await io.homePage.addStep('*** Verifying the details of exports page ***');
        expect(page.getByText("You don’t have any exports")).toBeVisible();
        expect(page.getByText("Exports are used to receive or extract data from an application. See all of your exports at a glance, determine where they’re being used, and make edits on this page.")).toBeVisible();
        expect(page.getByRole('link', { name: 'Learn more about exports' })).toBeVisible();
        expect(page.locator('a', { hasText: 'Create export' }).nth(1)).toBeVisible();

        await io.homePage.addStep('*** Navigating to Agents Page ***');
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.click(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources", "Agents");
        await io.homePage.loadingTime();
        await io.homePage.addStep('*** Verifying the details of agents page ***');
        expect(page.getByText("You don’t have any agents")).toBeVisible();
        expect(page.getByText("Agents are software programs that run on your server and establishes a secure tunnel for connecting to integrator.io. See all of your agents at a glance, determine where they’re being used, and make edits on this page.")).toBeVisible();
        expect(page.getByRole('link', { name: 'Integrate data through a firewall with an on-premise agent' })).toBeVisible();
        expect(page.locator('a', { hasText: 'Create agent' }).nth(1)).toBeVisible();

        await io.homePage.addStep('*** Navigating to iClients Page ***');
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.click(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources", "iClients");
        await io.homePage.loadingTime();
        await io.homePage.addStep('*** Verifying the details of iClients page ***');
        expect(page.getByText("You don't have any iClients .")).toBeVisible();

        await io.homePage.addStep('*** Navigating to Recycle bin Page ***');
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.click(selectors.basePagePO.RESOURCES);
        await io.homePage.click(selectors.basePagePO.RECYCLE_BIN);
        await io.homePage.loadingTime();
        await io.homePage.addStep('*** Verifying the details of Recycle bin page ***');
        expect(page.getByText("Your recycle bin is empty")).toBeVisible();
        expect(page.getByText("You can view all deleted items from your account on this page.")).toBeVisible();

        await io.homePage.addStep('*** Navigating to flows Page ***');
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.clickByText('Automation Flows');
        await io.homePage.loadingTime();
        await io.homePage.addStep('*** Verifying the details of flows page ***');
        expect(page.getByText("You don’t have any flows yet")).toBeVisible();
        expect(page.getByText("Select + Create flow to create a new flow or Attach flows from the ... More menu to add them from the Standalone flows tile.")).toBeVisible();
        expect(page.getByRole('link', { name: 'Create flow now' })).toBeVisible();
    });
});