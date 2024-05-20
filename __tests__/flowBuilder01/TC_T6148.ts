import { test, expect } from "@celigo/ui-core-automation";
import IO_T6148 from '@testData/FlowBuilder/T6148.json';
import * as selectors from "@celigo/aut-selectors";

test.describe("IO_T6148 Verfiy List of logs can be paginated to see the next 50 requests.", () => {
    let flowMap;
    test("@Env-QA @Zephyr-IO_T6148 C34464 Verfiy List of logs can be paginated to see the next 50 requests.", async ({
        io, page
    }, testInfo) => {
        flowMap = await io.api.createImpOrExpAndFlowsThruAPI(IO_T6148, false);
        await io.flowBuilder.navigateTo(process.env.IO_Integration_URL + "flowBuilder/" + flowMap.get('NS - fetch listner log Test')['flowId']);

        await io.flowBuilder.saveandRunFlow('IO_T6148');
        await io.api.validateJobCountFromAPI("Magento2 Token Proxy_DND", {
            ignoreCount: "0",
            successCount: "0",
            errorCount: "100"
          });
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ERROR_BUBBLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.HTTP_REQUEST);
        const totalPages = await io.flowBuilder.getText(selectors.importPagePO.PAGE_DATA);
        expect(totalPages).toContain("1 - 50 of 100");
    });
});