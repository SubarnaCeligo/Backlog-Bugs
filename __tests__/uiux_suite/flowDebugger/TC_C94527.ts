import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C94527 from '@testData/FlowDebugger/C94527.json';

test.describe("C94517_C94527_C94525_C94521_C94529_C94533_C94528_C94531_C94526_C94519_C94532", () => {
    test("C94517_C94527_C94525_C94521_C94529_C94533_C94528_C94531_C94526_C94519_C94532", async ({ io, page }) => {
        await io.createResourceFromAPI(C94527, "FLOWS");
        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CREATE_CONNECTION);

        //TC_C94525 Flow hotspot should be located on Build file internal id field if we added a Build file internal id field
        //TC_C94527 Verify Test Run Result tab added in Build file internal id field
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.NS_FILE_INTERNALID, 'Flow hotspot is not displayed');
        await io.homePage.addStep('Verified Flow hotspot should be located on Build file internal id field if we added a Build file internal id field');
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.NS_FILE_INTERNALID);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.NS_FILE_INTERNALID);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.TEST_RUN_RESULT_TAB, 'Test run result tab is not displayed');
        await io.homePage.addStep('Verified Test run result tab is displayed');

        //TC_C94517 Verify in Build file internal id field 'T' symbol showing with Test run results ta
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.TEST_RUN_RESULT_TAB_T, 'Test run result "T" symbol is not displayed');
        await io.homePage.addStep('Verified Test run result "T" symbol is displayed');

        //TC_C94521 Verify Help Text for Test run results tab on Build file internal id field window
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_HELP_TEXT_BUTTON);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TEST_RUN_HELP_TEXT);
        const helpText = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.TEST_RUN_HELP_TEXT)).toString();
        const jsonStringfyq = JSON.stringify(helpText);
        await io.assert.expectToContainValue("Click a test run record to review success or error output information", jsonStringfyq, "Help text not found");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_HELP_TEXT_BUTTON);

        //TC_C94529 The user should be able to toggle between Test run results and Handle bar templates and the page should reflect accordingly.
        await io.flowBuilder.click(selectors.flowBuilderPagePO.HANDLEBARS_TEMPLATE);
        const content = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.HANDLEBAR_CONTENT)).toString();
        const jsonStringfy = JSON.stringify(content);
        await io.assert.expectToContainValue("{{data.id}}", jsonStringfy, "Content are incorrect");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_RESULT_TAB);

        //TC_C94533 Test run result should show if we have AFE1.0. is selected
        //TC_C94528 User should ba able to toggle between AFE1.0 and AFE2.0
        //TC_C94532 Verify Empty state message when AFE2.0 is selected but 2.0 template has no content and there are no result to show
        await io.flowBuilder.click(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
        await io.homePage.addStep('Clicking on AFE 2.0');
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EMPTY_STATE_MESSAGE);
        const msg = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.EMPTY_STATE_MESSAGE)).toString();
        const masg = JSON.stringify(msg);
        await io.assert.expectToContainValue("\"No results to show since AFE 2.0 was not used in the last test run. Switch to AFE 1.0 to see test run results.\"", masg, "Empty state msg not found");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
        await io.homePage.addStep('Clicking on AFE 1.0');
        await io.homePage.addStep('Verified Test run result should show if we have AFE1.0. is selected');

        //TC_C94526 Auto-preview/Preview control should not show in the result for the Build file internal id field.
        const autoPreviewVisible = await io.homePage.isVisible(selectors.flowBuilderPagePO.AUTO_PREVIEW);
        await io.assert.expectToBeValue('false', autoPreviewVisible.toString(), 'Auto preview tab is not visible');
        await io.homePage.addStep('Verified Auto-preview control should not show in the result for the Build file internal id field');
        const previewVisible = await io.homePage.isVisible(selectors.flowBuilderPagePO.PREVIEW);
        await io.assert.expectToBeValue('false', previewVisible.toString(), 'Preview tab is not visible');
        await io.homePage.addStep('Verifeid Preview control should not show in the result for the Build file internal id field');

        //TC_C94519 Status is either True or False (processes successfully, and either passed or failed the filter) or Error (not processed successfully).
        const statusValues = ["Success", "Error"];
        let statusCol = await page.$$(
            selectors.flowBuilderPagePO.TEST_RUN_STATUS
        );
        for (let i = 0; i < statusCol.length; i++) {
            await statusCol[i].click();
            await io.flowBuilder.delay(3000);
            let cell = await (await statusCol[i]).textContent();
            let cellValue = await statusValues.includes(cell);
            await expect(cellValue).toBeTruthy();
        }
        await io.homePage.addStep('Verifeid Status is either Success or Error (processes successfully, and either passed or failed the filter) or Error (not processed successfully');

        //TC_C94534 Verify test run result showing when we have AFE2.0 toggle selected
        await io.flowBuilder.click(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.HANDLEBARS_TEMPLATE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.HANDLEBARS_TEMPLATE);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.HANDLEBAR);
        await io.flowBuilder.doubleClick(selectors.flowBuilderPagePO.HANDLEBAR);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.HANDLEBAR);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.HANDLEBAR, "{{record.id}}");
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.NS_FILE_INTERNALID, 'Flow hotspot is not displayed');
        await io.homePage.addStep('Verified test run result showing when we have AFE2.0 toggle selected');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.NS_FILE_INTERNALID);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.TEST_RUN_RESULT_TAB, 'Test run result tab is not displayed');
        await io.homePage.addStep('Verified Test run result tab is displayed');


        //TC_C94531 Verify Empty state message when AFE1.0 is selected but 1.0 template has no content and there are no result to show
        await io.flowBuilder.click(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
        await io.homePage.addStep('Clicking on AFE 1.0');
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EMPTY_STATE_MESSAGE);
        const msg1 = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.EMPTY_STATE_MESSAGE)).toString();
        const masg1 = JSON.stringify(msg1);
        await io.assert.expectToContainValue("\"No results to show since AFE 1.0 was not used in the last test run. Switch to AFE 2.0 to see test run results.\"", masg1, "Empty state msg not found");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
        await io.homePage.addStep('Clicking on AFE 2.0');
        await io.homePage.addStep('Verified Empty state message when AFE1.0 is selected but 1.0 template has no content and there are no result to show');
    });
});