import { test, expect } from "@celigo/ui-core-automation";
import allure from "allure-playwright";
import NS from "@testData/Flows/create/netsuite/TC_317_InputFilter_With_Rows_Data_With_NS_Export.json"

test.describe("E2E Flows", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_317_InputFilter_With_Rows_Data_With_NS_Export", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            await io.pageGeneratorDemo(allure, NS);
        });

        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            await io.pageProcessorDemo(allure, NS);
        });

        //Save, Enable and Run the Flow
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, NS.qa__expectedDashboardCount)
        });
    });
});