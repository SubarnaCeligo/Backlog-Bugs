import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C20688 from '@testData/email_validations/C20688.json'

test.describe("T29045_Verify the text for testMode for all the stubs that contains testMode field", () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("Navigated to home page");
    });
    test("@Env-QA @Zephyr-IO-T29045 @Priority-P2 @BugID-IO-73222", async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C20688, "FLOWS");
        await io.flowBuilder.addStep("Created one Flow from API to test the testMode field for the required function stub generated");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.addStep("Clicking on the plus icon from the export bubble")
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK);
        await io.flowBuilder.addStep("Waiting for the hook icon to be displayed and then we can click on the hook icon")
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK);
        await io.flowBuilder.addStep("Clicked on hooks icon");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SCRIPT);
        await io.flowBuilder.addStep("Clicked on plus icon to create the script");
        //Verify testMode for Presavepage hook
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
        await io.flowBuilder.addStep("Clicked on insert function dropdown to insert the script function stub");
        await io.flowBuilder.selectTextfromDropDown(page, "preSavePage");
        await io.flowBuilder.addStep("Selecting Presavepage from the dropdown of insert function");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPAND_WINDOW_HOOKS);
        await io.flowBuilder.addStep("Expanding the window where the function stub got generated");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementDisplayedByText("*   'testMode' - boolean flag indicating test mode and previews.", "text for textMode field is not available");
        await io.flowBuilder.addStep("Validated testMode text for preSavePage hook");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);
        await io.flowBuilder.addStep("Closed the expand window drawer");
        await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.flowBuilder.addStep("Trying to close the create script  drawer");
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        await io.flowBuilder.addStep("Discarded the changes");
        //Verify testMode for postAggregate hook
        await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
        await io.flowBuilder.addStep("Clicked on plus icon to create the script");
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
        await io.flowBuilder.addStep("Clicked on insert function dropdown to insert the script function stub");
        await io.flowBuilder.selectTextfromDropDown(page, "postAggregate");
        await io.flowBuilder.addStep("Selecting postAggregate");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPAND_WINDOW_HOOKS);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.addStep("Expanding the window where the function stub got generated");
        await io.flowBuilder.loadingTime();
        // await io.assert.verifyElementDisplayedByText("*   'testMode' - boolean flag indicating test mode and previews.", "text for textMode field is not available");
        await io.flowBuilder.addStep("Validating testMode text for postAggregate hook");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);
        await io.flowBuilder.addStep("Closed the expand window drawer");
        await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.flowBuilder.addStep("Trying to close the create script  drawer");
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        await io.flowBuilder.addStep("Discarded the changes and came back to create hook section");
        //Verify testMode for postMap hook
        await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
        await io.flowBuilder.addStep("Clicked on plus icon to create the script");
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
        await io.flowBuilder.addStep("Clicked on insert function dropdown to insert the script function stub");
        await io.flowBuilder.selectTextfromDropDown(page, "postMap");
        await io.flowBuilder.addStep("Selected postMap from the drop down");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPAND_WINDOW_HOOKS);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.addStep("Validating testMode text for postMap hook");
        await io.assert.verifyElementDisplayedByText("*   'testMode' - boolean flag indicating test mode and previews.", "text for textMode field is not available");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);
        await io.flowBuilder.addStep("Validated testMode text for postMap hook");
        await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.flowBuilder.addStep("Trying to close the create script  drawer");
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        await io.flowBuilder.addStep("Discarded the changes and came back to create hook section");
        //Verify testMode for postResponseMap hook
        await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
        await io.flowBuilder.addStep("Clicked on plus icon to create the script");
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
        await io.flowBuilder.addStep("Clicked on insert function dropdown to insert the script function stub");
        await io.flowBuilder.selectTextfromDropDown(page, "postResponseMap");
        await io.flowBuilder.addStep("Selecting postResponseMap");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPAND_WINDOW_HOOKS);
        await io.flowBuilder.addStep("Expanding the window where the function stub got generated");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementDisplayedByText("*   'testMode' - boolean flag indicating test mode and previews.", "text for textMode field is not available");
        await io.flowBuilder.addStep("Validating testMode text for postResponseMap hook");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);
        await io.flowBuilder.addStep("Closed the expand window drawer");
        await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.flowBuilder.addStep("Trying to close the create script  drawer");
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        await io.flowBuilder.addStep("Discarded the changes and came back to create hook section");
        //Verify testMode for postSubmit hook
        await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
        await io.flowBuilder.addStep("Clicked on plus icon to create the script");
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
        await io.flowBuilder.addStep("Clicked on insert function dropdown to insert the script function stub");
        await io.flowBuilder.selectTextfromDropDown(page, "postSubmit");
        await io.flowBuilder.addStep("Selected postSubmit");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPAND_WINDOW_HOOKS);
        await io.flowBuilder.addStep("Expanded the window where the function stub got generated");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementDisplayedByText("*    'testMode' - boolean flag indicating test mode and previews.", "text for textMode field is not available");
        await io.flowBuilder.addStep("Validating testMode text for postSubmit hook");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);
        await io.flowBuilder.addStep("Closed the expand window drawer");
        await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.flowBuilder.addStep("Trying to close the create script  drawer");
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        await io.flowBuilder.addStep("Discarded the changes and came back to create hook section");
        //Verify testMode for preMap hook
        await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
        await io.flowBuilder.addStep("Clicked on plus icon to create the script");
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
        await io.flowBuilder.addStep("Clicked on insert function dropdown to insert the script function stub");
        await io.flowBuilder.selectTextfromDropDown(page, "preMap");
        await io.flowBuilder.addStep("Selected preMap");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementDisplayedByText("*   'testMode' - boolean flag indicating test mode and previews.", "Text is not available ");
        await io.flowBuilder.addStep("Validating testMode text for preMap hook");
        await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.flowBuilder.addStep("Trying to close the create script  drawer");
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        await io.flowBuilder.addStep("Discarded the changes and came back to create hook section");
    });
    test.afterEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("Navigated back to home page");
    });
});