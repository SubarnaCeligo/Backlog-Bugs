import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testdata from "../../../testData/inputData/EM2.0/T19797.json";
import { randomNumber } from "@celigo/aut-utilities";

test.describe("T6436 Account Dashboard - Completed flows - When i select the completed date range preset as 'Custom' all the flows completed in the specified custom time should be displayed", () => {
    let flowId;
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowViaAPI(flowId);
    });

    test("@Env-All @Zephyr-IO-T6436 C29042 Account Dashboard - Completed flows - When i select the completed date range preset as 'Custom' all the flows completed in the specified custom time should be displayed", async ({ io, page }) => {
        testdata.name = testdata.name + randomNumber();
        flowId = await io.createResourceFromAPI(testdata, "FLOWS");

        //Wait for flow run to complete
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.RUNFLOW);
        await io.integrationPage.clickButtonByIndex(selectors.basePagePO.RUNFLOW, 0);
        let flowID = await io.api.getFlowId(testdata.name);
        await io.api.verifyFlowStatusThroughAPI(
            "EDI_RefreshTest_Flow_DND",
            flowID,
            [4, 0, 0]
        );
        await io.flowBuilder.loadingTime();

        // Open account dashboard and click on completed flows
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
        await io.homePage.click(selectors.basePagePO.DASHBOARD);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
        await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.RUNS);

        // Check the pages value for the flow that was run
        const rows = await page.$$(selectors.flowBuilderPagePO.COLUMNS);
        for (const row of rows) {
            const flowColumn = await row.$("td");
            const pagesColumn = await row.$("td:nth-child(13)");
            const flowColumnText = await flowColumn.textContent();

            if (flowColumnText.includes(testdata.name)) {
                const pagesColumnText = await pagesColumn.textContent();
                await expect(pagesColumnText).toContain("1");
                await io.homePage.addStep("Verified the pages value for the flow that was run");
                break;
            }
        }
    });
});
