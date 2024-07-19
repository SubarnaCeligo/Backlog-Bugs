import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T11538 from "@testData/FtpImport/T11538.json"

test.describe("TC_T11537 CSV generator helper: Verify the preview is working well", () => {
  test("@Env-All @Zephyr-IO-T11537 @Priority-P2 T11537 CSV generator helper: Verify the preview is working well", async ({ io, page }) => {
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

    await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');

    await io.flowBuilder.addStep('*** Changing the sample flow data and verifying the preview for valid data ***')
    await io.flowBuilder.fill(selectors.exportsPagePO.SAMPLE_DATA_TEXTAREA, JSON.stringify(T11538));
    await io.flowBuilder.loadingTime();

    let sampleData =  (await io.exportsPage.getText(selectors.basePagePO.RESULT_PREVIEW_CONTENT)).toString();
    await io.assert.expectToContainValue(sampleData, "title,author,genre,published_year,ratingA Good Girl's Guide to Murder,Holly Jackson,Mystery,2019,4.5One of Us Is Lying,Karen M. McManus,Mystery,2017,4.3Death on the Nile,Agatha Christie,Mystery,1937,4.6And Then There Were None,Agatha Christie,Mystery,1939,4.7Project Hail Mary,Andy Weir,Science Fiction,2021,4.8", 'Incorrect preview');

    await io.flowBuilder.addStep('*** Changing the sample flow data and verifying the preview for invalid data ***')
    await io.flowBuilder.fill(selectors.exportsPagePO.SAMPLE_DATA_TEXTAREA, '{{');
    await io.flowBuilder.loadingTime();

    sampleData =  (await io.exportsPage.getText(`${selectors.flowBuilderPagePO.OPENAI.ERROR_CODEPANEL} ${selectors.basePagePO.ACE_CONTENT}`)).toString();
    const expectedValues = [
        "Unexpected·non-whitespace·character·after·JSON·at·position·572·(line·1·column·573)¶",
        "Expected·property·name·or·'}'·in·JSON·at·position·1·(line·1·column·2)¶"
      ];
    const isExpectedValue = expectedValues.some(expectedValue => sampleData.includes(expectedValue));
    await expect(isExpectedValue, 'Incorrect error message').toBe(true);
  });

});