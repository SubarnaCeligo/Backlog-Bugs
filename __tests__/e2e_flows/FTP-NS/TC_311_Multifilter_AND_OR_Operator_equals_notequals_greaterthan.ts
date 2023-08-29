import { test, expect } from "@celigo/ui-core-automation";
import allure from "allure-playwright";
import NS from "@testData/Flows/create/netsuite/TC_311_Multifilter_AND_OR_Operator_equals_notequals_greaterthan.json"
import * as selectors from "@celigo/aut-selectors";

test.describe("E2E Flows", () => {

    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    });

    test("TC_311_Multifilter_AND_OR_Operator_equals_notequals_greaterthan", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating PageGenerator ***", async () => {
            var exportValidation = await io.pageGenerator(allure, NS);
        });
        //Creating PageProcessor
        await test.step("*** Creating PageProcessor ***", async () => {
            var importValidation = await io.pageProcessor(allure, NS);
        });
        //Save, Enable and run the Flow ***
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            //TODO : Save the flow with test title     
            await io.flowBuilder.saveFlow(testInfo.title)
            //Enable and run the flow
            // await io.flowBuilder.runFlow()
        });
    });
});