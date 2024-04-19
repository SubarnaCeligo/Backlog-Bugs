import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S_T29125 [Monitor User] [Edit export/import/lookup] Verify UI shows chosen connection in edit mode", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Bug-IO-75567 @Priority-P1 @Env-QA @Zephyr-IO-T29125 [Monitor User] [Edit export/import/lookup] Verify UI shows chosen connection in edit mode", async ({ io, page }) => {
    //Go to default Integration
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

    // Search for a flow
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Branching_Scheduling_DND');
    
    //Wait for search to complete
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
 
    //Open the flow
    await io.flowBuilder.clickByText('Branching_Scheduling_DND');

    //Open export
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);

    //Verify if selected connection is shown on UI for monitor user
    await io.assert.verifyElementAttribute(selectors.basePagePO.CONNECTION_DROPDOWN, 'value', 'HTTP ZENDESK CONNECTION');

     });
});