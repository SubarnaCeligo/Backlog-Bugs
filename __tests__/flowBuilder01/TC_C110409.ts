import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C110409 from '../../testData/inputData/flowBuilder/C110409.json';

test.describe("C110409_110412_110418_110420)", () => {
    test("C110409_110412_110418_110420) @Env-All @Priority-P2", async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C110409, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_CC110411', id);
        const lastRun = page.getByText('Last run');
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await lastRun.waitFor({ state: 'visible', timeout: 180000 });
        await io.homePage.addStep('Clicking on cross icon to remove import');
        await io.homePage.click(selectors.flowBuilderPagePO.REMOVE_PAGE_PROCESSOR);
        await io.homePage.addStep('Verifying pop up to appear');
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.DIALOG_BOX, 'Pop up did not appear');
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.REMOVE_CONFIRM);
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);

        // let label = page
        //     .locator(selectors.flowBuilderPagePO.JOB_ERRORS)
        //     .nth(1);
        // await expect(label).toHaveCSS("cursor", "not-allowed");
        // await io.homePage.addStep('Verified User should not be able to click on error');

        //TC_C110412 Verify info text showing for removed steps having error
        //Run console
        //1.Info text should show as expected.
        await io.homePage.click(selectors.flowBuilderPagePO.OPEN_PAGE_INFO);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.PAGE_INFO_TEXT);
        const dialogContents = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
        const jsonStringfy = JSON.stringify(dialogContents);
        await io.assert.expectToContainValue("\"To view a removed step's errors drawer, restore it using the following actions:\\n\\n    Create a new step that uses the same connector and connection as the removed step.\\n    Click Use existing.\\n    Select the removed step from the list and add it to your flow.\\n\"", jsonStringfy, "Info message are in correct");
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
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        // let label1 = page
        //     .locator(selectors.flowBuilderPagePO.JOB_ERRORS_RUN_CONSOLE)
        //     .nth(1);
        // await expect(label1).toHaveCSS("cursor", "not-allowed");
        // await io.homePage.addStep('Verified User should not be able to click on error');

        //1.Info text should show as expected.
        await io.homePage.click(selectors.flowBuilderPagePO.OPEN_PAGE_INFO);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.PAGE_INFO_TEXT);
        const dialogContents1 = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
        const jsonStringfy1 = JSON.stringify(dialogContents1);
        await io.assert.expectToContainValue("\"To view a removed step's errors drawer, restore it using the following actions:\\n\\n    Create a new step that uses the same connector and connection as the removed step.\\n    Click Use existing.\\n    Select the removed step from the list and add it to your flow.\\n\"", jsonStringfy1, "Info message are in correct");
        await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

        //2. Removed step should show in gray colour
        let removedStep1 = page
            .locator(selectors.flowBuilderPagePO.FLOW_NAME_DASHBOARD)
            .nth(2);
        await expect(removedStep1).toHaveCSS("color", "rgb(103, 122, 137)");
        await io.homePage.addStep('Verified Removed step should show in gray colour');

        //TC_C110418 Verify info text showing for removed steps having error on Run hostory tab from integration dashboard
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.waitForElementAttached(selectors.homePagePO.CLONE_INTEGRATION);
        await io.homePage.reloadPage();
        await io.homePage.click(selectors.flowBuilderPagePO.DASHBOARD);
        await io.homePage.addStep('clicking on dashboard');
        await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.RUNS);

        await io.flowBuilder.clickButtonInTable(selectors.flowBuilderPagePO.JOB_NAME, selectors.flowBuilderPagePO.RUNS, "TC_C110409");
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.TOGGLE_JOB);
        await io.homePage.click(selectors.flowBuilderPagePO.TOGGLE_JOB);
        // let label2 = page
        //     .locator(selectors.flowBuilderPagePO.JOB_ERRORS_RUN_CONSOLE)
        //     .nth(1);;
        // await expect(label2).toHaveCSS("cursor", "not-allowed");
        // await io.homePage.addStep('Verified User should not be able to click on error');

        //1.Info text should show as expected.
        let pageInfo = page
            .locator(selectors.flowBuilderPagePO.OPEN_PAGE_INFO)
            .nth(2);
        await pageInfo.click();
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.PAGE_INFO_TEXT);
        const dialogContents2 = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
        const jsonStringfy2 = JSON.stringify(dialogContents2);
        await io.assert.expectToContainValue("\"To view a removed step's errors drawer, restore it using the following actions:\\n\\n    Create a new step that uses the same connector and connection as the removed step.\\n    Click Use existing.\\n    Select the removed step from the list and add it to your flow.\\n\"", jsonStringfy2, "Info message are in correct");
        await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

        //2. Removed step should show in gray colour
        let removedStep2 = page
            .locator(selectors.flowBuilderPagePO.FLOW_NAME_DASHBOARD)
            .nth(2);
        await expect(removedStep2).toHaveCSS("color", "rgb(103, 122, 137)");
        await io.homePage.addStep('Verified Removed step should show in gray colour');
        await io.homePage.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
        await io.homePage.waitForElementAttached(selectors.homePagePO.CLONE_INTEGRATION);

        // TC_C110420 Verify info text showing for removed steps having error on Run hostory tab from account dashboard
        await io.homePage.reloadPage();
        await io.homePage.click(selectors.basePagePO.DASHBOARD);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
        await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.RUNS);

        await io.flowBuilder.clickButtonInTable(selectors.flowBuilderPagePO.FLOW_NAME_ACCOUNT_DASHBOARD, selectors.flowBuilderPagePO.RUNS, "TC_C110409");
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.TOGGLE_JOB);
        await io.homePage.click(selectors.flowBuilderPagePO.TOGGLE_JOB);

        // let label3 = page
        //     .locator(selectors.flowBuilderPagePO.JOB_ERRORS_RUN_CONSOLE)
        //     .nth(1);
        // await expect(label3).toHaveCSS("cursor", "not-allowed");
        // await io.homePage.addStep('Verified User should not be able to click on error');

        //1.Info text should show as expected.
        let pageInfo1 = page
            .locator(selectors.flowBuilderPagePO.OPEN_PAGE_INFO)
            .nth(1);
        await pageInfo1.click();
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.PAGE_INFO_TEXT);
        const dialogContents3 = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
        const jsonStringfy3 = JSON.stringify(dialogContents3);
        await io.assert.expectToContainValue("\"To view a removed step's errors drawer, restore it using the following actions:\\n\\n    Create a new step that uses the same connector and connection as the removed step.\\n    Click Use existing.\\n    Select the removed step from the list and add it to your flow.\\n\"", jsonStringfy3, "Info message are in correct");
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