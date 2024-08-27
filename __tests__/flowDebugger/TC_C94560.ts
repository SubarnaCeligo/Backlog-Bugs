import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C94560 from '@testData/FlowDebugger/C94560.json';

test.describe("C94968_C94970_C94960_C94972_C94976_C94971_C94975_C94969_C94962_C94977_C94974", () => {
    test("@Env-All @Zephyr-IO-T14140 @Zephyr-IO-T14137 @Zephyr-IO-T14144 @Zephyr-IO-T14147 @Zephyr-IO-T14143 @Zephyr-IO-T14146 @Zephyr-IO-T14141 @Zephyr-IO-T14138 @Zephyr-IO-T14148 @Zephyr-IO-T14145 C94968_C94970_C94960_C94972_C94976_C94971_C94975_C94969_C94962_C94977_C94974", async ({ io, page }) => {
        await io.createResourceFromAPI(C94560, "FLOWS");
        //Disable the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ON_OFF);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).first().click()
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);

        //TC_C94968 Verify flow Hotspots are located on Build id field if we added Build id field for flow
        //TC_C94970 Verify Test Run Result tab added in Build id field
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.SF_BUILD_ID, 'Flow hotspot is not displayed');
        await io.homePage.addStep('Verified Flow hotspot should be located on Build file internal id field if we added a Build file internal id field');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SF_BUILD_ID);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.TEST_RUN_RESULT_TAB, 'Test run result tab is not displayed');
        await io.homePage.addStep('Verified Test run result tab is displayed');

        //TC_C94960 Verify in Build id field 'T' symbol showing with Test run results tab
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.TEST_RUN_RESULT_TAB_T, 'Test run result "T" symbol is not displayed');
        await io.homePage.addStep('Verified Test run result "T" symbol is displayed');

        //TC_C94964 Verify Help Text for Test run results tab on Build id field window
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_HELP_TEXT_BUTTON);
        const helpText = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.TEST_RUN_HELP_TEXT)).toString();
        const jsonStringfyq = JSON.stringify(helpText);
        await io.assert.expectToContainValue("Click a test run record to review success or error output information", jsonStringfyq, "Help text not found");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_HELP_TEXT_BUTTON);

        //TC_C94972 Verify in Build id field User is able to toggle between Test run results and Handle bar templates
        await io.flowBuilder.click(selectors.flowBuilderPagePO.HANDLEBARS_TEMPLATE);
        const content = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.HANDLEBAR_CONTENT)).toString();
        const jsonStringfy = JSON.stringify(content);
        await io.assert.expectToContainValue("{{data.Id}}", jsonStringfy, "Content are incorrect");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_RESULT_TAB);

        //TC_C94976 Test run result should show if we have AFE1.0. is selected
        //TC_C94971 Verify in Build id field User is able to toggle between AFE1.0 and AFE2.0
        //TC_C94975 Verify Empty state message when AFE2.0 is selected but 2.0 template has no content and there are no result to show
        await io.flowBuilder.click(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
        await io.homePage.addStep('Clicking on AFE 2.0');
        const msg = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.EMPTY_STATE_MESSAGE)).toString();
        const masg = JSON.stringify(msg);
        await io.assert.expectToContainValue("\"No results to show since AFE 2.0 was not used in the last test run. Switch to AFE 1.0 to see test run results.\"", masg, "Empty state msg not found");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
        await io.homePage.addStep('Clicking on AFE 1.0');
        await io.homePage.addStep('Verified Test run result should show if we have AFE1.0. is selected');

        //TC_C94969 Verify Auto-preview/Preview control not showing in the result for the Build id field
        const autoPreviewVisible = await io.homePage.isVisible(selectors.flowBuilderPagePO.AUTO_PREVIEW);
        await io.assert.expectToBeValue('false', autoPreviewVisible.toString(), 'Auto preview tab is not visible');
        await io.homePage.addStep('Verified Auto-preview control should not show in the result for the Build file internal id field');
        const previewVisible = await io.homePage.isVisible(selectors.flowBuilderPagePO.PREVIEW);
        await io.assert.expectToBeValue('false', previewVisible.toString(), 'Preview tab is not visible');
        await io.homePage.addStep('Verifeid Preview control should not show in the result for the Build file internal id field');

        //TC_C94962 Status is either True or False (processes successfully, and either passed or failed the filter) or Error (not processed successfully).
        const  statusValues = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.TEST_RUN_STATUS)).toString();
        const jsonStringf1 = JSON.stringify(statusValues);
        await io.assert.expectToContainValue("Success", jsonStringf1, "Status are not showing");
        await io.homePage.addStep('Verifeid Status is either Success or Error (processes successfully, and either passed or failed the filter) or Error (not processed successfully');


        //TC_C94977 Verify test run result showing when we have AFE2.0 toggle selected
        await io.flowBuilder.click(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.HANDLEBARS_TEMPLATE);
        await io.flowBuilder.doubleClick(selectors.flowBuilderPagePO.HANDLEBAR);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.HANDLEBAR);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.HANDLEBAR, "{{record.id}}");
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.SF_BUILD_ID, 'Flow hotspot is not displayed');
        await io.homePage.addStep('Verified test run result showing when we have AFE2.0 toggle selected');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SF_BUILD_ID);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.TEST_RUN_RESULT_TAB, 'Test run result tab is not displayed');
        await io.homePage.addStep('Verified Test run result tab is displayed');


        //TC_C94974 Verify Empty state message when AFE1.0 is selected but 1.0 template has no content and there are no result to show
        await io.flowBuilder.click(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
        await io.homePage.addStep('Clicking on AFE 1.0');
        const msg1 = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.EMPTY_STATE_MESSAGE)).toString();
        const masg1 = JSON.stringify(msg1);
        await io.assert.expectToContainValue("\"No results to show since AFE 1.0 was not used in the last test run. Switch to AFE 2.0 to see test run results.\"", masg1, "Empty state msg not found");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
        await io.homePage.addStep('Clicking on AFE 2.0');
        await io.homePage.addStep('Verified Empty state message when AFE1.0 is selected but 1.0 template has no content and there are no result to show');

    });
});