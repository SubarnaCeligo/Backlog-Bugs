import { test, expect } from "@celigo/ui-core-automation";
import allure from "allure-playwright";
import NS from "@testData/Flows/create/ftp/TC_316_FTPExport_GroupedData_InputFilter.json"

test.describe("E2E Flows", () => {
    // test.beforeEach(async ({ io }) => {
    //     await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    // });
    test("TC_316_FTPExport_GroupedData_InputFilter", async ({
        io
    }, testInfo) => {
        //Navigate to Home 
        await test.step("*** Login and Navigate to Application ***", async () => {
            await io.homePage.navigateToHome()
        });

        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            var exportValidation = await io.pageGenerator(allure, NS);
        });

        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            var importValidation = await io.pageProcessor(allure, NS);
        });

        //Save, Enable and run the Flow ***
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            //Enable and run the flow
            // await io.flowBuilder.runFlow()
        });
    });
});