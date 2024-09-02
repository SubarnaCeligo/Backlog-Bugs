
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C107736.json";


test.describe("TC_C107737", () => {
  let flowId;
  test.beforeEach(async ({ io, page }, testInfo) => {
    await test.step("Delete created tags", async () => { });
    const tags = await io.api.getCall("v1/tags");
    if (!tags) {
      return;
    }
    for (let tag of tags) {
      if (tag.tag.includes("TC_C107737")) {
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
      if (tag.tag.includes("TC_C107737")) {
        await io.api.deleteCall("v1/tags/" + tag._id);
      }
    }
  });
  test("TC_C107737 @Zephyr-IO-T24124 @Env-All", async ({ io, page }, testInfo) => {
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

    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, "TC_C107737_tag");
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
      if (text === "TC_C107737_tag") {
        elementIndex = i;
      }
    }
    await selectTags[elementIndex].click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.APPLY_TAG);
    await io.homePage.loadingTime();

    const checkBoxes = await page.$$(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX);
    await checkBoxes[lastErrorTagIndex].click();
    await io.homePage.loadingTime();
    await checkBoxes[secondLastErrorTagIndex].click();
    await io.homePage.loadingTime();
    await errorTags[0].click();
    await io.homePage.loadingTime();

    // C107737 - Verify user is able to delete the common tag on Batch Errors
    const errors2 = await page.$$(selectors.basePagePO.TABLE_ROWS);
    const textContent = await errors2[secondLastErrorIndex].textContent();
    const isTagVisibleForSecondLastError = textContent.includes("TC_C107737_tag");
    await io.assert.expectToBeTrue(isTagVisibleForSecondLastError, "Tag is not visible");

    const textContent2 = await errors2[lastErrorIndex].textContent();
    const isTagVisibleForLastError = textContent2.includes("TC_C107737_tag");
    await io.assert.expectToBeTrue(isTagVisibleForLastError, "Tag is not visible");

    const selectTags2 = await page.$$(selectors.filterErrorTag.SELECT_TAG);
    const editTags3 = await page.$$(selectors.filterErrorTag.EDIT_TAG);
    for (let i = 0; i < editTags3.length; i++) {
      const text = await editTags3[i].textContent();
      if (text === "TC_C107737_tag") {
        elementIndex = i;
      }
    }
    await selectTags2[elementIndex].click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.APPLY_TAG);
    await io.homePage.loadingTime();

    const errors3 = await page.$$(selectors.basePagePO.TABLE_ROWS);
    const textContentAfterRemoval = await errors3[secondLastErrorIndex].textContent();
    const isTagVisibleForSecondLastErrorAfterRemoval = textContentAfterRemoval.includes("TC_C1077367_tag");
    await io.assert.expectToBeTrue(!isTagVisibleForSecondLastErrorAfterRemoval, "Tag is visible");

    const textContentAfterRemoval2 = await errors2[lastErrorIndex].textContent();
    const isTagVisibleForLastErrorAfterRemoval = textContentAfterRemoval2.includes("TC_C107737_tag");
    await io.assert.expectToBeTrue(!isTagVisibleForLastErrorAfterRemoval, "Tag is visible");
  });
});
