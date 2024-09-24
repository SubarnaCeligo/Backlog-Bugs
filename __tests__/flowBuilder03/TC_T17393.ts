import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T17393 from "../../testData/inputData/Flows/T17393.json";


test.describe('T17393 Verify scheduling set for parent integration flow is present in cloned integration flow', () => {
    let id;
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowViaAPI(id);
    });
    test('"@Zephyr-IO-T17393 @Env-All @Priority-P2 Verify scheduling set for parent integration flow is present in cloned integration flow', async ({ io, page }) => {
        id = await io.createResourceFromAPI(T17393, "FLOWS");
        await io.homePage.navigateTo(
            process.env["IO_Integration_URL"] + "flowBuilder/" + id
        );
        await io.flowBuilder.loadingTime();
        // disable flow 
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        //wait for flow to load
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
        await io.connectionPage.click(selectors.flowBuilderPagePO.SCHEDULE_FLOW);
        await io.homePage.clickByText("Use cron expression");
        await page.getByText("Every 5 minute").isVisible();
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await page.getByText("Every 5 minute").isHidden();
        await io.homePage.waitForElementAttached(
            selectors.integrationPagePO.OPENACTIONSMENU
        );
        await io.homePage.clickByIndex(
            selectors.integrationPagePO.OPENACTIONSMENU,
            0
        );

        await io.homePage.waitForElementAttached(
            selectors.flowBuilderPagePO.CLONEFLOW
        );
        await io.homePage.click(selectors.flowBuilderPagePO.CLONEFLOW);
        await io.homePage.loadingTime();
        //Input name
        await io.homePage.waitForElementAttached(selectors.basePagePO.ADD_NAME);
        await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'Clone Schedule Flow Test T17393');
        await io.flowBuilder.clickByText("Please select");
        await io.flowBuilder.clickByText("Automation Flows");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);

        await io.homePage.waitForElementAttached(selectors.templatePagePO.CONFIGURE);
        await io.homePage.click(selectors.templatePagePO.CONFIGURE);
        await io.homePage.waitForElementAttached(selectors.connectionsPagePO.EXISTING);
        await io.homePage.click(selectors.connectionsPagePO.EXISTING);
        await io.homePage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
        await io.homePage.loadingTime();
        let connMap = await io.api.loadConnections();
        var connId = connMap.get("FTP CONNECTION");

        await io.connectionPage.selectTextfromDropDown(page, connId);

        //Save
        await io.homePage.loadingTime();
        await io.homePage.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.loadingTime();
        await io.integrationPage.clickByText('Clone Schedule Flow Test T17393');
        await io.homePage.loadingTime();
        //wait for flow to load
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
        await io.connectionPage.click(selectors.flowBuilderPagePO.SCHEDULE_FLOW);
        await page.getByText("Every 5 minute").isVisible();
        await io.connectionPage.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETE_FLOW);
        await io.flowBuilder.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);
        await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
        await io.homePage.loadingTime();
        await io.homePage.navigateTo(
            process.env["IO_Integration_URL"] + "flowBuilder/" + id
        );
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETE_FLOW);
        await io.flowBuilder.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);
        await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    });
});
