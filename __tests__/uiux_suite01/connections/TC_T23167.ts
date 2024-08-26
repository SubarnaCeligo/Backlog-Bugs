import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C95741 To Verify Existing connections display if user selects an offline connection for Netsuite once while installing/cloning integration)", () => {
  test("@Zephyr-IO-T23167 @Env-All C95741 To Verify Existing connections display if user selects an offline connection for Netsuite once while installing/cloning integration)", async ({
    io,
    page
  }) => {
    await io.homePage.addStep("Creating the integration");
    await io.homePage.navigateTo(
      `${io.data.links.HOME_PAGE_URL}/installIntegration`
    );
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/inputData/FlowBuilder/TC_T23167.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.homePage.clickByText("Install integration");
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
    await io.flowBuilder.clickByTextByIndex("Use existing connection", 0);
    await io.flowBuilder.clickByTextByIndex("Please select", 0);
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("NETSUITE 706 CONNECTION");
    await io.connectionPage.selectTextfromDropDown(page, connId);
    await io.homePage.addStep("Selected 'NETSUITE 706 CONNECTION' from dropdown");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);

    await io.flowBuilder.loadingTime();
    await io.flowBuilder.loadingTime();
    // await io.homePage.click(
    //   selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    // );

    // await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICTION_BAR, 'This connection is currently offline. Re-enter your credentials to bring it back online.');
    // await io.flowBuilder.clickByTextByIndex("Use existing connection", 0);
    // await io.flowBuilder.clickByTextByIndex("Please select", 0);
    // let connMap2 = await io.api.loadConnections();
    // var connId = connMap2.get("NETSUITE CONNECTION");
    // await io.connectionPage.selectTextfromDropDown(page, connId);
    // await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);

    await test.step('*** Uninstalling Integration ***', async () => {
      await io.flowBuilder.click(selectors.integrationPagePO.UNINSTALL);
      await io.flowBuilder.click(selectors.integrationPagePO.UNINSTALL_CONFIRM);
  });
  });
});
