import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data1 from "@testData/ScriptDebugger/T32495.json"
test.describe('@Author-Vikram Verify whether Function stubs data displayed on the My API tab.', () => {
    test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.clickByText("Resources")
    await io.homePage.clickByText("My APIs")
    await io.flowBuilder.clickByText("Create My API");
    await io.flowBuilder.fill(selectors.importPagePO.NAME, "test");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HOOK_TYPE_SCRIPT_OPTION);
    await io.flowBuilder.fill(selectors.importPagePO.NAME, "mockscript");
    await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
  });
  test('@Env-All @Zephyr-IO-T32495 @Epic-IO-45180 Branching', async ({
    io,
    page
  }) => {
    await io.homePage.clickByText('Branching')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.Branching.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('@Env-All @Zephyr-IO-T32496 @Epic-IO-45180 Content based flow router', async ({
    io,
    page
  }) => {
    await io.homePage.clickByText('Content based flow router')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.ContentBasedFlowRouter.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('@Env-All @Zephyr-IO-T32497 @Epic-IO-45180 Filter', async ({
    io,
    page
  }) => {
    await io.homePage.clickByText('Filter')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.Filter.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('@Env-All @Zephyr-IO-T32498 @Epic-IO-45180 Form init', async ({
    io,
    page
  }) => {
    await io.homePage.clickByText('Form init')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.FormInit.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('@Env-All @Zephyr-IO-T32499 @Epic-IO-45180 Handle request', async ({
    io,
    page
  }) => {
    await io.homePage.clickByText('Handle request')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.HandleRequest.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('@Env-All @Zephyr-IO-T32500 @Epic-IO-45180 Post aggregate', async ({
    io,
    page
  }) => {
    await io.homePage.clickByText('Post aggregate')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.PostAggregate.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('@Env-All @Zephyr-IO-T32503 @Epic-IO-45180 Post map', async ({
    io,
    page
  }) => {
    await io.homePage.clickByText('Post map')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.PostMap.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('@Env-All @Zephyr-IO-T32504 @Epic-IO-45180 Post response map', async ({
    io,
    page
  }) => {
    await io.homePage.clickByText('Post response map')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.PostResponseMap.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('@Env-All @Zephyr-IO-T32506 @Epic-IO-45180 Post submit', async ({
    io,
    page
  }) => {
    await io.flowBuilder.selectTextfromDropDown(page, "postSubmit");
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.PostSubmit.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('@Env-All @Zephyr-IO-T32507 @Epic-IO-45180 Pre map', async ({
    io,
    page
  }) => {
    await io.homePage.selectTextfromDropDown(page, 'preMap')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.PreMap.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('@Env-All @Zephyr-IO-T32508 @Epic-IO-45180 Presave page', async ({
    io,
    page
  }) => {
    await io.homePage.selectTextfromDropDown(page, 'preSavePage')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.PreSavePage.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('@Env-All @Zephyr-IO-T32509 @Epic-IO-45180 Transform', async ({
    io,
    page
  }) => {
    await io.homePage.selectTextfromDropDown(page, 'transform')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.Transform.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
});