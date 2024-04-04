import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C43526 - Verify import preview panel for import mapping with array field", () => {
  test("@Epic-IO-23131 @Env-All @Zephyr/IO-T561 @Priority-P2 C43526 - Verify import preview panel for import mapping with array field", async ({ io }) => {

    //Navigate to default integration
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

    // Search for a flow
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'flow-C43526_DND');
    
    //Wait for search to complete
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
 
    //Open the flow
    await io.flowBuilder.clickByText('flow-C43526_DND');
    await io.importsPage.click(selectors.importPagePO.CLICKIMPORT);
    await io.importsPage.loadingTime();
    await io.flowBuilder.click(selectors.importPagePO.FETCH_PREVIEW);
    await io.importsPage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.basePagePO.ACE_EDITOR_ID, '{  "name": "apple",  "color": "red",  "type": "fruit"}');

  });
});