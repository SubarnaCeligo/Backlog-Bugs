import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import sandbox_connection from "@testData/Connections/C14428_sandbox.json";
import production_connection from "@testData/Connections/C14428_production.json";


test.describe(`C14428 Verify 'none' tile of sandbox, the api (GET /api/tiles) is returning the offline connection under 'none' tile of sandbox.`, () => {
    let conn1, conn2;

    test.afterEach(async ({ io, page }) => {
        //Delete the integration and connections
        await io.connections.deleteConnection('sandbox',conn1);
        await io.connections.deleteConnection('production',conn2);

        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
        await io.homePage.clickByText('C14428 production');
        await io.homePage.click(selectors.integrationPagePO.DELETE_INTEGRATION);
        await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
        await io.homePage.loadingTime();

        await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
        await io.homePage.clickByText('C14428 sandbox');
        await io.homePage.click(selectors.integrationPagePO.DELETE_INTEGRATION);
        await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
        await io.homePage.loadingTime();
    });

    test(`C14428 Verify 'none' tile of sandbox, the api (GET /api/tiles) is returning the offline connection under 'none' tile of sandbox.`, async ({ io, page }) => {
        //create integration under sandbox
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.click(selectors.homePagePO.SANDBOX_BUTTON);
        await io.homePage.loadingTime();
        await io.homePage.click('button:has-text("Create")');
        await io.homePage.click(selectors.homePagePO.CREATE_NEW_INTEGRATION);
        await io.homePage.fill(selectors.basePagePO.NAME, "C14428 sandbox");
        await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
        await expect(page.getByText("C14428 sandbox").first()).toBeVisible({ timeout: 20000 });
        await io.homePage.addStep(
            "Verified 'C14428 sandbox' intrgration tile is visible in the home page wih sandbox environment"
        );
        
        await test.step("*** Creating Connections ***", async () => {
            conn1 = await io.connections.createConnectionViaAPI(sandbox_connection);
            conn2 = await io.connections.createConnectionViaAPI(production_connection);
        });

        await io.homePage.clickByText("C14428 sandbox");
        await io.homePage.click(selectors.basePagePO.CONNECTIONS);
        await io.homePage.clickByText('Register connections');
        await io.homePage.clickByIndex(selectors.myAccountPagePO.ERROR_CHECKBOX, 1);
        await io.homePage.click(selectors.exportsPagePO.REGISTERCONNECTION);

        //Create integration under production
        await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
        await io.homePage.loadingTime();
        await io.homePage.click('button:has-text("Create")');
        await io.homePage.click(selectors.homePagePO.CREATE_NEW_INTEGRATION);
        await io.homePage.fill(selectors.basePagePO.NAME, "C14428 production");
        await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
        await expect(page.getByText("C14428 production").first()).toBeVisible({ timeout: 20000 });
        await io.homePage.addStep(
            "Verified 'C14428 production' integration tile is visible in the home page wih production environment"
        );

        await io.homePage.clickByText("C14428 production");
        await io.homePage.click(selectors.basePagePO.CONNECTIONS);
        await io.homePage.clickByText('Register connections');
        await io.homePage.clickByIndex(selectors.myAccountPagePO.ERROR_CHECKBOX, 1);
        await io.homePage.click(selectors.exportsPagePO.REGISTERCONNECTION);

        await io.homePage.navigateToHome();
        await io.homePage.click(selectors.homePagePO.SEARCH_INTEGRATION);
        await io.homePage.fill(selectors.homePagePO.SEARCH_INTEGRATION,"C14428 sandbox");
        await io.assert.verifyElementDisplayedByText(
            "Your search didn’t return any matching results. Try expanding your search criteria.",
            "Sandox integration is not visible in the production environment"
        );
        
        await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
        await io.homePage.click(selectors.homePagePO.SEARCH_INTEGRATION);
        await io.homePage.fill(selectors.homePagePO.SEARCH_INTEGRATION,"C14428 production");
        await io.assert.verifyElementDisplayedByText(
            "Your search didn’t return any matching results. Try expanding your search criteria.",
            "Production integration is not visible in the sandbox environment"
        );
    });
})
