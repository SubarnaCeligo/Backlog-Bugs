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
    celigoAiGen.hover();
    await io.flowBuilder.loadingTime();
    const hoverText = page.getByText('Use these concise descriptions and summaries of workflows to understand intricate flow configurations and settings.').first();
    await hoverText.waitFor({ state: 'visible', timeout: 30000 });
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
   
    //scroll bar added for more than 5 lines in description
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.DESCRIPTION_DISPLAY);
    let FiveLinesDesc = "In a small town nestled between rolling hills and dense forests, there was a peculiar bookstore. This bookstore was unlike any other; it was said that the books inside could come to life. The shelves were filled with ancient tomes, each one telling stories of distant lands, forgotten legends, and mystical creatures. On quiet afternoons, the sound of rustling pages would fill the air, as if the books were whispering their secrets to each other. The townspeople often spoke of the bookstore in hushed tones, passing down tales of readers who had been so captivated by a story that they found themselves lost within its pages—literally.";
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.DESCRIPTION_INPUT, FiveLinesDesc);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.DESCRIPTION_SAVE);
    const descrInFlowupdated2 = page.getByText(FiveLinesDesc).first();
    await descrInFlowupdated2.waitFor({ state: 'visible', timeout: 30000 });
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click('[data-test="displayDescription"]');
    const hasVerticalScroll = await page.evaluate(() => { const element = document.querySelector('textarea:nth-child(1)'); return element.scrollHeight > element.clientHeight; });
    await page.mouse.wheel(0, 1500);
    
    await page.waitForTimeout(10000);
    await io.assert.expectToBeTrue(hasVerticalScroll)

  });
});