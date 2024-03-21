import { expect, test } from "@celigo/ui-core-automation";
import allure from "allure-playwright";
import * as selectors from "@celigo/aut-selectors";
import C42590 from '../../../testData/inputData/Mapper2.0/C42590.json';

test.describe("TC_C42590_Verify the mapping preview for the custom fields added in Salesforce_UI_Backlog", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("TC_C42590_Verify the mapping preview for the custom fields added in Salesforce_UI_Backlog", async ({ io, page }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating PageGenerator ***", async () => {
            await io.pageGenerator(allure, C42590);
        });
        //Creating PageProcessor
        await test.step("*** Creating PageProcessor ***", async () => {
            await io.pageProcessor(allure, C42590);
            await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_IMPORT_PLUSBUTTON);
            await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
            await io.flowBuilder.click(selectors.mappings.MAPPER1DOT0PO.SOURCE_RECORD_FIELD_FIRST);
            await io.homePage.fillByIndex(selectors.mappings.MAPPER1DOT0PO.SOURCE_RECORD_FIELD_INPUT, "Name", 0)
            await io.homePage.doubleClick(selectors.mappings.MAPPER1DOT0PO.DESTINATION_INPUT)
            await io.homePage.fillByIndex(selectors.mappings.MAPPER1DOT0PO.DESTINATION_INPUT_ADD, "TC_C42590", 0)
            await io.homePage.waitForElementAttached(selectors.mappings.MAPPER2DOT0PO.PREVIEW)
            await io.homePage.performWebActions(selectors.mappings.MAPPER2DOT0PO.PREVIEW, "preview")
            await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW)
            //validating mapping
            await io.assert.verifyElementContainsText(selectors.basePagePO.RESULT_PREVIEW_CONTENT, "Account")
            await io.homePage.click(selectors.playgroundPO.LAYOUT_TOGGLE)
            await io.homePage.click(selectors.mappings.ASSISTANT_RIGHT_VIEW)
            await io.assert.verifyElementDisplayedByText('Salesforce mapping assistant', 'Assistant not available')
            await io.importsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        });
    });
});