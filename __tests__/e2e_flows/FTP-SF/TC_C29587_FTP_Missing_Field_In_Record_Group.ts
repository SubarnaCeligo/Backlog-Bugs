import { test, expect } from "@celigo/ui-core-automation"
import * as FTPtoFTP from "@testData/Flows/create/ftp/TC_C29587_FTP_Missing_Field_In_Record_Group.json"
import allure from "allure-playwright";

test.describe("E2E Flows", () => {

    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateToHome()
    });

    test("TC_C29587_FTP_Missing_Field_In_Record_Group", async ({
        io
    }, testInfo) => {

        //Creating PageGenerator 
        await test.step("*** Creating PageGenerator ***", async () => {
            var exportValidation = await io.pageGenerator(allure, FTPtoFTP);
        });

        //Creating PageProcessor
        await test.step("*** Creating PageProcessor ***", async () => {
            var importValidation = await io.pageProcessor(allure, FTPtoFTP);
        });

        //Enable and run the Flow ***
        await test.step("*** Enable and run the Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
        });
    });
});