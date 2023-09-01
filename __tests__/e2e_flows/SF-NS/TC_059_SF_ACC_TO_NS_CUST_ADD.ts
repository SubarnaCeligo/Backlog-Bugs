import { test, expect } from "@celigo/ui-core-automation";
import allure from "allure-playwright";
import NS from "@testData/Flows/create/salesforce/12_SF_Flow_01_SF_Account_to_NS_Cust_All_E2E_with_Verify.json"

test.describe("E2E Flows", () => {

    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateToHome()
    });

    test("TC_059_SF_ACC_TO_NS_CUST_ADD", async ({
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
        //Save, Enable and run the Flow ***
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            //TODO : Save the flow with test title     
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            //Enable and run the flow
            // await io.flowBuilder.runFlow()
        });
    });
});