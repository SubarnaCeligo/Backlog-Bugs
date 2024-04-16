import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C51572 To verify that the user should be able to create the Amazon/Salesforce oauth2.0 connection successfully.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
});
test.afterEach(async ({ io }) => {
  await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
});
  test("C51572 To verify that the user should be able to create the Amazon/Salesforce oauth2.0 connection successfully.", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Zendesk Support');
    await io.flowBuilder.clickByText('Zendesk Support');
    await io.flowBuilder.clickByText("Create from scratch")
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'ZENDESK CONNECTION');
    await io.flowBuilder.clickByTextByIndex('ZENDESK CONNECTION', 0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FORMVIEW)
    await io.flowBuilder.clickByText('REST API');
    await io.assert.verifyElementDisplayedByText(
        "REST API",
        "Change to REST API is not reflected"
      );
      await io.flowBuilder.click(selectors.flowBuilderPagePO.FORMVIEW)
      await io.flowBuilder.clickByText('Zendesk Support');
    await io.assert.verifyElementDisplayedByText(
        "Zendesk Support",
        "Change to Zendesk Support is not reflected"
      );
  });
}); 
