import { test, expect } from "@celigo/ui-core-automation";
import * as SFtoFTP from "@testData/Flows/create/salesforce/Create_NS_to_EDI_Macy_870.json"
import allure from "allure-playwright";

test.describe("E2E Flows", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_303_Create_NS_to_EDI_Macy_870", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            await io.pageGeneratorDemo(allure, SFtoFTP);
        });

        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            await io.pageProcessorDemo(allure, SFtoFTP);
        });

        //Save, Enable and Run the Flow
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, SFtoFTP.qa__expectedDashboardCount)
        });
    });
});