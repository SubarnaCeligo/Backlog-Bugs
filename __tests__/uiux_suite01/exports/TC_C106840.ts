import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C106840_Test to validate that the user is getting help text, help syntax, able to edit the expression, and should be able to select any item from the Fields section and include it in the expression -->>GraphQL Connection/export/import/lookup", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C106840_Test to validate that the user is getting help text, help syntax, able to edit the expression, and should be able to select any item from the Fields section and include it in the expression -->>GraphQL Connection/export/import/lookup UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'GraphQL');
        await io.flowBuilder.click(selectors.connectionsPagePO.GRAPHQL_CONNECTOR);
        await io.flowBuilder.clickByIndex(selectors.basePagePO.ADD_NEW_RESOURCE, 1);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.GRAPHQL_QUERY, 1);
        await io.flowBuilder.waitForElementAttached("#rule>.ace_text-input")
        await io.flowBuilder.fill("#rule>.ace_text-input", '{{');
       
        // User able to edit the expression
        await io.flowBuilder.clickByText('Numeric');
        await io.flowBuilder.clickByText('abs');
        await io.flowBuilder.clickByTextByIndex('Fields',1)
    });
}); 
