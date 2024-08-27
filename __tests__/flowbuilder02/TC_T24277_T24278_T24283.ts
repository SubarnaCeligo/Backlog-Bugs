import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T24277_T24278_T24283 - Verify the connection chosen matches the exact same connection as the existing flow step, then display an additional 2 radio field right after the Connection.", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        //make sure the account has at least one shoify export
        // await io.createResourceFromAPI(exportJson, 'EXPORT');
    });
    test("@Epic-IO-54539 @Priority-P2 @Zephyr-IO-TC_T24277 @Zephyr-IO-T24278 @Zephyr-IO-T24283 @Env-All - Verify the connection chosen matches the exact same connection as the existing flow step, then display an additional 2 radio field right after the Connection.", async ({ io, page }) => {
        //Navigate to flow builder page
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);

        //Add Source
        await io.flowBuilder.click(selectors.basePagePO.ADD_SOURCE_BUTTON);

        //Search and select an application
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.APP_NAME_INPUT);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "SHOPIFY");
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.SHOPIFY_CONNECTION);
        await io.flowBuilder.click(selectors.connectionsPagePO.SHOPIFY_CONNECTION);

        //Select type
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.LIST_BOX);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECTED_EXPORT_RECORDS);

        //Wait for existing resources to load
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OPENAI.NLS_RESOURCE);

        //Click on any existing resource
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.OPENAI.NLS_RESOURCE, 0);

        //Verify if Next button is clickable
        await io.flowBuilder.click(selectors.basePagePO.SAVE);

        ////Wait for the page to load
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_NAME);

        //select connection
        await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
        await io.flowBuilder.fill(selectors.basePagePO.CONNECTION_DROPDOWN, 'SHOPIFY CONNECTION');
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST);
        await io.flowBuilder.clickByTextByIndex('SHOPIFY CONNECTION', 0);

        //Get Form label
        let formLabel = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.CLONE_RESOURCE_LABEL)).toString();
        await io.assert.expectToContainValue("How would you like to use the existing flow step? *", formLabel, "Form label is not displayed");

        //Verify if radio buttons are diplayed
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.CLONE_FLOW_STEP, "Clone flow step radio button is not displayed");
        let cloneFlowStep = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.CLONE_FLOW_STEP_LABEL)).toString();
        await io.assert.expectToBeValue("Clone flow step", cloneFlowStep, "Clone flow step is not displayed");

        //Make sure Clone flow step is selected by default
        await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.CLONE_FLOW_STEP_RADIO, "class", "Mui-checked");

        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.USE_SAME_FLOW_STEP, "Use same flow step radio button is not displayed");
        let useSameFlowStep = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.USE_SAME_FLOW_STEP_LABEL)).toString();
        await io.assert.expectToBeValue("Use same flow step", useSameFlowStep, "Use same flow step is not displayed");

        await io.flowBuilder.addStep("T24278-Verify Help text for 'How would you like to use the existing flow step? *'");
        //validate help text
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_RESOURCE_HELPTEXT_BUTTON);

        await io.flowBuilder.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
        let heading = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.PAGE_INFO_HEADER_TEXT)).toString();
        await io.assert.expectToBeValue("Celigo AI,How would you like to use the existing flow step?", heading, "Heading is not displayed");

        let content = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
        await io.assert.expectToContainValue("Clone flow step: This option creates a copy of the original flow step that can be modified to suit the purposes of this flow without affecting the original.Use same flow step: This option reuses the existing flow step. Modifications to the flow step will apply to other instances of the flow step if used in other flows.Was this helpful?Field path: cloneResourceRadioGroup,Was this helpful?,Field path: cloneResourceRadioGroup", content, "Message is not displayed");

        //Validate checking and unchecking
        await io.flowBuilder.addStep("T24283-Verify user is able to check and uncheck radio buttons 'Clone flow step'/'Use same flow step' on Create Export/import form");
        //  Select Use same flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.USE_SAME_FLOW_STEP_RESOURCE);
        //Make sure Use same flow step is selected
        await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.USE_SAME_FLOW_STEP_RADIO, "class", "Mui-checked");

        //  Select Clone same flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_STEP_RESOURCE);
        //Make sure Use same flow step is selected
        await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.CLONE_FLOW_STEP_RADIO, "class", "Mui-checked");

    });
});