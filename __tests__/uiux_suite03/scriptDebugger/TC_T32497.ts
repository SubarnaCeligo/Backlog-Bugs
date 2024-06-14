import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/ScriptDebugger/T32497.json"
import inputData from "@testData/ScriptDebugger/T32495.json"
test.describe('@Env-QA IO-T32495, IO-T32496, IO-T32497, IO-T32498, IO-T32499, IO-T32500, IO-T32503, IO-T32504, IO-T32508, IO-T32509 Verify whether Function stubs data displayed on the Flow builder.', () => {

    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

    });
    test('Verify whether all function stubs data displayed on the Flow builder', async ({
        io,
        page
    }) => {
        const id = await io.createResourceFromAPI(
            data,
            'FLOWS'
        );
        let expectedText;

        await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON)

        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
        await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
        await io.flowBuilder.fill(selectors.importPagePO.NAME, "Branching");
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
        await io.flowBuilder.clickByText('Branching')
        await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
        expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
        await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(inputData.Branching.toString().trim().toLowerCase().replace(/\s/g, ""));

        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);
        await io.flowBuilder.click(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.click(selectors.importPagePO.NAME);
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
        await io.homePage.clickByText('Filter')
        await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
        expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
        await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(inputData.Filter.toString().trim().toLowerCase().replace(/\s/g, ""));
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);
        await io.flowBuilder.click(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.click(selectors.importPagePO.NAME);
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
        await io.homePage.clickByText('Form init')
        await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
        expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
        await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(inputData.FormInit.toString().trim().toLowerCase().replace(/\s/g, ""));
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);
        await io.flowBuilder.click(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.click(selectors.importPagePO.NAME);
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
        await io.homePage.clickByText('Content based flow router')
        await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
        expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
        await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(inputData.ContentBasedFlowRouter.toString().trim().toLowerCase().replace(/\s/g, ""));
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);
        await io.flowBuilder.click(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.click(selectors.importPagePO.NAME);
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
        await io.homePage.clickByText('Handle request')
        await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
        expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
        await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(inputData.HandleRequest.toString().trim().toLowerCase().replace(/\s/g, ""));
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);
        await io.flowBuilder.click(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.click(selectors.importPagePO.NAME);
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
        await io.homePage.selectTextfromDropDown(page, 'transform')
        await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
        expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
        await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(inputData.Transform.toString().trim().toLowerCase().replace(/\s/g, ""));
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);
        await io.flowBuilder.click(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.click(selectors.importPagePO.NAME);
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);

        await io.homePage.clickByText('Post map')
        await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
        expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
        await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(inputData.PostMap.toString().trim().toLowerCase().replace(/\s/g, ""));
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);
        await io.flowBuilder.click(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.click(selectors.importPagePO.NAME);
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);

        await io.homePage.clickByText('Post response map')
        await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
        expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
        await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(inputData.PostResponseMap.toString().trim().toLowerCase().replace(/\s/g, ""));
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);
        await io.flowBuilder.click(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.click(selectors.importPagePO.NAME);
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);

        await io.flowBuilder.selectTextfromDropDown(page, "postSubmit");
        await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
        expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
        await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(inputData.PostSubmit.toString().trim().toLowerCase().replace(/\s/g, ""));
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);
        await io.flowBuilder.click(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.click(selectors.importPagePO.NAME);
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);

        await io.homePage.selectTextfromDropDown(page, 'preMap')
        await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
        expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
        await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(inputData.PreMap.toString().trim().toLowerCase().replace(/\s/g, ""));
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);
        await io.flowBuilder.click(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.click(selectors.importPagePO.NAME);
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);

        await io.homePage.selectTextfromDropDown(page, 'preSavePage')
        await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
        expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
        await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(inputData.PreSavePage.toString().trim().toLowerCase().replace(/\s/g, ""));
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);
        await io.flowBuilder.click(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.basePagePO.ACE_CONTENT);
        await io.flowBuilder.click(selectors.importPagePO.NAME);
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);

        await io.homePage.clickByText('Post aggregate')
        await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
        expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
        await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(inputData.PostAggregate.toString().trim().toLowerCase().replace(/\s/g, ""));

    });
});