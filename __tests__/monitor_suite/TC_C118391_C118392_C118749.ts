import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/monitorSuite/C118391.json";
import testData from "@testData/monitorSuite/monitor_all_manage_few.json";

test.describe("@Epic-IO-38600  @Priority-P2 @Zephyr-T20092 @Zephyr-T20098 @Zephyr-T20091 @Env-All  Assign cases in monitor account", () => {
    let id;
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowViaAPI(id);
    });

    test("@Epic-IO-38600  @Priority-P2 @Zephyr-T20092 @Zephyr-T20098 @Zephyr-T20091 @Env-All  Assign cases in monitor account", async ({ io, page }) => {
        const res = await io.api.putCall(
            `v1/ashares/${process.env.IO_Ashare_ID}`,
            testData
        );
        var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
        id = flows.get(TC.name)["flowId"];
        await io.api.checkJobStatusFromAPI(
            TC.name,
            flows.get(TC.name)["flowId"],
            [20, 0, 20]
        );

        //Navigate to default integration
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

        // Search for a flow
        await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_C118391');

        //Wait for search to complete
        await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);

        //Open the flow
        await io.flowBuilder.clickByText('TC_C118391');

        //Open errors dashborad
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);

        //Assign one error to a user
        await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
        await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
        await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

        await io.flowBuilder.addStep("C118392 - Verify that new user invite section is disabled for manage/monitor users when invitation feature is disabled.");
        await io.assert.verifyElementAttributeContainsText(selectors.em2DotOLineGraphPO.NEW_USER_EMAIL, 'class', 'Mui-disabled');

        await io.flowBuilder.addStep("C118749 - Verify when users who don’t have access to the integration will appear grayed out in the user’s list in the “Assign errors” dropdown when invitation feature is disabled ");
        await io.flowBuilder.fill(selectors.filterErrorTag.ARIALABELSEARCHUSER, 'IOCustom User');
        await io.flowBuilder.waitForElementAttached('text="IOCustom User"');
        const isElementSelectable = await io.flowBuilder.selectBasedOnAttribute(selectors.em2DotOLineGraphPO.ASSIGNEE_NAME_LIST, 'class', 'Mui-disabled');
        await io.assert.expectToBeFalse(isElementSelectable, 'Users without access are selectable.');

        await io.flowBuilder.addStep("C118391 - Verify that manage/monitor user with invitation feature disabled is able to assign errors to an existing user who has access to the integration");
        await io.flowBuilder.fill(selectors.filterErrorTag.ARIALABELSEARCHUSER, 'Shruti S');
        await io.flowBuilder.waitForElementAttached('text="Shruti S"');
        await io.flowBuilder.clickByText('Shruti S');
        await io.homePage.clickByText("Assign");
        await io.flowBuilder.reloadPage();
        await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);

        //Verify if error is assigned
        const assigneePills = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL)).toString();
        await io.assert.expectToBeValue("Shruti S", assigneePills, 'Errors is not reassigned');

        //Clear all assignments
        await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 0);
        await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
        await io.flowBuilder.clickByText('Clear assignment');

    });
});