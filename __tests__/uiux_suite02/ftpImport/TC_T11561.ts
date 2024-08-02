import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T11561 Verify the UI of the CSV generator", () => {
  test("@Env-All @Zephyr-IO-T11561 @Priority-P2 T11561 Verify the UI of the CSV generator", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

    await io.flowBuilder.addStep('*** Creating a FTP Import from flowbuilder and launching csv parser generator ***')
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
    await io.flowBuilder.clickByText('FTP');
    await io.flowBuilder.clickByText('Transfer files into destination application');
    await io.flowBuilder.clickByText('Create flow step');
    await io.homePage.click(selectors.exportsPagePO.FILE_TYPE);
    await io.flowBuilder.clickByText('CSV (or any delimited text file)');
    await io.flowBuilder.clickByText('Launch');
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep('*** Validating the headers of panes and drawer ***')
    await expect(page.getByText('CSV generator helper').nth(1), 'Header of the drawer is incorrect').toBeVisible();
    await expect(page.getByText('CSV generator options'), 'Header of the first pane is incorrect').toBeVisible();
    await expect(page.getByText('Sample flow data'), 'Header of the second pane is incorrect').toBeVisible();
    await expect(page.getByText('Generated CSV file'), 'Header of the third pane is incorrect').toBeVisible();

    await io.flowBuilder.addStep('*** Validating the preview and auto preview buttons ***')
    await expect(page.locator(selectors.flowBuilderPagePO.AUTO_PREVIEW), 'Auto preview is not visible').toBeVisible();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.AUTO_PREVIEW);
    await expect(page.locator(selectors.flowBuilderPagePO.PREVIEW), 'Preview is not visible').toBeVisible();

    await io.flowBuilder.clickByTextByIndex('Include header', 1, { exact: false });
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep('*** Validating the Save & Close, Save, and Close buttons ***')
    await expect(page.locator(selectors.basePagePO.SAVE_AND_CLOSE).nth(1), 'Save and close is not visible').toBeVisible();
    await expect(page.locator(selectors.basePagePO.SAVE).nth(1), 'Save is not visible').toBeVisible();
    await expect(page.locator(selectors.basePagePO.CLOSE).nth(1), 'Close is not visible').toBeVisible();
  });

});