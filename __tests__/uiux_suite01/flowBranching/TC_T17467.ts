import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import file from "fs";
import T17467 from '@testData/flowbranching/TC_T17467.json';

test.describe('IO-T17467 Verify the export_data uri in downloaded error report and verify error link(""view export record"") below the error', () => {
  let id;
  test.afterEach(async ({ io, page }) => {
    await io.api.deleteFlowViaAPI(id);
  });
  test('@Priority-P2 @Zephyr-IO-T17467 @Env-All Verify the export_data uri in downloaded error report and verify error link(""view export record"") below the error', async ({
    io,
    page
  }) => {
    id = await io.flowbranching.createFlowBranchFromAPI(T17467);
    await io.flowBuilder.navigateTo(
      process.env.IO_Integration_URL + "flowBuilder/" + id
    );
    await io.homePage.addStep("Running the flow");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({ state: 'visible', timeout: 600000 });

    await io.connectionPage.addStep("Verifying that the flow ran with errors");
    await io.assert.verifyElementContainsText('tbody tr:nth-child(1) td:nth-child(5)', "Success");
    await io.assert.verifyElementContainsText('tbody tr:nth-child(2) td:nth-child(5)', "1 error");

    await io.flowBuilder.addStep("Downloading the errors");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ERROR_BUBBLE);
    const completedStatusImport = await page.locator(selectors.flowBuilderPagePO.ERROR_BUBBLE).nth(1).textContent();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ERROR_BUBBLE, 1);

    if (completedStatusImport === 'Success') {
      await page.waitForTimeout(15000);
      await io.flowBuilder.click(selectors.integrationPagePO.OPENERRORS);
      const refreshErrorsButton = page.getByRole("button", { name: "Refresh errors" });
      // await page.waitForFunction(button => !button.isDisabled, refreshErrorsButton);
      await refreshErrorsButton.click();
      await io.flowBuilder.loadingTime();
    }
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.NEW_VIEW_ACTIONS_MENU);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.EM2DOT0PO.DOWNLOAD_ERRORS, "Download errors not displayed");

    // Start waiting for download before clicking
    const downloadPromise = page.waitForEvent("download");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.DOWNLOAD_ERRORS);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.DOWNLOAD_ERRORS);
    const download = await downloadPromise;
    // Wait for the download process to complete and save the downloaded file somewhere.
    await download.saveAs("../flowBranching/" + download.suggestedFilename());

    // Read and process the contents of the downloaded file
    const fileContent = file.readFileSync("../flowBranching/" + download.suggestedFilename(), 'utf-8');

    // Find the link within the file content (adjust the regex as needed)
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    const foundLinks = fileContent.match(linkRegex);

    // Check if the expected link is found
    const partialLink = 'https://tstdrv1143616.app.netsuite.com/app/common/entity/custjob.nl?id=8639617&compid=TSTDRV1143616';
    const linkFound = foundLinks.some(link => link.includes(partialLink));

    console.log('Found links:', foundLinks);
    expect(linkFound).toBeTruthy();

    // Clean up - optionally delete the downloaded file
    file.unlinkSync("../flowBranching/" + download.suggestedFilename());
    await download.delete();
  });
});
