import { test, expect } from "@celigo/ui-core-automation";
import * as FTPtoFTP from "@testData/Flows/create/ftp/TC_C30813_C14524_FTP_Sorting_mapping.json"
import allure from "allure-playwright";

test.describe("E2E Flows", () => {

    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("@Env-All TC_C30813_C14524_FTP_Sorting_mapping", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            await io.pageGenerator(allure, FTPtoFTP);
        });

        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            await io.pageProcessor(allure, FTPtoFTP);
        });

        //Save, Enable and Run the Flow
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP.qa__expectedDashboardCount)
        });
    });
});