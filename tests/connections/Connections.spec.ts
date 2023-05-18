import { test, expect } from "@lib/BaseTest";
import * as selectors from "@selectors/Selectors";
import * as CD from "@testData/Connections";

test.describe("Connections Page Test Cases", () => {
  test.beforeEach(async ({ io }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
  });

  test("C57810 Verify whether the page is showing the proper readable error , when the connection goes to offline", async ({
    io
  }) => {
    await io.fillForm(CD.ConnectionsTestData.C57810, "CONNECTION");
    await io.connectionPage.click(
      selectors.ConnectionsPagePO.MAGENTO2_GENERATE_TOKEN
    );
    await io.connectionPage.fill(
      selectors.ConnectionsPagePO.MAGENTO2_BASE_URI,
      CD.ConnectionsTestData.C57810.Magento_URI
    );
    await io.connectionPage.click(selectors.ConnectionsPagePO.TEST_CONNECTION);
    var actual = await io.connectionPage.getText(
      selectors.MyAccountPagePO.SNACK_BAR_MESSAGE
    );
    await expect(actual).toBe(
      "Your test was not successful. Check your information and try again"
    );
  });

  test("C57811 Verify connection is saving upon clicking the save and close button, without testing the connection.", async ({
    io
  }) => {
    await io.fillForm(CD.ConnectionsTestData.C57811, "CONNECTION");
    await io.connectionPage.click(
      selectors.ConnectionsPagePO.MAGENTO2_GENERATE_TOKEN
    );
    await io.connectionPage.click(selectors.BasePagePO.SAVE_AND_CLOSE);
    await io.assert.verifyElementContainsText(
      selectors.ConnectionsPagePO.FIRST_ROW_IN_CONNECTIONS_PAGE,
      "Test C57811"
    );
  });
});
