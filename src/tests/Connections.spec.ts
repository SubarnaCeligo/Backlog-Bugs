import { test, expect } from "@lib/BaseTest";

test.describe("Connections Page Test Cases", () => {
  test.beforeEach(async ({ connectionsPage, webActions }) => {
    await webActions.navigateTo(connectionsPage.CONNECTIONS_PAGE_URL);
  });

  test("C57810 Verify whether the page is showing the proper readable error , when the connection goes to offline", async ({
    connectionsPage,
    webActions,
    connectionTD,
    concPagePO,
    myAccountPO
  }) => {
    await webActions.click(concPagePO.CREATE_CONNECTION);
    await connectionsPage.selectApplication(connectionTD.C57810.APP_NAME);
    await webActions.fill(concPagePO.NAME, connectionTD.C57810.NAME);
    await webActions.fill(
      concPagePO.MAGENTO2_BASE_URI,
      connectionTD.C57810.MAGENTO2_BASE_URI
    );
    await webActions.fill(
      concPagePO.MAGENTO2_USERNAME,
      connectionTD.C57810.MAGENTO2_USERNAME
    );
    await webActions.fill(
      concPagePO.MAGENTO2_PASSWORD,
      connectionTD.C57810.MAGENTO2_PASSWORD
    );
    await webActions.click(concPagePO.MAGENTO2_GENERATE_TOKEN);
    await webActions.page.waitForTimeout(5000);
    await webActions.fill(
      concPagePO.MAGENTO2_BASE_URI,
      connectionTD.C57810.MAGENTO2_BASE_URI
    );
    await webActions.click(concPagePO.TEST_CONNECTION);
    await webActions.page.waitForLoadState();
    var actual = await webActions.getText(myAccountPO.SNACK_BAR_MESSAGE);
    await expect(actual).toBe(
      "Your test was not successful. Check your information and try again"
    );
  });

  test("C57811 Verify connection is saving upon clicking the save and close button, without testing the connection.", async ({
    connectionsPage,
    webActions,
    concPagePO,
    commonPagePO,
    assert,
    connectionTD
  }) => {
    await webActions.click(concPagePO.CREATE_CONNECTION);
    await connectionsPage.selectApplication(connectionTD.C57811.APP_NAME);
    await webActions.fill(concPagePO.NAME, connectionTD.C57811.NAME);
    await webActions.fill(
      concPagePO.MAGENTO2_BASE_URI,
      connectionTD.C57811.MAGENTO2_BASE_URI
    );
    await webActions.fill(
      concPagePO.MAGENTO2_USERNAME,
      connectionTD.C57811.MAGENTO2_USERNAME
    );
    await webActions.fill(
      concPagePO.MAGENTO2_PASSWORD,
      connectionTD.C57811.MAGENTO2_PASSWORD
    );
    await webActions.click(concPagePO.MAGENTO2_GENERATE_TOKEN);
    await webActions.page.waitForTimeout(5000);
    await webActions.click(commonPagePO.SAVE_AND_CLOSE);
    await webActions.page.waitForTimeout(5000);
    await assert.checkSnapshot(
      concPagePO.FIRST_ROW_IN_CONNECTIONS_PAGE,
      "C57811.png"
    );
    await webActions.click(concPagePO.ACTIONS_MENU_BUTTON);
    await webActions.click(concPagePO.DELETE_CONNECTION);
    await webActions.click(commonPagePO.DELETE);
  });
});
