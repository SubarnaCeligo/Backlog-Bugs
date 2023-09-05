import { test, expect } from "@celigo/ui-core-automation";
import allure from "allure-playwright";
import FTP from "@testData/Flows/create/ftp/TC_490_FTP_GroupByFields_To_FTP_Import.json"

test.describe("E2E Flows", () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateToHome()
    });
    test("TC_490_FTP_GroupByFields_To_FTP_Import", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            await io.pageGenerator(allure, FTP);
        });

        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            await io.pageProcessor(allure, FTP);
        });

        //Save, Enable and Run the Flow
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
        });
    });
});