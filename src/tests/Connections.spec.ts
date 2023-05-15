import { test, expect } from "@lib/BaseTest";
import * as selectors from "@selectors/Selectors";

test.describe("Connections Page Test Cases", () => {
  test.beforeEach(async ({ connectionsPage, basePage }) => {
    await basePage.navigateTo(connectionsPage.CONNECTIONS_PAGE_URL);
  });

  test("C57810 Verify whether the page is showing the proper readable error , when the connection goes to offline", async ({
    connectionsPage,
    basePage,
    connectionTD
  }) => {
    await basePage.click(selectors.ConnectionsPagePO.CREATE_CONNECTION);
    await connectionsPage.selectApplication(connectionTD.C57810.APP_NAME);
    await basePage.fill(selectors.ConnectionsPagePO.NAME, connectionTD.C57810.NAME);
    await basePage.fill(
      selectors.ConnectionsPagePO.MAGENTO2_BASE_URI,
      connectionTD.C57810.MAGENTO2_BASE_URI
    );
    await basePage.fill(
      selectors.ConnectionsPagePO.MAGENTO2_USERNAME,
      connectionTD.C57810.MAGENTO2_USERNAME
    );
    await basePage.fill(
      selectors.ConnectionsPagePO.MAGENTO2_PASSWORD,
      connectionTD.C57810.MAGENTO2_PASSWORD
    );
    await basePage.click(selectors.ConnectionsPagePO.MAGENTO2_GENERATE_TOKEN);
    await basePage.fill(
      selectors.ConnectionsPagePO.MAGENTO2_BASE_URI,
      connectionTD.C57810.Magento_URI
    );
    await basePage.click(selectors.ConnectionsPagePO.TEST_CONNECTION);
    //await this.page.waitForLoadState();
    var actual = await basePage.getText(selectors.MyAccountPagePO.SNACK_BAR_MESSAGE);
    await expect(actual).toBe(
      "Your test was not successful. Check your information and try again"
    );
  });

  test("C57811 Verify connection is saving upon clicking the save and close button, without testing the connection.", async ({
    connectionsPage,
    basePage,
    assert,
    connectionTD
  }) => {
    await basePage.click(selectors.ConnectionsPagePO.CREATE_CONNECTION);
    await connectionsPage.selectApplication(connectionTD.C57811.APP_NAME);
    await basePage.fill(selectors.ConnectionsPagePO.NAME, connectionTD.C57811.NAME);
    await basePage.fill(
      selectors.ConnectionsPagePO.MAGENTO2_BASE_URI,
      connectionTD.C57811.MAGENTO2_BASE_URI
    );
    await basePage.fill(
      selectors.ConnectionsPagePO.MAGENTO2_USERNAME,
      connectionTD.C57811.MAGENTO2_USERNAME
    );
    await basePage.fill(
      selectors.ConnectionsPagePO.MAGENTO2_PASSWORD,
      connectionTD.C57811.MAGENTO2_PASSWORD
    );
    await basePage.click(selectors.ConnectionsPagePO.MAGENTO2_GENERATE_TOKEN);
    await basePage.click(selectors.BasePagePO.SAVE_AND_CLOSE);
    await assert.verifyElementContainsText(
      selectors.ConnectionsPagePO.FIRST_ROW_IN_CONNECTIONS_PAGE,
      "Test C57811"
    );
  });
});
