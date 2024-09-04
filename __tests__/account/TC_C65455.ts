import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C65455 Verify VAN connector connection form when created from export form", () => {
  test("@Zephyr-IO-T21531 @Env-All C65455 Verify VAN connector connection form when created from export form", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

    await io.flowBuilder.addStep("Checking and deleting the connection if already present"); 
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH,'van-test-C65455');
    await io.flowBuilder.loadingTime();
    const vanConnectionisPresent = await page.$("text=van-test-C65455");

    if (vanConnectionisPresent) {
      await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
      await io.flowBuilder.click(selectors.integrationPagePO.DELETE_FLOW);
      await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    }

    await io.flowBuilder.addStep("Creating a new connection");
    await io.flowBuilder.loadingTime();
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.connectionsPagePO.APP_NAME_INPUT, 'VAN');
    await page.keyboard.press('Enter');
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.fillByIndex(selectors.importPagePO.NAME, 'van-test-C65455', 1);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("Verifying the connection is created successfully")
    await io.assert.verifyJSElementValue(selectors.basePagePO.CONNECTION_DROPDOWN, 'van-test-C65455');
    await io.flowBuilder.addStep("Navigating to the connection page");
    await io.flowBuilder.click(selectors.basePagePO.CLOSE);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.loadingTime();
    // Cleaning up
    await io.flowBuilder.addStep("Deleting the connection");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SNACKBAR_CLOSE_BUTTON);
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH,'van-test-C65455');
    await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.flowBuilder.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    await io.flowBuilder.loadingTime();
  });
});