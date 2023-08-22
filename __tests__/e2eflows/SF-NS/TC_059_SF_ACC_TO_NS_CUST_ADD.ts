import { test, expect } from "@celigo/ui-core-automation";
import allure from "allure-playwright";
import SF from "@testData/Flows/create/salesforce/12_SF_Flow_01_SF_Account_to_NS_Cust_All_E2E_with_Verify.json"


test.describe("E2E Tests", () => {

    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    });

    test("TC_059_SF_ACC_TO_NS_CUST_ADD", async ({
        io
    }) => {
        //Creating PageGenerator 
        await test.step("*** Creating PageGenerator ***", async () => {
            var exportValidation = await io.pageGenerator(allure, SF);
        });
        //Creating PageProcessor
        await test.step("*** Creating PageProcessor ***", async () => {
            var importValidation = await io.pageProcessor(allure, SF);
        });
        //Enable and run the Flow ***
        await test.step("*** Enable and run the Flow *** ", async () => {
            await io.flowBuilder.enableFlow()
            await io.flowBuilder.click("button[data-test='runFlow']");
        });
    });
});
