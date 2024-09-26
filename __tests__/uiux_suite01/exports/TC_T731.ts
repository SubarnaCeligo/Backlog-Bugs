import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T731 Selecting an existing SF export which doesn't have package doesn't show up the link to install it. @author_Kaushik UI_Backlog ", () => {
  test("@Env-All @Zephyr-IO-T731 Selecting an existing SF export which doesn't have package doesn't show up the link to install it. @author_Kaushik UI_Backlog ", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.addStep("Creating salesforce real time export")
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Salesforce');
    await io.flowBuilder.click(selectors.importPagePO.SALESFORCE_IMPORT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.REALTIME_EXPORT_TYPE);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fillWebPage(selectors.basePagePO.ADD_NAME,"SALESFORCE");
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'SALESFORCE CONNECTION');
    await io.exportsPage.clickByTextByIndex('SALESFORCE CONNECTION', 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SF_SOBJECT_TYPE);
    await io.homePage.addStep("*** Clicked on selecting SOBJECT type ***");
    await io.homePage.clickByText("Account");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.exportsPage.loadingTime();

    const hyperlink = await page.getByRole('link', { name: 'integrator distributed adapter package' }).getAttribute('href');
    await io.assert.expectToContainValue('https://celigo-ab-dev-ed.develop.my.salesforce.com/packaging/installPackage.apexp?p0=04t3m000000Q89d', hyperlink, 'Invalid hyperlink')
  });
});