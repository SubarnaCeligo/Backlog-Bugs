import { links, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/monitorSuite/monitor_all.json";

test.describe("C25997 - Verify that monitor user is not able to stop debug on listeners", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("C25997 - Verify that monitor user is not able to start/stop debug on listeners", async ({ io, page }) => {

    //Set the monitor permissions for the account
    const res = await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      testData
    );

    //Navigate to default integration
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

    // Search for a DND flow which has been running for more than 2 weeks
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Webhook_ListenerLogs_DND');
    //Wait for the test to complete
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);

    //Open the flow
    await io.flowBuilder.clickByText('Webhook_ListenerLogs_DND');

    //Open the listener and try to start debug
    await io.flowBuilder.click(selectors.flowBuilderPagePO.LISTENER);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);

    //Verify if debug option is disabled
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.REFRESH_RESOURCE, 'class', "Mui-disabled");

  });

}
)