import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C107742.json";

test.describe("TC_C107742_C107758_C107759_C107738_C107760_C107761_C107762_C107739_C107740", () => {
  let flowId;
  test.beforeEach(async ({ io, page }, testInfo) => {
    await test.step("Delete created tags", async () => { });
    const tags = await io.api.getCall("v1/tags");
    if (!tags) {
      return;
    }
    for (let tag of tags) {
      if (tag.tag.includes("TC_C107742")) {
        await io.api.deleteCall("v1/tags/" + tag._id);
      }
    }
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    await test.step("Delete created flows", async () => { });
    await io.api.deleteFlowsWithId([flowId]);

    await test.step("Delete created tags", async () => { });
    const tags = await io.api.getCall("v1/tags");
    if (!tags) {
      return;
    }
    for (let tag of tags) {
      if (tag.tag.includes("TC_C107742")) {
        await io.api.deleteCall("v1/tags/" + tag._id);
      }
    }
  });
  test("TC_C107742_C107758_C107759_C107738_C107760_C107761_C107762 @Env-All @Zephyr-IO-T24129 @Zephyr-IO-T24145 @Zephyr-IO-T24146 @Zephyr-IO-T24125 @Zephyr-IO-T24147 @Zephyr-IO-T24148 @Zephyr-IO-T24149", async ({ io, page }, testInfo) => {
    flowId = await io.createResourceFromAPI(TC, "FLOWS");
    await test.step("*** Created Flows :" + TC.name, async () => { });
    await io.homePage.loadingTime();
    //Run Flow
    await io.api.checkJobStatusFromAPI(TC.name, flowId,
      [0, 0, 5]
    );
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();

    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    const errorIcon = await page.locator(selectors.flowBuilderPagePO.ERROR_ICON).nth(1);
    await errorIcon.waitFor({ state: 'visible', timeout: 90000 });
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ERROR_ICON, 0);
    await io.homePage.loadingTime();

    await io.homePage.loadingTime();
    const errorTags = await page.$$(selectors.flowBuilderPagePO.ERROR_TAG);
    await errorTags[0].click();
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText("No errors selected.", "The empty message is not displayed.");
    await io.homePage.click(selectors.em2DotOLineGraphPO.CANCEL_BUTTON);
    await io.homePage.loadingTime();

    const errors = await page.$$(selectors.basePagePO.TABLE_ROWS);
    const lastErrorIndex = errors.length - 1;
    await errors[lastErrorIndex].click();
    const lastTagIndex = errorTags.length - 1;
    await errorTags[lastTagIndex].click();
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, "TC_C107742_tag1");
    await io.homePage.click(selectors.filterErrorTag.CREATE_TAG);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.APPLY_TAG);
    await io.homePage.loadingTime();

    const secondErrorIndex = errors.length - 2;
    await errors[secondErrorIndex].click();
    await errorTags[lastTagIndex].click();
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, "TC_C107742_tag2");
    await io.homePage.click(selectors.filterErrorTag.CREATE_TAG);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.APPLY_TAG);
    await io.homePage.loadingTime();

    const thirdErrorIndex = errors.length - 3;
    await errors[thirdErrorIndex].click();
    await errorTags[lastTagIndex].click();
    await io.homePage.loadingTime();

    const selectTags = await page.$$(selectors.filterErrorTag.SELECT_TAG);
    const editTags = await page.$$(selectors.filterErrorTag.EDIT_TAG);
    for (let i = 0; i < editTags.length; i++) {
      const text = await editTags[i].textContent();
      if (text.includes("TC_C107742_tag")) {
        await selectTags[i].click();
        await io.homePage.loadingTime();
      }
    }
    await io.homePage.click(selectors.flowBuilderPagePO.APPLY_TAG);
    await io.homePage.loadingTime();

    await errorTags[0].click();
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText("No errors selected.", "The empty message is not displayed.");
    await io.homePage.click(selectors.em2DotOLineGraphPO.CANCEL_BUTTON);
    await io.homePage.loadingTime();

    const selectErrors = await page.$$(selectors.flowBuilderPagePO.EM2DOT0PO.ADD_TO_BATCH_HOVER_LABEL);

    const selectLastErrorIndex = selectErrors.length - 2;
    await selectErrors[selectLastErrorIndex].click();
    await io.homePage.loadingTime();
    await errorTags[0].click();
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText("1 error selected", "The error count is not displayed.");
    await io.homePage.click(selectors.em2DotOLineGraphPO.CANCEL_BUTTON);
    await io.homePage.loadingTime();

    const selectSecondLastErrorIndex = selectErrors.length - 3;
    await selectErrors[selectSecondLastErrorIndex].click();
    await io.homePage.loadingTime();

    const selectThirdLastErrorIndex = selectErrors.length - 4;
    await selectErrors[selectThirdLastErrorIndex].click();
    await io.homePage.loadingTime();

    await errorTags[0].click();
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText("3 errors selected", "The error count is not displayed.");

    await io.homePage.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ERROR_ICON, 0);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.filterErrorTag.ARIALABELFILTERERROR);
    await io.homePage.loadingTime();

    const filterErrorTags = await page.$$(selectors.filterErrorTag.FILTER_BY_TAG);
    const editTags2 = await page.$$(selectors.filterErrorTag.EDIT_TAG);
    for (let i = 0; i < editTags2.length; i++) {
      const text = await editTags2[i].textContent();
      if (text.includes("TC_C107742_tag")) {
        await filterErrorTags[i].click();
        await io.homePage.loadingTime();
      }
    }
    await io.homePage.click(selectors.flowBuilderPagePO.APPLY_TAG);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();

    const errorsAfterFilter = await page.$$(selectors.basePagePO.TABLE_ROWS);

    const lastErrorIndexAfterFilter = errorsAfterFilter.length - 1;
    const lastErrorTextContent = await errorsAfterFilter[lastErrorIndexAfterFilter].textContent();
    const isTagAvailableOnLastError = lastErrorTextContent.includes("TC_C107742_tag1");
    await io.assert.expectToBeTrue(isTagAvailableOnLastError, "Tag is not available on the error.");

    const secondLastErrorIndexAfterFilter = errorsAfterFilter.length - 2;
    const secondLastErrorTextContent = await errorsAfterFilter[secondLastErrorIndexAfterFilter].textContent();
    const isTagAvailableOnSecondLastError = secondLastErrorTextContent.includes("TC_C107742_tag2");
    await io.assert.expectToBeTrue(isTagAvailableOnSecondLastError, "Tag is not available on the error.");

    const thirdLastErrorIndexAfterFilter = errorsAfterFilter.length - 3;
    const thirdLastErrorTextContent = await errorsAfterFilter[thirdLastErrorIndexAfterFilter].textContent();
    const areTagsAvailableOnThirdLastError = thirdLastErrorTextContent.includes("TC_C107742_tag1") && thirdLastErrorTextContent.includes("TC_C107742_tag2");
    await io.assert.expectToBeTrue(areTagsAvailableOnThirdLastError, "Tags are not available on the error.");

    await io.homePage.click(selectors.filterErrorTag.ARIALABELFILTERERROR);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.filterErrorTag.CLEARTAGSSELECTOR);
    await io.homePage.loadingTime();
  });
});
