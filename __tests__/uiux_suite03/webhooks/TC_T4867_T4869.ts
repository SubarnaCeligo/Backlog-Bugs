import { links, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import webhook from '../../../testData/inputData/Webhook_Listeners/C25997.json';
import connectionPayload from '../../../testData/inputData/Webhook_Listeners/connectionPayload.json';

test.describe("@Author-Shriti S Verify pagination and delete option for webhook debug logs", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T4867 @Zephyr-IO-T4869 Verify pagination and delete option for webhook debug logs", async ({ io, page }) => {

        //Create a flow with webhook
        let flowID = await io.createResourceFromAPI(webhook, "FLOWS");

        await io.flowBuilder.loadingTime();
        //Open the listener and start debug logs for 15 mins
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LISTENER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
        await io.flowBuilder.getByRoleClick('button', 'Apply');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_LOG);
        await io.flowBuilder.loadingTime();

        //Form the webhook invoke URL
        let resp = await io.api.getCall("v1/flows/" + flowID);
        let exportID = resp.pageGenerators[0]._exportId;
        let baseURI = process.env["IO_API_URL"] + "v1/exports/" + exportID

        //Create a connection with webhook URL as baseURL
        connectionPayload.http.baseURI = baseURI;
        let response = await io.api.postCall("v1/connections", connectionPayload);
        let connectionID = response._id;

        //Form the ping URL
        let pingURL = process.env["IO_API_URL"] + "v1/connections/" + connectionID + "/ping"

        //Ping the connection 70 times to populate 50+ debug logs
        for (let i = 0 ; i< 70 ; i++){
            let resp = await io.api.postCall(pingURL, {});
        }
        await io.flowBuilder.loadingTime();
        
        //Open debug logs
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await io.flowBuilder.loadingTime();

        //Verify if debug logs are displayed
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.ROW_SELECTED, "Debug logs are not displayed.");

        await io.exportsPage.addStep("Verify actions menu on webhook debug logs shows delete icon");
        //Verify if delete button is visible
        await io.exportsPage.clickByIndex(selectors.flowBuilderPagePO.DEBUG_LOG_ACTIONS_MENU, 0);
        await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.DELETE_DEBUG_LOG);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.DELETE_DEBUG_LOG, "delete log button is not displayed");

        //Verify logs are paginated
        await io.assert.verifyElementToBeClickable(selectors.dashboardPagePO.NEXT_PAGE);

        await io.exportsPage.addStep("verify debug logs list displays the most recent 50 requests by default");
        //Vetify 50 entries are displayed in first page
        let numOfRowsString = (await io.homePage.getText(selectors.flowBuilderPagePO.JOBS_ROWS)).toString();
        let numOfRowsArray: string[] = numOfRowsString.split(',');
        let numOfRows = numOfRowsArray.length;
        await io.assert.expectToBeValue('50', numOfRows.toString(), '50 rows are not displayed');

        //Delete the flow and connection
        await io.api.deleteFlowViaAPI(flowID);
        await io.connections.deleteConnection(connectionPayload.name)


    });

}
)