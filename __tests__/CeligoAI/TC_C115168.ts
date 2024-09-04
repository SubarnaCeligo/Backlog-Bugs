import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { randomString, randomNumber } from "@celigo/aut-utilities";

test.describe("C115168 Verify the flow description Celigo AI", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T15233 C115168 Verify the flow description Celigo AI", async ({ io, page }) => {
  
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON);
    //Flow Description on Integration page C115168 C115169
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON, "Flow description is not displayed");
    //Hover C115194
    let descButton = await page.locator(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON).first();
    descButton.hover();
    await io.flowBuilder.loadingTime();
    const descHover = page.getByText('Flow description').first();
    await descHover.waitFor({ state: 'visible', timeout: 30000 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON);
    //Placeholder C115173 C115177
    const descPlaceholder = page.getByText('No user description added').first();
    await descPlaceholder.waitFor({ state: 'visible', timeout: 30000 });
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_WINDOW)).toHaveAttribute('data-popper-placement', 'right-start');
    //Verify Celigo AI are in expand state. C115174 C115175
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BAR)).toHaveAttribute('aria-expanded', 'true');
    await descHover.waitFor({ state: 'visible', timeout: 30000 });
    const descr = page.getByText('Description').first();
    await descr.waitFor({ state: 'visible', timeout: 30000 });
    const celigoAiGen = page.getByText('Celigo AI generated').first();
    await celigoAiGen.waitFor({ state: 'visible', timeout: 30000 });
    // C115191 Celigo AI generated Hover Text
    // celigoAiGen.hover();
    // await io.flowBuilder.loadingTime();
    // const hoverText = page.getByText('Use these concise descriptions and summaries of workflows to understand intricate flow configurations and settings.').first();
    // await hoverText.waitFor({ state: 'visible', timeout: 30000 });
    // Refresh Button not Disabled if chanages are there C115180
    const refreshDisabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.REFRESH_BUTTON);
    expect(await refreshDisabled[0].getAttribute('class')).not.toContain('Mui-disabled');
    //C115186
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.COLLAPSE_BUTTON);
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BAR)).toHaveAttribute('aria-expanded', 'false');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON);
    //Flow C115181
    await io.flowBuilder.clickByText('TC47946_DND');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON, "Flow description is not displayed");
    //Flow Settings C115171
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_SETTINGS);
    await page.locator(selectors.flowBuilderPagePO.OPENAI.DESCRIPTION_TEXTBOX).clear();
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.DESCRIPTION_TEXTBOX, "test");
    await io.flowBuilder.clickByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 0);
    await io.flowBuilder.loadingTime();
    //Flow Builder C115172 C115176
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON);
    const descrAdded = page.getByText('test').first();
    await descrAdded.waitFor({ state: 'visible', timeout: 30000 });
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_WINDOW)).toHaveAttribute('data-popper-placement', 'right-start');
    await descHover.waitFor({ state: 'visible', timeout: 30000 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.DESCRIPTION_DISPLAY);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.DESCRIPTION_INPUT, "placeholder");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.DESCRIPTION_SAVE);
    await io.flowBuilder.loadingTime();
    const descrInFlow = page.getByText('placeholder').first();
    await descrInFlow.waitFor({ state: 'visible', timeout: 30000 });
    //Check on clicking Pencil Icon, user able to edit the description IO-T27283
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.DESCRIPTION_DISPLAY);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.DESCRIPTION_INPUT, "placeholderTextUpdated");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.DESCRIPTION_SAVE);
    const descrInFlowupdated = page.getByText('placeholderTextUpdated').first();
    await descrInFlowupdated.waitFor({ state: 'visible', timeout: 30000 });
    await io.flowBuilder.loadingTime();
    //When Description is more than 5120 char
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.DESCRIPTION_DISPLAY);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.DESCRIPTION_INPUT, "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");
    const descrInFlowError = page.getByText('The description exceeds the max character limit').first();
    await descrInFlowError.waitFor({ state: 'visible', timeout: 30000 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.DESCRIPTION_CANCEL);
    //Hover on Copy and Refresh enable C115179 C115187
    await io.homePage.hover(selectors.flowBuilderPagePO.OPENAI.REFRESH_BUTTON);
    await io.flowBuilder.loadingTime();
    const refresh = page.getByText('refresh').first();
    await refresh.waitFor({ state: 'visible', timeout: 30000 });
    const refreshenabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.REFRESH_BUTTON);
    expect(await refreshenabled[0].getAttribute('class')).not.toContain('Mui-disabled');
    await io.homePage.hover(selectors.flowBuilderPagePO.OPENAI.COPY_BUTTON);
    await io.flowBuilder.loadingTime();
    const copy = page.getByText('copy').first();
    await copy.waitFor({ state: 'visible', timeout: 30000 });
    // Copied to clipboard text C115178
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.COPY_BUTTON);
    const clipboard = page.getByText('Copied to clipboard').first();
    await clipboard.waitFor({ state: 'visible', timeout: 30000 });
    //Scroll the Description Box till feedback C115188 C115192 C115193
    const feedback = page.getByText('Was this helpful?');
    while (!(await feedback.isVisible())) {
      await page.mouse.wheel(0, 600);
    }
    await feedback.waitFor({ state: 'visible', timeout: 30000 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON);
    //Export in FLowBuilder C115184
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
    await io.homePage.loadingTime();
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.CELIGOAI_GENERATEDBUTTON, "CeligoAI Generated Button is not displayed");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.CELIGOAI_GENERATEDBUTTON);
    const exportFlowDisc = page.getByText('Export description').first();
    await exportFlowDisc.waitFor({ state: 'visible', timeout: 30000 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON);
    await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    //Import in FLowBuilder
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.CELIGOAI_GENERATEDBUTTON, "CeligoAI Generated Button is not displayed");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.CELIGOAI_GENERATEDBUTTON);
    const importFlowDisc = page.getByText('Import description').first();
    await importFlowDisc.waitFor({ state: 'visible', timeout: 30000 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON);
    await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    // Imports in Resources C115185
    await io.homePage.goToMenu("Resources", "Imports");
    await io.flowBuilder.loadingTime();
    await io.homePage.hover(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON, "Flow description is not displayed");
    // Exports in Resources
    await io.homePage.goToMenu("Resources", "Exports");
    await io.flowBuilder.loadingTime();
    await io.homePage.hover(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON, "Flow description is not displayed");
     // Blank Flow Description Disabled
     await io.homePage.goToMenu("Tools", "Flow builder");
     await io.flowBuilder.loadingTime();
     await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON, "Flow description is not displayed");
     const flowDescDisabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON);
     expect(await flowDescDisabled[0].getAttribute('class')).toContain('Mui-disabled');
    //Flow Group C115170
    await io.homePage.goToMenu("Home");
    await io.homePage.hover(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.flowBuilder.clickByText('AFE_AUTOSUGGESTIONS_mapper2.0_DND');
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.CREATE_FLOWGROUP);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_NAME);
    let flowGroupName = `FlowGroup${randomString(10) + randomNumber(10)}`;
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_NAME, flowGroupName);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_CHECKBOX, 4);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_CHECKBOX, 5);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.clickByTextByIndex(flowGroupName, 0);
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON, "Flow description is not displayed");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_UNASSIGNED);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON, "Flow description is not displayed");
    //Remove FLow Group
    await io.flowBuilder.clickByTextByIndex(flowGroupName, 0);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 0);
    await io.flowBuilder.click(selectors.flowGroupingPagePO.EDIT_FG);
    await io.flowBuilder.clickByTextByIndex("Delete flow group", 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_DELETE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
  });
});