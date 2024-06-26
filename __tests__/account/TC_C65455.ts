import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { MyAccountPage } from "@celigo/ui-core-automation/dist/src/pageFactory/pages/MyAccountPage";

test.describe("IO-T28437 Verify the warning message when the user 1 tries to makeowner account for user 2 when already user 3 is pending to accept owner account request", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.FLOW_BUILDER_PAGE_URL);
  });
  test("@Zephyr-IO-T28437 @Env-All IO-T28437 Verify the warning message when the user 1 tries to makeowner account for user 2 when already user 3 is pending to accept owner account request", async ({
    io,
    page
  }) => {
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.connectionsPagePO.APP_NAME_INPUT, 'VAN');
    await page.keyboard.press('Enter');
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.fillByIndex(selectors.importPagePO.NAME, 'van-test', 1);
    await io.flowBuilder.clickByText('Launch');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.type('test');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await io.flowBuilder.clickByText('CBR');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
  });
});
