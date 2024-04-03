import { test, expect } from "@celigo/ui-core-automation";
import * as SFtoFTP from "@testData/Flows/create/salesforce/43_FTP_Flow_12_SF_to_FTP_CSV.json"


import allure from "allure-playwright";
test.describe("E2E Flows", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-all TC_024_Salesforce_Account_To_FTP_CSV_All", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            await io.pageGenerator(allure, SFtoFTP);
        });

        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            await io.pageProcessor(allure, SFtoFTP);
        });

        //Save, Enable and Run the Flow
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, SFtoFTP.qa__expectedDashboardCount)
        });
    });
});