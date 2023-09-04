import { test, expect } from "@celigo/ui-core-automation";
import * as FTPtoFTP from "@testData/Flows/create/ftp/TC_C2810_Verify_Ftp_import_CSV_with_headers.json"
import allure from "allure-playwright";

test.describe("E2E Flows", () => {

    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateToHome()
    });

    test("TC_C2810_Verify_Ftp_import_CSV_with_headers", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            var exportValidation = await io.pageGenerator(allure, FTPtoFTP);
        });

        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            var importValidation = await io.pageProcessor(allure, FTPtoFTP);
        });

        //Save, Enable and Run the Flow
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
        });
    });
});