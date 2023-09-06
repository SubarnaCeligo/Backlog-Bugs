import { test, expect } from "@celigo/ui-core-automation";
import * as FTPtoSF from "@testData/Flows/create/ftp/110.FTP_Xml_Export_To_SF_Imp.json"
import allure from "allure-playwright";

test.describe("E2E Flows", () => {

    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateToHome()
    });

    test("TC_247_FTP_Xml_Export_To_SF_Import", async ({
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