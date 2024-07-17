import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T1365 Verify whether mapper1.0/mapper2.0 toggle is removed for IA's @Epic-IO-68924 @Priority-P3 @Zephyr-IO-T1365 @author_Kaushik UI_Backlog @Env-IAQA", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  test("T1365 Verify whether mapper1.0/mapper2.0 toggle is removed for IA's @Epic-IO-68924 @Priority-P3 @Zephyr-IO-T1365 @author_Kaushik UI_Backlog @Env-All", async ({ io, page }) => {
    await io.homePage.clickByTextByIndex("Salesforce - NetSuite", 0);
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByText("Salesforce File to NetSuite File Add/Update");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER, 1);

    await io.importsPage.addStep("Check if Folder field is editable and fill it with 10");
    await io.flowBuilder.loadingTime();
    await io.importsPage.waitForElementAttached(selectors.importPagePO.NETSUITE_IMPORT_FOLDER_INPUT);
    await io.assert.checkElementState(selectors.importPagePO.NETSUITE_IMPORT_FOLDER_INPUT, "isEditable");
    await io.importsPage.fill(selectors.importPagePO.NETSUITE_IMPORT_FOLDER_INPUT, "20");
    await io.importsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("verify the value and reset it to 10")
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER, 1);
    expect(await page.locator(selectors.importPagePO.NETSUITE_IMPORT_FOLDER_INPUT).getAttribute('value')).toBe("20");
    await io.importsPage.fill(selectors.importPagePO.NETSUITE_IMPORT_FOLDER_INPUT, "10");
    await io.importsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
  });
}
);