import { test, expect } from "@celigo/ui-core-automation";
import allure from "allure-playwright";
import NStoSF from "@testData/Flows/create/netsuite/03.Flow-3-NS-CUST-SF-ACC-UPSERT-AUTO.json"

test.describe("E2E Flows", () => {

    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateToHome()
    });

    test("TC_076_NS-CUST-SF-ACC-UPSERT", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            var exportValidation = await io.pageGenerator(allure, NStoSF);
        });

        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            var importValidation = await io.pageProcessor(allure, NStoSF);
        });

        //Save, Enable and Run the Flow
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
        });
    });
});
