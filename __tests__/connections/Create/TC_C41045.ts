import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C41045_Verify if the Application field is set to GraphQL and the Media type to JSON", () => {
    test("@Env-All TC_C41045_Verify if the Application field is set to GraphQL and the Media type to JSON UI_Backlog", async ({ io },) => {
        await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        //Creating Connection 
        await test.step("*** Creating Connection ***", async () => {
            await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
            await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'GraphQL');
            await io.homePage.clickByIndex(selectors.connectionsPagePO.GRAPHQL_CONNECTOR,0);
            await io.homePage.isPageLoaded();
            // Validating application successfully added
            await io.assert.expectToContainValue('GraphQL','GraphQL','GraphQL is not present')
        });
    });

});
