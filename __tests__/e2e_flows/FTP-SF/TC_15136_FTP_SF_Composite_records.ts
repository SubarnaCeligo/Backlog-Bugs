import { test, expect } from "@celigo/ui-core-automation"
import * as FTPtoSF from "@testData/Flows/create/ftp/TC15136_FTP_SF_Composite_records.json";
import allure from "allure-playwright";

test.describe("E2E Flows", () => {

    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("@Env-all TC15136_FTP_SF_Composite_records", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating PageGenerator ***", async () => {
            await io.pageGenerator(allure, FTPtoSF);
        });

        //Creating PageProcessor
        await test.step("*** Creating PageProcessor ***", async () => {
            await io.pageProcessor(allure, FTPtoSF);
        });

        //Enable and run the Flow ***
        await test.step("*** Enable and run the Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, FTPtoSF.qa__expectedDashboardCount)
        });
    });
});