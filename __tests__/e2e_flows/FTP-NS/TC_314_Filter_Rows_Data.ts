import { test, expect } from "@celigo/ui-core-automation";
import allure from "allure-playwright";
import NS from "@testData/Flows/create/netsuite/TC_314_filterwithrows.json"

test.describe("E2E Flows", () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateToHome()
    });

    test("TC_314_Filter_Rows_Data", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            var exportValidation = await io.pageGenerator(allure, NS);
        });

        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            var importValidation = await io.pageProcessor(allure, NS);
        });

        //Save, Enable and Run the Flow
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
        });
    });
});