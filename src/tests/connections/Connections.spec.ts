import { test, expect } from "@lib/BaseTest";
import * as selectors from "@selectors/Selectors";

test.describe("Connections Page Test Cases", () => {
  test.beforeEach(async ({ io }) => {
   // await io.connectionPage.navigateTo(io.LINKS.CONNECTIONS_PAGE_URL);
  });

  test("C57810 Verify whether the page is showing the proper readable error , when the connection goes to offline", async ({
    connectionTD,
    io
  }) => {
    await io.connectionPage.click(selectors.ConnectionsPagePO.CREATE_CONNECTION);
    await io.connectionPage.selectApplication(connectionTD.C57810.APP_NAME);
    await io.connectionPage.fill(
      selectors.ConnectionsPagePO.NAME,
      connectionTD.C57810.NAME
    );
    await io.connectionPage.fill(
      selectors.ConnectionsPagePO.MAGENTO2_BASE_URI,
      connectionTD.C57810.MAGENTO2_BASE_URI
    );
    await io.connectionPage.fill(
      selectors.ConnectionsPagePO.MAGENTO2_USERNAME,
      connectionTD.C57810.MAGENTO2_USERNAME
    );
    await io.connectionPage.fill(
      selectors.ConnectionsPagePO.MAGENTO2_PASSWORD,
      connectionTD.C57810.MAGENTO2_PASSWORD
    );

    await io.connectionPage.click(selectors.ConnectionsPagePO.TEST_CONNECTION);
    await io.connectionPage.click(selectors.ConnectionsPagePO.MAGENTO2_GENERATE_TOKEN);
    await io.connectionPage.fill(
      selectors.ConnectionsPagePO.MAGENTO2_BASE_URI,
      connectionTD.C57810.Magento_URI
    );
    await io.connectionPage.click(selectors.ConnectionsPagePO.TEST_CONNECTION);
    //await this.page.waitForLoadState();
    var actual = await io.connectionPage.getText(
      selectors.MyAccountPagePO.SNACK_BAR_MESSAGE
    );
    await expect(actual).toBe(
      "Your test was not successful. Check your information and try again"
    );
  });

  // test("C57811 Verify connection is saving upon clicking the save and close button, without testing the connection.", async ({
  //   connectionsPage,
  //   connectionPage,
  //   assert,
  //   io,
  //   connectionTD
  // }) => {
  //   await io.webActions.click(selectors.ConnectionsPagePO.CREATE_CONNECTION);
  //   await connectionsPage.selectApplication(connectionTD.C57811.APP_NAME);
  //   await io.webActions.fill(
  //     selectors.ConnectionsPagePO.NAME,
  //     connectionTD.C57811.NAME
  //   );
  //   await io.webActions.fill(
  //     selectors.ConnectionsPagePO.MAGENTO2_BASE_URI,
  //     connectionTD.C57811.MAGENTO2_BASE_URI
  //   );
  //   await io.webActions.fill(
  //     selectors.ConnectionsPagePO.MAGENTO2_USERNAME,
  //     connectionTD.C57811.MAGENTO2_USERNAME
  //   );
  //   await io.webActions.fill(
  //     selectors.ConnectionsPagePO.MAGENTO2_PASSWORD,
  //     connectionTD.C57811.MAGENTO2_PASSWORD
  //   );
  //   await io.webActions.click(
  //     selectors.ConnectionsPagePO.MAGENTO2_GENERATE_TOKEN
  //   );
  //   await io.webActions.click(selectors.connectionPagePO.SAVE_AND_CLOSE);
  //   await assert.verifyElementContainsText(
  //     selectors.ConnectionsPagePO.FIRST_ROW_IN_CONNECTIONS_PAGE,
  //     "Test C57811"
  //   );
  // });
});
