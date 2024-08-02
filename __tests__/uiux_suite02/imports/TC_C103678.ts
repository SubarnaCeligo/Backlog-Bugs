import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C103678 Verify Help Text for HTTP request body UI_Backlog", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1920 C103678 Verify Help Text for HTTP request body UI_Backlog", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'http');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP);
    await io.myAccountPage.clickByText("Import records into destination application");
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.selectConnectionDropDown(page, 'HTTP AMAZON CONNECTION');
    await io.flowBuilder.click(selectors.importPagePO.HTTP_REQUEST_BODY_HELP_BUBBLE);
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    const secretText = (await io.flowBuilder.getText(
      selectors.myAccountPagePO.HELP_BUBBLE
    )) as string;
    await io.assert.expectToContainValue(
      `HTTP request bodyBy default, integrator.io will send your post mapped records, or if no mappings are defined, then integrator.io will send the raw JSON records returned by the source exports in your flow. If you want to modify the data further, then use this field to launch the AFE to build a custom handlebars template.Was this helpful?`,
      secretText,
      "secrettext name not found"
    );
  });
}); 
