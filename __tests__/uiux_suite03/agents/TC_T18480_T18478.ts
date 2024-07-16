import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Agent testcases", () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "agents");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.integrationPagePO.ADDNEWRESOURCE);
  });

  test("@Zephyr-IO-T18480 @Zephyr-IO-T18478 @Env-All @Epic-IO-86262 @Priority-P2 - Verify the color dots for offline/online agent is shown. And verify whether we have Windows option in the download dropdown", async ({
    io,
    page
  }) => {
    await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'agent-T18480');
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH, 'agent-T18480');
    await io.flowBuilder.loadingTime();

    await io.myAccountPage.clickByIndex(selectors.homePagePO.DOWNLOAD_AGENT_INSTALLER, 0);
    await io.assert.verifyElementDisplayedByText("Windows", "Windows option is not available");

    await io.assert.verifyElementDisplayedByText("Offline", "Offline option is not available");

    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.COLUMN_WITH_OFFLINE_TEXT_AND_SVG,
      "Offline column in not visible"
    );

    await io.myAccountPage.clickByIndex(selectors.myAccountPagePO.OPEN_ACTIONSMENU, 0);
    await io.myAccountPage.clickByIndex(selectors.integrationPagePO.DELETE_FLOW, 0);
    await io.myAccountPage.clickByIndex(selectors.basePagePO.DELETE_BUTTON, 0);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("Deleting the agent");
  });
});
