import { test, expect } from "@celigo/ui-core-automation";
import * as FTPtoFTP from "@testData/Flows/create/ftp/TC_C2810_Verify_Ftp_import_CSV_with_headers.json"
import allure from "allure-playwright";

test.describe("E2E Flows", () => {

    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
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
        //Save, Enable and run the Flow ***
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            //TODO : Save the flow with test title     
            await io.flowBuilder.saveandRunFlow(testInfo.title)

            //Enable flow
            await io.flowBuilder.enableFlow()
        });
    });
});