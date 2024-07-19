import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C104953 MY API is mistakenly referring to MY API basics page in Functions and Scripts Help Texts UI_Backlog", () => {
  test("C104953 MY API is mistakenly referring to MY API basics page in Functions and Scripts Help Texts UI_Backlog @Env-All @Zephyr-IO-T1921 @Priority-P2", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "TC47946_DND");
    await io.flowBuilder.clickByText('TC47946_DND');
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);

    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK);

    // Clicking on the function help text
    await io.flowBuilder.addStep("Validating My API link for function help text");
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.HELP_TEXT_ICON, 5);
    const hyperlink = await page.getByRole('link', { name: 'My API' }).getAttribute('href');
    await io.assert.expectToContainValue('https://docs.celigo.com/hc/en-us/articles/360047267771#Function', hyperlink, 'Invalid hyperlink')
    await io.flowBuilder.click(selectors.exportsPagePO.CLOSE_ICON_HELP_POPOVER_EXPORT);

    // Clicking on the script help text
    await io.flowBuilder.addStep("Validating My API link for script help text");
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.HELP_TEXT_ICON, 6);
    const hyperlink2 = await page.getByRole('link', { name: 'My API' }).getAttribute('href');
    await io.assert.expectToContainValue('https://docs.celigo.com/hc/en-us/articles/360047267771#Scripts', hyperlink2, 'Invalid hyperlink')
    await io.flowBuilder.click(selectors.exportsPagePO.CLOSE_ICON_HELP_POPOVER_EXPORT);
  });
});