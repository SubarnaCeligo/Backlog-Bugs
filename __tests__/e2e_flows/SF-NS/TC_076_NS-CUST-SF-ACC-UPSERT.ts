import { test, expect } from "@celigo/ui-core-automation";
import allure from "allure-playwright";
import NStoSF from "@testData/Flows/create/netsuite/03.Flow-3-NS-CUST-SF-ACC-UPSERT-AUTO.json"
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_076_NS-CUST-SF-ACC-UPSERT | Golden", () => {

    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    });

    test("TC_076_NS-CUST-SF-ACC-UPSERT", async ({
        io
    }) => {
        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            var exportValidation = await io.pageGenerator(allure, NStoSF);
        });
        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            var importValidation = await io.pageProcessor(allure, NStoSF);
        });
        //Save, Enable and run the Flow ***
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            //TODO : Save the flow with test title     
            await io.flowBuilder.enableFlow()
            await io.flowBuilder.click("button[data-test='runFlow']");
            await io.flowBuilder.isVisible("div[role='dialog']");
            await io.flowBuilder.click("button[data-test='Run']")
        });
    });
});
