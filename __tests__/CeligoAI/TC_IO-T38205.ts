import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-T38205 - Verify the Label name is changed for GraphQL connector on click of handelbar icon beside Query", () => {
    test("@Zephyr-IO-T38205 @Env-QA", async ({
        io,
        page
    }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

        await io.flowBuilder.addStep("Navigating to Connection Page and checking GraphQL connection");
        await io.homePage.goToMenu("Resources", "Connections");
        await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
        await io.homePage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'GraphQL');
        await io.homePage.click(selectors.connectionsPagePO.GRAPHQL_CONNECTOR);
        await page.locator(selectors.basePagePO.ADD_NAME).getByRole('textbox').click();
        await page.locator(selectors.basePagePO.ADD_NAME).getByRole('textbox').fill('GraphQLCred');
        await io.connectionPage.clickByIndex(selectors.flowBuilderPagePO.GRAPHQL_QUERY, 1);
        await page.getByText('GraphQL query').click();
        await io.assert.verifyElementDisplayedByText('GraphQL query', 'GraphQL query text is not displayed');
    });
})