import { test, expect } from "@celigo/ui-core-automation";
import IO_T6148 from '@testData/FlowBuilder/T6148.json';
import * as selectors from "@celigo/aut-selectors";

test.describe("IO_T6148 Verfiy List of logs can be paginated to see the next 50 requests.", () => {
    let flowMap;
    test("@Env-All @Zephyr-IO_T6148 @Priority-P2 C34464 Verfiy List of logs can be paginated to see the next 50 requests.", async ({
        io, page
    }, testInfo) => {
        flowMap = await io.api.createImpOrExpAndFlowsThruAPI(IO_T6148, false);
        await io.flowBuilder.navigateTo(process.env.IO_Integration_URL + "flowBuilder/" + flowMap.get('NS - fetch listner log Test')['flowId']);

        await io.flowBuilder.saveandRunFlow('IO_T6148');
        await io.homePage.click(selectors.basePagePO.RUNFLOW);
        await io.homePage.addStep("*** Running the flow ***");
        await io.homePage.loadingTime()
        await io.homePage.reloadPage()
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.RUNFLOW);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ERROR_BUBBLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.HTTP_REQUEST);
        const totalPages = await io.flowBuilder.getText(selectors.importPagePO.PAGE_DATA);
        expect(totalPages).toContain("1 - 50 of");
    });
});