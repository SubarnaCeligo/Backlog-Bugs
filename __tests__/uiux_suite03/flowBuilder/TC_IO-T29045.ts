import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C20688 from '@testData/email_validations/C20688.json'

test.describe("Verify the text for testMode for all the stubs that contains testMode field", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-QA @Zephyr-IO-T29045 @Priority-P2 @BugID-IO-73222", async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C20688, "FLOWS");
   

        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SCRIPT);
        //Verify testMode for Presavepage hook
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
        await io.flowBuilder.addStep("Selecting Presavepage");
        await io.flowBuilder.selectTextfromDropDown(page, "preSavePage");     
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPAND_WINDOW_HOOKS);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.addStep("Validating testMode text for preSavePage hook");
        await io.assert.verifyElementDisplayedByText("*   'testMode' - boolean flag indicating test mode and previews.", "text for textMode field is not available");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);
        await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
         //Verify testMode for postAggregate hook
        await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
        await io.flowBuilder.addStep("Selecting postAggregate");
        await io.flowBuilder.selectTextfromDropDown(page, "postAggregate");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPAND_WINDOW_HOOKS);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.addStep("Validating testMode text for postAggregate hook");
        await io.assert.verifyElementDisplayedByText("*   'testMode' - boolean flag indicating test mode and previews.", "text for textMode field is not available");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);
        await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        //Verify testMode for postMap hook
        await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
        await io.flowBuilder.addStep("Selecting postMap");
        await io.flowBuilder.selectTextfromDropDown(page, "postMap");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.addStep("Validating testMode text for postMap hook");
        await io.assert.verifyElementDisplayedByText("*   'testMode' - boolean flag indicating test mode and previews.", "text for textMode field is not available");
        await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        //Verify testMode for postResponseMap hook
        await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
        await io.flowBuilder.addStep("Selecting postResponseMap");
        await io.flowBuilder.selectTextfromDropDown(page, "postResponseMap");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPAND_WINDOW_HOOKS);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.addStep("Validating testMode text for postResponseMap hook");
        await io.assert.verifyElementDisplayedByText("*   'testMode' - boolean flag indicating test mode and previews.", "text for textMode field is not available");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);
        await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        //Verify testMode for postSubmit hook
        await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
        await io.flowBuilder.addStep("Selecting postSubmit");
        await io.flowBuilder.selectTextfromDropDown(page, "postSubmit");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPAND_WINDOW_HOOKS);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.addStep("Validating testMode text for postSubmit hook");
        await io.assert.verifyElementDisplayedByText("*    'testMode' - boolean flag indicating test mode and previews.", "text for textMode field is not available");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);
        await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        //Verify testMode for preMap hook
        await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
        await io.flowBuilder.addStep("Selecting preMap");
        await io.flowBuilder.selectTextfromDropDown(page, "preMap");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.addStep("Validating testMode text for preMap hook");
        await io.assert.verifyElementDisplayedByText("*   'testMode' - boolean flag indicating test mode and previews.", "Text is not available ");
        await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);


    });
});