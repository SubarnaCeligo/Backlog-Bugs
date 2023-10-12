import { test, expect } from "@celigo/ui-core-automation"
import * as FTPtoSF from "@testData/Flows/create/ftp/103.SF_Flow_FTP_JSON_to_SF_Account_Multifields.json";
import allure from "allure-playwright";

test.describe("E2E Flows", () => {

    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("TC_251_FTP_JSON_To_Salesforce_Account_Multifield", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating PageGenerator ***", async () => {
            await io.pageGeneratorDemo(allure, FTPtoSF);
        });

        //Creating PageProcessor
        await test.step("*** Creating PageProcessor ***", async () => {
            await io.pageProcessorDemo(allure, FTPtoSF);
        });

        //Enable and run the Flow ***
        await test.step("*** Enable and run the Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, FTPtoSF.qa__expectedDashboardCount)
        });
    });
});