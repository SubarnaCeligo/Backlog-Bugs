import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C110416 from '../../testData/inputData/flowBuilder/C110416.json';

test.describe("C110416_110410_110424_110425)", () => {
    test("C110416_110410_110424_110425) @Env-All @Priority-P2 @Zephyr-IO-T18788 @Zephyr-IO-T26743 @Zephyr-IO-T18794 @Zephyr-IO-T18795", async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C110416, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_CC110416', id);
        const lastRun = page.getByText('Last run');
        await lastRun.waitFor({ state: 'visible', timeout: 180000 });
        await io.homePage.addStep('Clicking on cross icon to remove import');
        await io.homePage.click(selectors.flowBuilderPagePO.REMOVE_PAGE_PROCESSOR);
        await io.homePage.addStep('Verifying pop up to appear');
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.DIALOG_BOX, 'Pop up did not appear');
        await io.homePage.click(selectors.flowBuilderPagePO.REMOVE_CONFIRM);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);

        

        //TC_C110413 Verify info text showing for removed steps having success
        //Run console
        //1.Info text should show as expected.
        await io.homePage.click(selectors.flowBuilderPagePO.OPEN_PAGE_INFO);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.PAGE_INFO_TEXT);
        const dialogContents = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
        const jsonStringfy = JSON.stringify(dialogContents);
        await io.assert.expectToContainValue( "\"To view a removed step's errors drawer, restore it using the following actions:Create a new step that uses the same connector and connection as the removed step.Click Use existing.Select the removed step from the list and add it to your flow.\"", jsonStringfy, "Info message are in correct");
        await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

        //2. Removed step should show in gray colour
        let removedStep = page
            .locator(selectors.flowBuilderPagePO.RUN_CONSOLE_FLOW)
            .nth(1);
        await expect(removedStep).toHaveCSS("color", "rgb(103, 122, 137)");
        await io.homePage.addStep('Verified Removed step should show in gray colour');


        //Run History
        await io.homePage.click(selectors.flowBuilderPagePO.RUN_HISTORY);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.TOGGLE_JOB);
        await io.homePage.click(selectors.flowBuilderPagePO.TOGGLE_JOB);
        //1.Info text should show as expected.
        await io.homePage.click(selectors.flowBuilderPagePO.OPEN_PAGE_INFO);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.PAGE_INFO_TEXT);
        const dialogContents1 = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
        const jsonStringfy1 = JSON.stringify(dialogContents1);
        await io.assert.expectToContainValue( "\"To view a removed step's errors drawer, restore it using the following actions:Create a new step that uses the same connector and connection as the removed step.Click Use existing.Select the removed step from the list and add it to your flow.\"", jsonStringfy1, "Info message are in correct");
        await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

        //2. Removed step should show in gray colour
        let removedStep1 = page
            .locator(selectors.flowBuilderPagePO.FLOW_NAME_DASHBOARD)
            .nth(2);
        await expect(removedStep1).toHaveCSS("color", "rgb(103, 122, 137)");
        await io.homePage.addStep('Verified Removed step should show in gray colour');

        //TC_C110419 Verify info text showing for removed steps having success on Run hostory tab from integration dashboard
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.waitForElementAttached(selectors.homePagePO.CLONE_INTEGRATION);
        await io.homePage.reloadPage();
        await io.homePage.click(selectors.flowBuilderPagePO.DASHBOARD);
        await io.homePage.addStep('clicking on dashboard');
        await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.RUNS);

        await io.flowBuilder.clickButtonInTable(selectors.flowBuilderPagePO.JOB_NAME, selectors.flowBuilderPagePO.RUNS, "TC_C110416");
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.TOGGLE_JOB);
        await io.homePage.click(selectors.flowBuilderPagePO.TOGGLE_JOB);


        //1.Info text should show as expected.
        let pageInfo = page
            .locator(selectors.flowBuilderPagePO.OPEN_PAGE_INFO)
            .nth(2);
        await pageInfo.click();
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.PAGE_INFO_TEXT);
        const dialogContents2 = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
        const jsonStringfy2 = JSON.stringify(dialogContents2);
        await io.assert.expectToContainValue("\"To view a removed step's errors drawer, restore it using the following actions:Create a new step that uses the same connector and connection as the removed step.Click Use existing.Select the removed step from the list and add it to your flow.\"", jsonStringfy2, "Info message are in correct");

        await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

        //2. Removed step should show in gray colour
        let removedStep2 = page
            .locator(selectors.flowBuilderPagePO.FLOW_NAME_DASHBOARD)
            .nth(2);
        await expect(removedStep2).toHaveCSS("color", "rgb(103, 122, 137)");
        await io.homePage.addStep('Verified Removed step should show in gray colour');
        await io.homePage.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
        await io.homePage.waitForElementAttached(selectors.homePagePO.CLONE_INTEGRATION);

        // TC_C110421 Verify info text showing for removed steps having success on Run hostory tab from account dashboard
        await io.homePage.reloadPage();
        await io.homePage.click(selectors.basePagePO.DASHBOARD);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
        await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.RUNS);

        await io.flowBuilder.clickButtonInTable(selectors.flowBuilderPagePO.FLOW_NAME_ACCOUNT_DASHBOARD, selectors.flowBuilderPagePO.RUNS, "TC_C110416");
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.TOGGLE_JOB);
        await io.homePage.click(selectors.flowBuilderPagePO.TOGGLE_JOB);

        

        //1.Info text should show as expected.
        let pageInfo1 = page
            .locator(selectors.flowBuilderPagePO.OPEN_PAGE_INFO)
            .nth(1);
        await pageInfo1.click();
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.PAGE_INFO_TEXT);
        const dialogContents3 = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
        const jsonStringfy3 = JSON.stringify(dialogContents3);
        await io.assert.expectToContainValue("\"To view a removed step's errors drawer, restore it using the following actions:Create a new step that uses the same connector and connection as the removed step.Click Use existing.Select the removed step from the list and add it to your flow.\"", jsonStringfy3, "Info message are in correct");
        
        await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

        //2. Removed step should show in gray colour
        let removedStep3 = page
            .locator(selectors.flowBuilderPagePO.FLOW_NAME_DASHBOARD)
            .nth(2);
        await expect(removedStep3).toHaveCSS("color", "rgb(103, 122, 137)");
        await io.homePage.addStep('Verified Removed step should show in gray colour');
        await io.homePage.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    });
});