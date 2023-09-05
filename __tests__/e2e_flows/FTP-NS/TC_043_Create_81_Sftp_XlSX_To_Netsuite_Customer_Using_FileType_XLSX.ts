import { test, expect } from "@celigo/ui-core-automation";
import * as FTP from "@testData/Flows/create/ftp/Create_81_Sftp_XlSX_To_Netsuite_Customer_Using_FileType_XLSX.json"
import allure from "allure-playwright";
// import { AllureUtil as allureR } from "../../helper/utils.allure"
var allureReporter = new allure();
test.describe("E2E Tests", () => {

    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("TC_043_Create_81_Sftp_XlSX_To_Netsuite_Customer_Using_FileType_XLSX", async ({
        io
    },testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating PageGenerator ***", async () => {
            var exportValidation = await io.pageGenerator(allure, FTP);
        });
        //Creating PageProcessor
        await test.step("*** Creating PageProcessor ***", async () => {
            var importValidation = await io.pageProcessor(allure, FTP);
        });
        //Enable and run the Flow ***
        await test.step("*** Enable and run the Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title);
        });
    });
});