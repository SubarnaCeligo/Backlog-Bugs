import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testMode from "@testData/FlowDebugger/IO-41074.json";

test.describe("IO-41074", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All IO-41074", async ({ io, page }) => {
    //C106907	C106908	C106909	C106910	C106939	C107003
    const id = await io.createResourceFromAPI(testMode, "FLOWS");
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.EXPORT_HOOK
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK);
    await io.flowBuilder.click(selectors.basePagePO.SCRIPT_DEBUGGER_SELECTOR)
    await io.flowBuilder.clickByTextByIndex("Branching script", 1)
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR
    );
    const expectedText =
      "'testMode' - Boolean flag that executes script only on test mode";
    await io.flowBuilder.waitForElementAttached(
      selectors.scriptsPO.AFE_INPUT_FIELD
    );
    await io.assert.verifyElementContainsText(
      selectors.scriptsPO.AFE_INPUT_FIELD,
      expectedText
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.flowBuilder.waitForElementAttached(
      selectors.scriptsPO.AFE_PREVIEW_FIELD
    );
    await io.assert.verifyElementContainsText(
      selectors.scriptsPO.AFE_PREVIEW_FIELD,
      '"testMode"'
    );
    await io.assert.verifyElementContainsText(
      selectors.scriptsPO.AFE_PREVIEW_FIELD,
      ": "
    );
    await io.assert.verifyElementContainsText(
      selectors.scriptsPO.AFE_PREVIEW_FIELD,
      '"false"'
    );
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER,
      1
    );
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER,
      0
    );

    // preMap
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS,
      1
    );
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR,
      0
    );
    await io.flowBuilder.waitForElementAttached(
      selectors.scriptsPO.AFE_INPUT_FIELD
    );
    await io.assert.verifyElementContainsText(
      selectors.scriptsPO.AFE_INPUT_FIELD,
      expectedText
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.flowBuilder.waitForElementAttached(
      selectors.scriptsPO.AFE_PREVIEW_FIELD
    );
    await io.assert.verifyElementContainsText(
      selectors.scriptsPO.AFE_PREVIEW_FIELD,
      '"testMode"'
    );
    await io.assert.verifyElementContainsText(
      selectors.scriptsPO.AFE_PREVIEW_FIELD,
      ": "
    );
    await io.assert.verifyElementContainsText(
      selectors.scriptsPO.AFE_PREVIEW_FIELD,
      '"false"'
    );
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER,
      1
    );

    // postMap
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR,
      1
    );
    await io.flowBuilder.waitForElementAttached(
      selectors.scriptsPO.AFE_INPUT_FIELD
    );
    await io.assert.verifyElementContainsText(
      selectors.scriptsPO.AFE_INPUT_FIELD,
      expectedText
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.flowBuilder.waitForElementAttached(
      selectors.scriptsPO.AFE_PREVIEW_FIELD
    );
    await io.assert.verifyElementContainsText(
      selectors.scriptsPO.AFE_PREVIEW_FIELD,
      '"testMode"'
    );
    await io.assert.verifyElementContainsText(
      selectors.scriptsPO.AFE_PREVIEW_FIELD,
      ": "
    );
    await io.assert.verifyElementContainsText(
      selectors.scriptsPO.AFE_PREVIEW_FIELD,
      '"false"'
    );
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER,
      1
    );

    // postSubmit
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR,
      2
    );
    await io.flowBuilder.waitForElementAttached(
      selectors.scriptsPO.AFE_INPUT_FIELD
    );
    await io.assert.verifyElementContainsText(
      selectors.scriptsPO.AFE_INPUT_FIELD,
      expectedText
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.flowBuilder.waitForElementAttached(
      selectors.scriptsPO.AFE_PREVIEW_FIELD
    );
    await io.assert.verifyElementContainsText(
      selectors.scriptsPO.AFE_PREVIEW_FIELD,
      '"testMode"'
    );
    await io.assert.verifyElementContainsText(
      selectors.scriptsPO.AFE_PREVIEW_FIELD,
      ": "
    );
    await io.assert.verifyElementContainsText(
      selectors.scriptsPO.AFE_PREVIEW_FIELD,
      '"false"'
    );
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER,
      1
    );
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER,
      0
    );

    //postResponseMap
    await io.flowBuilder.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.POST_RESPONSE_MAP_HOOK
    );
    await io.flowBuilder.click(selectors.scriptsPO.ADD_SCRIPT);
    await io.flowBuilder.click(selectors.scriptsPO.EXPAND);
    await io.flowBuilder.waitForElementAttached(
      selectors.scriptsPO.POSTRESPONSE_INPUT_FIELD
    );
    await io.assert.verifyElementContainsText(
      selectors.scriptsPO.POSTRESPONSE_INPUT_FIELD,
      expectedText
    );
  });
});
