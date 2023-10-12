import { test, expect } from "@celigo/ui-core-automation";
import allure from "allure-playwright";
import FTP from "@testData/Flows/create/ftp/TC_493_FTP_To_FTP_Import_With_Skip_Aggregation_True.json"

test.describe("E2E Flows", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("TC_493_FTP_To_FTP_Import_With_Skip_Aggregation_True", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            await io.pageGeneratorDemo(allure, FTP);
        });

        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            await io.pageProcessorDemo(allure, FTP);
        });

        //Save, Enable and Run the Flow
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, FTP.qa__expectedDashboardCount)
        });
    });
});