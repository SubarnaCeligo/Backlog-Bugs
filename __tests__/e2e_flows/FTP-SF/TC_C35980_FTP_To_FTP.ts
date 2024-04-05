import { test, expect } from "@celigo/ui-core-automation"
import * as FTPtoFTP from "@testData/Flows/create/ftp/TC_C35980_FTP_Export_FTP_Import.json";
import allure from "allure-playwright";

test.describe("E2E Flows", () => {

    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("@Env-All TC_C35980_FTP_To_FTP", async ({
        io
    }, testInfo) => {

        //Creating PageGenerator 
        await test.step("*** Creating PageGenerator ***", async () => {
            await io.pageGenerator(allure, FTPtoFTP);
        });
        //Creating PageProcessor
        await test.step("*** Creating PageProcessor ***", async () => {
            await io.pageProcessor(allure, FTPtoFTP);
        });
        //Enable and run the Flow ***
        await test.step("*** Enable and run the Flow *** ", async () => {
            //TODO : Save the flow with test title     
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP.qa__expectedDashboardCount)
        });
    });
});