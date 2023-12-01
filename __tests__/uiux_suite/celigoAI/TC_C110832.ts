import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C110832 Verify JS Editor is having Celigo AI", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("C110832 Verify JS Editor is having Celigo AI", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.clickByText('TC47946_DND');
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    //EXPORT_TRANSFORMATION C110838
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    await io.flowBuilder.loadingTime();
    //EXPORT_TRANSFORMATION RULES C111492
    const isCeligoAINotVisibleInRule = !(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT));
    await io.assert.expectToBeTrue(isCeligoAINotVisibleInRule, "Celigo AI Not Visible for Rule 1.0 or 2.0");
    await io.flowBuilder.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    //Verify Celigo AI are in collapsed state and disabled. C113470 C113471
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-disabled', 'true');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
      "Celigo AI is not displayed"
    )
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_LIST_DROPDOWN_ID);
    await io.flowBuilder.clickByTextByIndex("Branching script", 1);
    //Check CeligoHelpText is Aligned or not C113472 and C111475
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT);
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW)).toHaveAttribute('data-popper-placement', 'top');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW, 'Provide instructions for Celigo AI to generate a Javascript code for you. ');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW, 'Note: Your instructions will not be saved after you exit the editor window.');
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.HELPTEXT_CLOSE,0);
    await io.flowBuilder.clickByText('Celigo AI');
    //C111479
    const placeholderText = page.getByText('Start typing a prompt that describes your javascript code.The conversation will be recorded here for as long as you remain in this screen.').first();
    await placeholderText.waitFor({ state: 'visible', timeout: 30000 });
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    )
    //Verify Celigo AI are in expand state. Explain button disabled C111481
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'true');
    const explainDisabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION);
    expect(await explainDisabled[0].getAttribute('class')).toContain('Mui-disabled');
    // //Checking celigo AI not taking space as prompt C113468
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, '');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    const isCeligoAIThinkingNotVisible = !(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR));
    await io.assert.expectToBeTrue(isCeligoAIThinkingNotVisible, "Celigo AI Thinking Not Visible");
    //EXPORT_TRANSFORMATION Continue
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'write js code to give current time');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR,
      "Celigo AI Prompt Thinking is not displayed"
    )
    const exportFunction = page.getByText('function transform');
    await exportFunction.waitFor({ state: 'visible', timeout: 30000 });
    //user can provide feedback thumbs up C111477
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.THUMPSUP);
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.THUMPSUP)).toHaveAttribute('color', 'green');
    //Placeholder after reset C111476
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.RESET_CONVERSATION);
    await placeholderText.waitFor({ state: 'visible', timeout: 30000 });
    //Default layout is vertical layout if Celigo AI is enabled for JS editors C111478
    await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
    await io.assert.verifyElementIsDisplayed(
      selectors.playgroundPO.SELECTED_COLUMN_VIEW,
      "Default layout is not column view"
    );
    await io.flowBuilder.click(selectors.playgroundPO.SELECTED_COLUMN_VIEW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
    //EXPORT_FILTER C110832
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
    await io.flowBuilder.loadingTime();
    //EXPORT_FILTER RULES C111491
    const isCeligoAINotVisibleInRules = !(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT));
    await io.assert.expectToBeTrue(isCeligoAINotVisibleInRules, "Celigo AI Not Visible for Rules");
    await io.flowBuilder.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    //Verify Celigo AI are in collapsed state. 
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-disabled', 'true');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
      "Celigo AI is not displayed"
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_LIST_DROPDOWN_ID);
    await io.flowBuilder.clickByTextByIndex("Branching script", 1);
    await io.flowBuilder.clickByText('Celigo AI');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    );
    //Verify Celigo AI are in expand state. 
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'true');
    const explainExportDisabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION);
    expect(await explainExportDisabled[0].getAttribute('class')).toContain('Mui-disabled');
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'Get id');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR,
      "Celigo AI Prompt Thinking is not displayed"
    )
    const exportFilter = page.getByText('function filter');
    await exportFilter.waitFor({ state: 'visible', timeout: 30000 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
    //EXPORT_HOOK C110849
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPT_ID, 0);
    await io.flowBuilder.clickByIndex(selectors.basePagePO.MENU_ITEM, 1);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR, 0);
    //Verify Celigo AI are in collapsed state. 
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'false');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
      "Celigo AI is not displayed"
    );
    await io.flowBuilder.clickByText('Celigo AI');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    );
    //Verify Celigo AI are in expand state. 
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'true');
    const explainHookDisabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION);
    expect(await explainHookDisabled[0].getAttribute('class')).toContain('Mui-disabled');
    // hover text for the disabled Explain selection button C111482
    await io.flowBuilder.loadingTime();
    let disabledButton = await page.locator(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION); 
    const buttonBoundingBox = await disabledButton.boundingBox();
    if (buttonBoundingBox) {
   
      const x = buttonBoundingBox.x + buttonBoundingBox.width / 2;
      const y = buttonBoundingBox.y + buttonBoundingBox.height / 2;
      await page.mouse.move(x, y);
      await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION_HOVER_TEXT).first()).toHaveAttribute('aria-label', 'Select code lines and click or tap here to understand it');   
    }
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'Get testmode');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR,
      "Celigo AI Prompt Thinking is not displayed"
    )
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.JAVASCRIPT_PANEL);
    const exportHook = page.getByText('preSavePage');
      while (!(await exportHook.isVisible())) {
          await page.mouse.wheel(0, 600);
      }
      await exportHook.waitFor({ state: 'visible', timeout: 30000 });

    //Select JS Function and check Explain Selection is enabled C111484
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    const explainPlaygroundEnabled= await page.$$(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION);
    expect(await explainPlaygroundEnabled[0].getAttribute('class')).not.toContain('Mui-disabled');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION);
    await io.flowBuilder.loadingTime();
    const explanation = page.getByText('Explanation');
    await explanation.waitFor({ state: 'visible', timeout: 30000 });
   // explanation window is draggable in JS editors  C111485
   const draggableBox = await page.$(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION_WINDOW);
  if (draggableBox) {
    // Get the bounding box of the draggable box
    const boundingBox = await draggableBox.boundingBox();

    if (boundingBox) {
      // Calculate the start and end coordinates for the drag
      const startX = boundingBox.x + boundingBox.width / 2;
      const startY = boundingBox.y + boundingBox.height / 2;
      const endX = startX + 100; // Adjust the distance to move
      const endY = startY + 100; // Adjust the distance to move

      // Perform the drag operation
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(endX, endY);
      await page.mouse.up();
    }
  }
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER,1);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
    //Edit Branching C110852
    await io.flowBuilder.click(selectors.flowBranchingPO.ROUTERS);
    await io.flowBuilder.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    const isCeligoAINotVisible = !(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT));
    await io.assert.expectToBeTrue(isCeligoAINotVisible, "Celigo AI Not Visible for Edit Branching");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    //IMPORT_FILTER C110835
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.INPUT_FILTER);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    //Verify Celigo AI are in collapsed state. 
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-disabled', 'true');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
      "Celigo AI is not displayed"
    )
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_LIST_DROPDOWN_ID);
    await io.flowBuilder.clickByTextByIndex("Branching script", 1);
    await io.flowBuilder.clickByText('Celigo AI');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    )
    //Verify Celigo AI are in expand state. 
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'true');
    const explainImportFilterDisabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION);
    expect(await explainImportFilterDisabled[0].getAttribute('class')).toContain('Mui-disabled'); 
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'write js code to give current time');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR,
      "Celigo AI Prompt Thinking is not displayed"
    )
    await exportFilter.waitFor({ state: 'visible', timeout: 30000 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
    //IMPORT_TRANSFORMATION
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
    await io.flowBuilder.click(selectors.basePagePO.RESPONSETRANSFORMATION);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    //Verify Celigo AI are in collapsed state. 
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-disabled', 'true');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
      "Celigo AI is not displayed"
    )
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_LIST_DROPDOWN_ID);
    await io.flowBuilder.clickByTextByIndex("Branching script", 1);
    await io.flowBuilder.clickByText('Celigo AI');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    )
    //Verify Celigo AI are in expand state. 
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'true');
    const explainImportDisabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION);
    expect(await explainImportDisabled[0].getAttribute('class')).toContain('Mui-disabled'); 
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'write js code to give current time');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR,
      "Celigo AI Prompt Thinking is not displayed"
    )
    await exportFunction.waitFor({ state: 'visible', timeout: 30000 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
    
    //IMPORT_HOOK
    //PREMAP C110848
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPT_ID, 0);
    await io.flowBuilder.clickByIndex(selectors.basePagePO.MENU_ITEM, 1);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR, 0);
    //Verify Celigo AI are in collapsed state. 
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'false');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
      "Celigo AI is not displayed"
    );
    await io.flowBuilder.clickByText('Celigo AI');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    );
    //Verify Celigo AI are in expand state. 
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'true');
    const explainImportPremapDisabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION);
    expect(await explainImportPremapDisabled[0].getAttribute('class')).toContain('Mui-disabled');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'Get testmode');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR,
      "Celigo AI Prompt Thinking is not displayed"
    )
    const importPreHook = page.getByText('function preMap');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.JAVASCRIPT_PANEL);
      while (!(await importPreHook.isVisible())) {
          await page.mouse.wheel(0, 600);
      }
    await importPreHook.waitFor({ state: 'visible', timeout: 30000 });
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER,1);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);

    //POSTMAP C111471
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPT_ID, 1);
    await io.flowBuilder.clickByIndex(selectors.basePagePO.MENU_ITEM, 2);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR, 1);
    //Verify Celigo AI are in collapsed state. 
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'false');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
      "Celigo AI is not displayed"
    );
    await io.flowBuilder.clickByText('Celigo AI');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    );
    //Verify Celigo AI are in expand state. 
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'true');
    const explainImportPostmapDisabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION);
    expect(await explainImportPostmapDisabled[0].getAttribute('class')).toContain('Mui-disabled');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'Get testmode');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    const importPostHook = page.getByText('function postMap');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.JAVASCRIPT_PANEL);
    while (!(await importPostHook.isVisible())) {
        await page.mouse.wheel(0, 600);
    }
    await importPostHook.waitFor({ state: 'visible', timeout: 30000 });
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER,1);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);

    //POSTSUBMIT C110847
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPT_ID, 2);
    await io.flowBuilder.clickByIndex(selectors.basePagePO.MENU_ITEM, 3);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR, 2);
    //Verify Celigo AI are in collapsed state. 
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'false');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
      "Celigo AI is not displayed"
    );
    await io.flowBuilder.clickByText('Celigo AI');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    );
    //Verify Celigo AI are in expand state. 
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'true');
    const explainImportPostSubmitDisabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION);
    expect(await explainImportPostSubmitDisabled[0].getAttribute('class')).toContain('Mui-disabled');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'Get testmode');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    const importPostSubmitHook = page.getByText('function postSubmit');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.JAVASCRIPT_PANEL);
    while (!(await importPostSubmitHook.isVisible())) {
        await page.mouse.wheel(0, 600);
    }
    await importPostSubmitHook.waitFor({ state: 'visible', timeout: 30000 });
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER,1);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
    //IMPORT_POST_RESPONSE C110845
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.POST_RESPONSE_MAP_HOOK);
     //Verify Celigo AI are in collapsed state. 
     await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'false');
     await io.assert.verifyElementIsDisplayed(
       selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
       "Celigo AI is not displayed"
     )
     await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_LIST_DROPDOWN_ID);
     await io.flowBuilder.clickByTextByIndex("Branching script", 1);
     await io.flowBuilder.clickByText('Celigo AI');
     await io.assert.verifyElementIsDisplayed(
       selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
       "Celigo AI Placeholder is not displayed"
     )
     //Verify Celigo AI are in expand state. 
     await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'true');
     const explainImportPostResponseDisabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION);
    expect(await explainImportPostResponseDisabled[0].getAttribute('class')).toContain('Mui-disabled');  
     await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'write js code to give current time');
     await io.flowBuilder.loadingTime();
     await page.keyboard.press('Enter');
     await io.assert.verifyElementIsDisplayed(
       selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR,
       "Celigo AI Prompt Thinking is not displayed"
     )
     const importPostResponseMap = page.getByText('function postResponseMap');
     while (!(await importPostResponseMap.isVisible())) {
      await page.mouse.wheel(0, 600);
     }
     await importPostResponseMap.waitFor({ state: 'visible', timeout: 30000 });
     await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
     await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
     //FTP
    //Post Aggregate Hook JS editor C110840
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPT_ID, 3);
    await io.flowBuilder.clickByIndex(selectors.basePagePO.MENU_ITEM, 4);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR, 3);
    //Verify Celigo AI are in collapsed state. 
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'false');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
      "Celigo AI is not displayed"
    );
    await io.flowBuilder.clickByText('Celigo AI');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    );
    //Verify Celigo AI are in expand state. 
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'true');
    const explainImportPostAggDisabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION);
    expect(await explainImportPostAggDisabled[0].getAttribute('class')).toContain('Mui-disabled');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'Get testmode');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR,
      "Celigo AI Prompt Thinking is not displayed"
    )
    const importPostAggHook = page.getByText('function postAggregate');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.JAVASCRIPT_PANEL);
      while (!(await importPostAggHook.isVisible())) {
          await page.mouse.wheel(0, 600);
      }
    await importPostAggHook.waitFor({ state: 'visible', timeout: 30000 });
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER,1);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);

     //PlayGround C110850
     await io.flowBuilder.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Tools", "Playground");
    await io.flowBuilder.waitForElementAttached(
      selectors.playgroundPO.HANDLEBARS_EDITOR
    );
    await io.flowBuilder.clickByText('Script editor');
    await io.flowBuilder.clickByText('Simple JSON record');
    //Verify Celigo AI are in collapsed state. 
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-disabled', 'true');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
      "Celigo AI is not displayed"
    )
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_LIST_DROPDOWN_ID);
    await io.flowBuilder.clickByTextByIndex("Branching script", 1);
    await io.flowBuilder.clickByText('Celigo AI');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    )
    //Verify Celigo AI are in expand state. 
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR)).toHaveAttribute('aria-expanded', 'true');  
    const explainPlaygroundDisabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION);
    expect(await explainPlaygroundDisabled[0].getAttribute('class')).toContain('Mui-disabled'); 
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.FUNCTION_NAME, 'function');
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'write js code to give current time');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.flowBuilder.loadingTime();
    const playgroundFunction = page.getByText('return').first();
    await playgroundFunction.waitFor({ state: 'visible', timeout: 30000 });
    
    //Check when function is blank or single space C113468
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.FUNCTION_NAME, ' ');
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'write js code to give current time');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.flowBuilder.loadingTime();
    const errorMsg = page.getByText('Enter the function for the Celigo AI to help you in writing the JS code.').first();
    await errorMsg.waitFor({ state: 'visible', timeout: 30000 });

    //Check not able to give prompt more than 1024 character C113467
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.FUNCTION_NAME, 'function');
    await io.flowBuilder.clickByText('Celigo AI');
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'Simply type the number of characters into the box that says "Enter Number" below the "Characters" box. Our characters to words converter will automatically update to give you a range of two numbers, a low estimate of words and a high estimate.Simply type the number of characters into the box that says "Enter Number" below the "Characters" box. Our characters to words converter will automatically update to give you a range of two numbers, a low estimate of words and a high estimate.Simply type the number of characters into the box that says "Enter Number" below the"Characters" box. Our characters to words converter will automatically update to give you a range of two numbers, a low estimate of words and a high estimate.Simply type the number of characters into the box that says "Enter Number" below the "Characters" box. Our characters to words converter will automatically update to give you a range of two numbers, a low estimate of words and a high estimate.Simply type the number of characters into the box tskds');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.flowBuilder.loadingTime();
    const charErrorMsg = page.getByText('The entered prompt exceeds the character limit. Please revise your prompt to be 1024 characters or fewer.').first();
    await charErrorMsg.waitFor({ state: 'visible', timeout: 30000 });
  });
});