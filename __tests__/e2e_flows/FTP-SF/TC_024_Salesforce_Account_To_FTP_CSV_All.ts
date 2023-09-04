import { test, expect } from "@celigo/ui-core-automation";
import * as SFtoFTP from "@testData/Flows/create/salesforce/43_FTP_Flow_12_SF_to_FTP_CSV.json"
import allure from "allure-playwright";

test.describe("E2E Flows", () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateToHome()
    });
    test("TC_024_Salesforce_Account_To_FTP_CSV_All", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            var exportValidation = await io.pageGenerator(allure, SFtoFTP);
        });

        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            var importValidation = await io.pageProcessor(allure, SFtoFTP);
        });

        //Save, Enable and Run the Flow
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
        });
    });
});