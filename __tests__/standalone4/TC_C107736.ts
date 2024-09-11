
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C107736.json";


test.describe("TC_C107736_C108712", () => {
  let flowId;
  test.beforeEach(async ({ io, page }, testInfo) => {
    await test.step("Delete created tags", async () => { });
    const tags = await io.api.getCall("v1/tags");
    if (!tags) {
      return;
    }
    for (let tag of tags) {
      if (tag.tag.includes("TC_C107736")) {
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
      if (tag.tag.includes("TC_C107736")) {
        await io.api.deleteCall("v1/tags/" + tag._id);
      }
    }
  });
  test("TC_C107736_C108712 @Zephyr-IO-T24123 @Zephyr-IO-T24154 @Env-All", async ({ io, page }, testInfo) => {
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
    await page.waitForTimeout(5000);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ERROR_ICON, 0);
    await io.homePage.loadingTime();

    const errors = await page.$$(selectors.basePagePO.TABLE_ROWS);
    const lastErrorIndex = errors.length - 1;
    await errors[lastErrorIndex].click();
    const errorTags = await page.$$(selectors.flowBuilderPagePO.ERROR_TAG)
    const lastErrorTagIndex = errorTags.length - 2;
    await errorTags[lastErrorTagIndex].hover();
    await io.homePage.loadingTime();
    await errorTags[lastErrorTagIndex].click();
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, "TC_C107736_tag");
    await io.homePage.click(selectors.filterErrorTag.CREATE_TAG);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.APPLY_TAG);
    await io.homePage.loadingTime();

    const secondLastErrorIndex = errors.length - 2;
    await errors[secondLastErrorIndex].click();
    const secondLastErrorTagIndex = errorTags.length - 3;
    await errorTags[secondLastErrorTagIndex].hover();
    await io.homePage.loadingTime();
    await errorTags[secondLastErrorTagIndex].click();
    await io.homePage.loadingTime();

    const selectTags = await page.$$(selectors.filterErrorTag.SELECT_TAG);
    const editTags = await page.$$(selectors.filterErrorTag.EDIT_TAG);
    let elementIndex;
    for (let i = 0; i < editTags.length; i++) {
      const text = await editTags[i].textContent();
      if (text === "TC_C107736_tag") {
        elementIndex = i;
      }
    }
    await selectTags[elementIndex].click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.APPLY_TAG);
    await io.homePage.loadingTime();

    const thirdLastErrorIndex = errors.length - 3;
    await errors[thirdLastErrorIndex].click();
    const thirdLastErrorTagIndex = errorTags.length - 4;
    await errorTags[thirdLastErrorTagIndex].hover();
    await io.homePage.loadingTime();
    await errorTags[thirdLastErrorTagIndex].click();
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, "TC_C107736_tag2");
    await io.homePage.click(selectors.filterErrorTag.CREATE_TAG);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.APPLY_TAG);
    await io.homePage.loadingTime();

    // C107736 - Verify user is able to see common tag on Batch Errors
    // C108712 - Verify user is able to batch tag errors with same tags or errors with different tags

    // When no errors are selected
    await errorTags[0].click();
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText("No errors selected.", "")

    // selecting 2 errors with same tags
    const checkBoxes = await page.$$(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX);
    await checkBoxes[lastErrorTagIndex].click();
    await io.homePage.loadingTime();
    await checkBoxes[secondLastErrorTagIndex].click();
    await io.homePage.loadingTime();
    await errorTags[0].click();
    await io.homePage.loadingTime();


    const editTags2 = await page.$$(selectors.filterErrorTag.EDIT_TAG);
    let element;
    for (let editTag of editTags2) {
      const text = await editTag.textContent();
      if (text.includes("TC_C107736_")) {
        element = editTag;
      }
    }
    const text = await element.textContent();
    await io.assert.expectToContainValue("TC_C107736_tag", String(text), "");
    await io.assert.verifyElementDisplayedByText("2 errors selected", "")
    await io.homePage.loadingTime();

    // selecting 2 errors with different tags
    await checkBoxes[lastErrorTagIndex].click();
    await io.homePage.loadingTime();
    await checkBoxes[thirdLastErrorTagIndex].click();
    await io.homePage.loadingTime();
    await errorTags[0].click();
    await io.homePage.loadingTime();

    await io.assert.verifyElementDisplayedByText("2 errors selected", "2 errors are not selected");
    // await io.assert.verifyElementDisplayedByText("Selecting tags here will replace the existing tags on all selected errors.", "Warninig message is not displayed");

    const selectTags2 = await page.$$(selectors.filterErrorTag.SELECT_TAG);
    const editTags3 = await page.$$(selectors.filterErrorTag.EDIT_TAG);
    for (let i = 0; i < editTags3.length; i++) {
      const text = await editTags3[i].textContent();
      if (text === "TC_C107736_tag2") {
        elementIndex = i;
      }
    }
    await selectTags2[elementIndex].click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.APPLY_TAG);
    await io.homePage.loadingTime();

    const errors2 = await page.$$(selectors.basePagePO.TABLE_ROWS);
    const textContent = await errors2[secondLastErrorIndex].textContent();
    const isTagVisibleForSecondLastError = textContent.includes("TC_C107736_tag2");
    await io.assert.expectToBeTrue(isTagVisibleForSecondLastError, "Tag is not visible");

    const textContent2 = await errors2[thirdLastErrorIndex].textContent();
    const isTagVisibleForThirdLastError = textContent2.includes("TC_C107736_tag2");
    await io.assert.expectToBeTrue(isTagVisibleForThirdLastError, "Tag is not visible");

    await io.homePage.loadingTime();
  });
});
