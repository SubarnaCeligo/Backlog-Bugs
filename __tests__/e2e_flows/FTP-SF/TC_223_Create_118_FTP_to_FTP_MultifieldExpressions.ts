import { test, expect } from "@celigo/ui-core-automation";
import * as FTPtoFTP from "@testData/Flows/create/ftp/Create_118_FTP_to_FTP_MultifieldExpressions.json"
import allure from "allure-playwright";

test.describe("E2E Flows", () => {

    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("TC_223_Create_118_FTP_to_FTP_MultifieldExpressions", async ({
        io
    }, testInfo) => {

        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            await io.pageGeneratorDemo(allure, FTPtoFTP);
        });
        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            await io.pageProcessorDemo(allure, FTPtoFTP);
        });
        //Save, Enable and run the Flow ***
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            //TODO : Save the flow with test title     
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP.qa__expectedDashboardCount)
        });
    });
});