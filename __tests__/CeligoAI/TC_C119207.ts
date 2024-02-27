import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C117448 Verify Filter is having Celigo AI", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("C117448 Verify Filter is having Celigo AI", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.clickByText('Filter_DND');
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    //EXPORT_FILTER 
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
    //Verify Celigo AI are in collapsed state and disabled.
    // await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR,"aria-expanded","false");
    // const celigoAiDragbar = await page.locator('[style^="grid-area: dragBar"][style$="aiChatbot"]');
    const celigoAiDragbar = await page.locator('[style*="grid-area: dragBar_"][style*="_aiChatbot;"]');
    await expect(celigoAiDragbar).not.toBeVisible();
    await io.flowBuilder.clickByText('Celigo AI');
    const celigoAiWindow = await page.locator('[style="grid-area: chat;"]');
    const clientHeight = await celigoAiWindow.evaluate(node => node.clientHeight);
    expect(clientHeight).toBeLessThan(200);
    await io.assert.verifyElementIsDisplayed('[style*="aiChatbot"]', "Celigo AI dragbar is not displayed")

    // const h = await page.locator('[style*="grid-area: dragBar_v_0;"]');
    await celigoAiDragbar.hover();
    await page.mouse.down();
    await page.mouse.move(0, 10, { steps: 10 }); // Move mouse 100 pixels up
    await page.mouse.up();

    await celigoAiDragbar.hover();
    await page.mouse.down();
    await page.mouse.move(0, 10, { steps: 10 }); // Move mouse 100 pixels up
    await page.mouse.up();

    await io.flowBuilder.clickByText("JavaScript");
    
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_LIST_DROPDOWN_ID);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.type('test');

    await (page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR).nth(-1)).click();
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,"placeholder","Tell me about your function here... I will apply your request to the existing function unless you tell me to replace it");

    await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_LIST_DROPDOWN_ID);
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');

    const resetButton = await page.$(selectors.flowBuilderPagePO.OPENAI.RESET_CONVERSATION);
    expect(await resetButton.getAttribute('class')).toContain('Mui-disabled');
    // test
  });
});