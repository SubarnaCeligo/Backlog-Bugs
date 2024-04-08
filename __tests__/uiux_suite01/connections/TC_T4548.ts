import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as T4548 from "@testData/Connections/TC_T4548.json";


test.describe("T4548 Verify that the test ping is successfull for quick base connection ,when valid details are given to validate the conenction UI_Backlog", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

  });
  test("@Env-All T4548 Verify that the test ping is successfull for quick base connection ,when valid details are given to validate the conenction UI_Backlog", async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'quickbase');
    await io.connectionPage.click(selectors.connectionsPagePO.QUICKBASE_CONNECTION);
    await io.flowBuilder.loadingTime();

    await io.connectionPage.fill(selectors.connectionsPagePO.NAME_INPUT, T4548.NAME);
    await io.connectionPage.fill(selectors.connectionsPagePO.QUICKBASE_TOKEN, T4548.TOKEN);
    await io.connectionPage.fill(selectors.connectionsPagePO.QUICKBASE_HOST_NAME, T4548.HOST_NAME);
    await io.connectionPage.fill(selectors.connectionsPagePO.QUICKBASE_APP_ID, T4548.APP_ID);

    await io.connectionPage.click(selectors.basePagePO.TEST_CONNECTION);
    await io.flowBuilder.waitForElementAttached('#notification');
    await io.assert.verifyElementDisplayedByText(
      "Your connection is working great! Nice Job!",
      "Connection creation error"
    );
  });
});