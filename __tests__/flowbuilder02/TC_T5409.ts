import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T5409 Verify user can able to naviagte between AFE 1.0 and 2.0 toggle successfully", () => {
  test("@Env-All @Zephyr-IO-T5409 @Priority-P2 T5409 Verify user can able to naviagte between AFE 1.0 and 2.0 toggle successfully", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

    await io.flowBuilder.addStep('*** Creating a FTP Import from flowbuilder opening a handlebar editor ***')
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
    await io.flowBuilder.clickByText('FTP');
    await io.flowBuilder.clickByText('Transfer files into destination application');
    await io.flowBuilder.clickByText('Create flow step');

    await io.exportsPage.fill(selectors.basePagePO.CONNECTION_DROPDOWN, "FTP CONNECTION");
    await io.importsPage.clickByText('FTP CONNECTION');

    await io.flowBuilder.click(selectors.flowBuilderPagePO.DIRECTORYHANLEBAR);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep('*** Checking if we are in AFE 2.0 ***')
    let AFE2 = page.locator(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    let AFE1 = page.locator(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);

    expect(AFE2).toHaveAttribute('aria-pressed', 'true');
    expect(AFE1).toHaveAttribute('aria-pressed', 'false');

    await io.flowBuilder.addStep('*** Switching to AFE 1.0 and verifying the toggle ***')
    await io.flowBuilder.click(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.flowBuilder.loadingTime();
    AFE2 = page.locator(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    AFE1 = page.locator(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    expect(AFE2).toHaveAttribute('aria-pressed', 'false');
    expect(AFE1).toHaveAttribute('aria-pressed', 'true');
    let sampleData =  (await io.exportsPage.getText(selectors.exportsPagePO.SAMPLE_DATA_CONTENTS)).toString();
    await expect(sampleData).toContain("data");

    await io.flowBuilder.addStep('*** Switching to AFE 2.0 and verifying the toggle ***')
    await io.flowBuilder.click(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.flowBuilder.loadingTime();
    AFE2 = page.locator(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    AFE1 = page.locator(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    expect(AFE2).toHaveAttribute('aria-pressed', 'true');
    expect(AFE1).toHaveAttribute('aria-pressed', 'false');
    sampleData =  (await io.exportsPage.getText(selectors.exportsPagePO.SAMPLE_DATA_CONTENTS)).toString();
    await expect(sampleData).toContain("batch_of_records");
    
  });
});