import { test, expect } from "@lib/BaseTest";
import { connectionsData } from "../testData/CONNECTIONS";

test.describe("Connections Page Test Cases", () => {
  test("C57810 Verify whether the page is showing the proper readable error , when the connection goes to offline", async ({
    connectionsPage,
    homePage,
    webActions,
    homePagePO,
    concPagePO,
    myAccountPO
  }) => {
    await homePage.navigateToHome();
    await webActions.navigateTo(connectionsPage.CONNECTIONS_PAGE_URL);
    await webActions.click(concPagePO.CREATE_CONNECTION);
    await connectionsPage.selectApplication("Magento 2");
    await webActions.fill(concPagePO.NAME, "Test C57810");
    await webActions.fill(
      concPagePO.MAGENTO2_BASE_URI,
      connectionsData.TC_C57810.MAGENTO2_BASE_URI
    );
    await webActions.fill(
      concPagePO.MAGENTO2_USERNAME,
      connectionsData.TC_C57810.MAGENTO2_USERNAME
    );
    await webActions.fill(
      concPagePO.MAGENTO2_PASSWORD,
      connectionsData.TC_C57810.MAGENTO2_PASSWORD
    );
    await webActions.click(concPagePO.MAGENTO2_GENERATE_TOKEN);
    await webActions.page.waitForTimeout(5000);
    await webActions.fill(
      concPagePO.MAGENTO2_BASE_URI,
      "http://3.8.80.44/enterprise242/pub/rest"
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
    homePage,
    webActions,
    homePagePO,
    concPagePO,
    commonPagePO,
    assert
  }) => {
    await homePage.navigateToHome();
    await webActions.navigateTo(connectionsPage.CONNECTIONS_PAGE_URL);
    await webActions.click(concPagePO.CREATE_CONNECTION);
    await connectionsPage.selectApplication("Magento 2");
    await webActions.fill(concPagePO.NAME, "Test C57811");
    await webActions.fill(
      concPagePO.MAGENTO2_BASE_URI,
      connectionsData.TC_C57810.MAGENTO2_BASE_URI
    );
    await webActions.fill(
      concPagePO.MAGENTO2_USERNAME,
      connectionsData.TC_C57810.MAGENTO2_USERNAME
    );
    await webActions.fill(
      concPagePO.MAGENTO2_PASSWORD,
      connectionsData.TC_C57810.MAGENTO2_PASSWORD
    );
    await webActions.click(concPagePO.MAGENTO2_GENERATE_TOKEN);
    await webActions.page.waitForTimeout(5000);
    await webActions.click(commonPagePO.SAVE_AND_CLOSE);
    await webActions.page.waitForTimeout(5000);
    await assert.checkSnapshot(concPagePO.FIRST_ROW_IN_CONNECTIONS_PAGE, "C57811.png");
    var actions = await webActions.page.$(concPagePO.ACTIONS_MENU_BUTTON);
    await actions.click();
    await webActions.click(concPagePO.DELETE_CONNECTION);
    await webActions.click(commonPagePO.DELETE);
  });
});
