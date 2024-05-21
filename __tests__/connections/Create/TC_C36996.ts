import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C36996_Verify that Google Bigquery is displayed in the connections tab", () => {
    test("@Env-All @Zephyr-IO-T9350 C36996_Verify that Google BigQuery is displayed under databases section in the connections dropdown", async ({ io, page },) => {
        await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.addStep('Clicked on Add New Resource');
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'Google BigQuery');
        await io.homePage.addStep('Searched for google bigquery in the search field');
        await io.assert.verifyElementDisplayedByText(
            "Databases",
            "Databases section is not displayed"
        );
        await io.homePage.addStep("Validated the visibility of Database section");
        await io.assert.verifyElementIsDisplayed(
            selectors.flowBuilderPagePO.GOOGLE_BIGQUERY,
            "Element is not displayed properly"
        );
    });

});
