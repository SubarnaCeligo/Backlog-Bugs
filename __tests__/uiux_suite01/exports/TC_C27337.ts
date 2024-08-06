import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C27337 Verify PG "Override trace key template" help text UI_Backlog', () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test('@Env-All @Zephyr-IO-T1889 C27337 Verify PG "Override trace key template" help text UI_Backlog', async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW)
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'ftp');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FTP);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'FTP CONNECTION');
    await io.exportsPage.clickByTextByIndex('FTP CONNECTION', 0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.assert.verifyElementIsDisplayed(selectors.importPagePO.ADVANCED, 'Advance section not present');
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    await io.flowBuilder.click(selectors.exportsPagePO.OVERRIDE_KEY_TEMPLATE_HELP_BUBBLE);
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    const secretText = (await io.flowBuilder.getText(
      selectors.myAccountPagePO.HELP_BUBBLE
    )) as string;
    await io.assert.expectToContainValue(
      `Override trace key templateDefine a trace key that integrator.io will use to identify a unique record. Any value you provide overrides the default trace key for your app. You can specify a single field, such as {{record.field1}}, or use a handlebars expression.For example, {{join \"_\" record.field1 record.field2}} generates a trace key such as 123_456. Note:If you have applied a transformation to exported data, reference its fields in the trace key template without the path record. – for example, {{field1}}.Was this helpful?`,
      secretText,
      "secrettext name not found"
    );
  });
}); 
