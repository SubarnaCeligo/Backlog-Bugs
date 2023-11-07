import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as C57810 from "@testData/Connections/C57810.json";
import * as C57811 from "@testData/Connections/C57811.json";

test.describe("Connections Page Test Cases", () => {
  test.beforeEach(async ({ io }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
  });

  test("C57810 Verify whether the page is showing the proper readable error , when the connection goes to offline", async ({
    io
  }) => {
    await io.createResourceFromAPI(C57810, "CONNECTION");
    await io.connectionPage.click(
      selectors.connectionsPagePO.MAGENTO2_GENERATE_TOKEN
    );
    await io.connectionPage.fill(
      selectors.connectionsPagePO.MAGENTO2_BASE_URI,
      C57810.Magento_URI
    );
    await io.connectionPage.click(selectors.connectionsPagePO.TEST_CONNECTION);
    var actual = await io.connectionPage.getText(
      selectors.myAccountPagePO.SNACK_BAR_MESSAGE
    );
    await expect(actual).toBe(
      "Your test was not successful. Check your information and try again"
    );
  });

  test("C57811 Verify connection is saving upon clicking the save and close button, without testing the connection.", async ({
    io
  }) => {
    await io.createResourceFromAPI(C57811, "CONNECTION");
    await io.connectionPage.click(
      selectors.connectionsPagePO.MAGENTO2_GENERATE_TOKEN
    );
    await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.assert.verifyElementContainsText(
      selectors.connectionsPagePO.FIRST_ROW_IN_CONNECTIONS_PAGE,
      "Test C57811"
    );
  });
});
