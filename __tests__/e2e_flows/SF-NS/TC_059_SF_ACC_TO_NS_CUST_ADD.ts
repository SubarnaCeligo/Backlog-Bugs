import { test, expect } from "@celigo/ui-core-automation";
import allure from "allure-playwright";
import NS from "@testData/Flows/create/salesforce/12_SF_Flow_01_SF_Account_to_NS_Cust_All_E2E_with_Verify.json"

test.describe("E2E Flows", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    
    test("@Env-all TC_059_SF_ACC_TO_NS_CUST_ADD", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            await io.pageGenerator(allure, NS);
        });

        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            await io.pageProcessor(allure, NS);
        });

        //Save, Enable and Run the Flow
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, NS.qa__expectedDashboardCount)
        });
    });
});