import { test, expect } from "@celigo/ui-core-automation";
import allure from "allure-playwright";
import * as selectors from "@celigo/aut-selectors";
import * as NS_FTP from "@testData/Flows/TC_C107885.json"

test.describe("TC_C45345_Verify the 'help text' and 'field labels' inside the settings drawer where ever the 'Source Field 'and 'Destination field ' text will exists_UI_Backlog", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("TC_C45345_Verify the 'help text' and 'field labels' inside the settings drawer where ever the 'Source Field 'and 'Destination field ' text will exists_UI_Backlog", async ({ io, page }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating PageGenerator ***", async () => {
            await io.pageGenerator(allure, NS_FTP);
        });
        //Creating PageProcessor
        await test.step("*** Creating PageProcessor ***", async () => {
            await io.pageProcessor(allure, NS_FTP);
            await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_IMPORT_PLUSBUTTON);
            await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
            //validating Destination and soource field visible
            await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER,'Destination field not available')
            await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER,'Source field is not available')

        });
    });
})