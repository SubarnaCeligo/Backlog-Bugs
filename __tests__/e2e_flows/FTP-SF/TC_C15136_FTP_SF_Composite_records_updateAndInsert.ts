import { test, expect } from "@celigo/ui-core-automation";
import * as FTPtoSF from "@testData/Flows/create/ftp/TC_C15136_FTP_SF_Composite_records_updateAndInsert.json"
import allure from "allure-playwright";

test.describe("E2E Flows", () => {

    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateToHome()
    });

    test("TC_C15136_FTP_SF_Composite_records_updateAndInsert", async ({
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
        });
    });
});