import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_C41126 Test to verify that user with manage access is able to install an integration`, () => {
  test(`@Env-All C41126 Test to verify that user with manage access is able to install an integration`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(
      `${io.data.links.HOME_PAGE_URL}/installIntegration`
    );
    await io.flowBuilder.loadingTime();
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/inputData/SuiteApp/C41126.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.homePage.clickByText("Install integration");
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);
    await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
    await io.flowBuilder.clickByTextByIndex("Please select", 0);
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("S3 CONNECTION");
    await io.connectionPage.selectTextfromDropDown(page, connId);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);
    await io.flowBuilder.clickByTextByIndex("41126 Flow", 0);
    let flowResponse = await io.api.getCall("v1/flows");
    const responseKeys = Object.keys(flowResponse[1]);
    await io.assert.expectToBeValueInArray(responseKeys, "_sourceId", "Source Id is not present in flow response");
  });
});
