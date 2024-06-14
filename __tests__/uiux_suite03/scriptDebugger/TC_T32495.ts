import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data1 from "@testData/ScriptDebugger/T32495.json"
test.describe('@Env-QA IO-T32495, IO-T32496, IO-T32497, IO-T32498, IO-T32499, IO-T32500, IO-T32503, IO-T32504, IO-T32508, IO-T32509 Verify whether Function stubs data displayed on the Script tab.', () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.clickByText("Resources")
    await io.homePage.clickByText("Scripts")
    await io.flowBuilder.clickByText("Create script");
    await io.flowBuilder.fill(selectors.importPagePO.NAME, "mockscript");
    await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
  });
  test('IO-T32495 Branching', async ({
    io,
    page
  }) => {
    await io.homePage.clickByText('Branching')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.Branching.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('IO-T32496 Content based flow router', async ({
    io,
    page
  }) => {
    await io.homePage.clickByText('Content based flow router')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.ContentBasedFlowRouter.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('IO-T32497 Filter', async ({
    io,
    page
  }) => {
    await io.homePage.clickByText('Filter')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.Filter.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('IO-T32498 Form init', async ({
    io,
    page
  }) => {
    await io.homePage.clickByText('Form init')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.FormInit.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('IO-T32499 Handle request', async ({
    io,
    page
  }) => {
    await io.homePage.clickByText('Handle request')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.HandleRequest.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('IO-T32500 Post aggregate', async ({
    io,
    page
  }) => {
    await io.homePage.clickByText('Post aggregate')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.PostAggregate.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('IO-T32503 Post map', async ({
    io,
    page
  }) => {
    await io.homePage.clickByText('Post map')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.PostMap.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('IO-T32504 Post response map', async ({
    io,
    page
  }) => {
    await io.homePage.clickByText('Post response map')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.PostResponseMap.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('IO-T32506 Post submit', async ({
    io,
    page
  }) => {
    await io.flowBuilder.selectTextfromDropDown(page, "postSubmit");
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.PostSubmit.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('IO-T32507 Pre map', async ({
    io,
    page
  }) => {
    await io.homePage.selectTextfromDropDown(page, 'preMap')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.PreMap.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('IO-T32508 Presave page', async ({
    io,
    page
  }) => {
    await io.homePage.selectTextfromDropDown(page, 'preSavePage')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.PreSavePage.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
  test('IO-T32509 Transform', async ({
    io,
    page
  }) => {
    await io.homePage.selectTextfromDropDown(page, 'transform')
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    const expectedText = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT); // The expected random
    await expect(expectedText.toString().trim().toLowerCase().replace(/\s/g, "")).toMatch(data1.Transform.toString().trim().toLowerCase().replace(/\s/g, ""));
  });
});