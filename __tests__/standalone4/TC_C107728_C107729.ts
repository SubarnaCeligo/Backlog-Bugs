
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C107728.json";


test.describe("TC_C107728_C107729", () => {
  let flowId;
  test.beforeEach(async ({ io, page }, testInfo) => {
    await test.step("Delete created tags", async () => { });
    const tags = await io.api.getCall("v1/tags");
    if (!tags) {
      return;
    }
    for (let tag of tags) {
      if (tag.tag.includes("TC_C107728")) {
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
      if (tag.tag.includes("TC_C107728")) {
        await io.api.deleteCall("v1/tags/" + tag._id);
      }
    }
  });
  test("TC_C107728_C107729 @Zephyr-IO-T24115 @Zephyr-IO-T24116 @Env-All", async ({ io, page }, testInfo) => {
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

    await io.homePage.click(selectors.flowBuilderPagePO.RESOLVE_JOBS);
    await io.homePage.click(selectors.basePagePO.DATA_VALUE_ALL);
    await io.homePage.click(selectors.flowBuilderPagePO.RESOLVE);
    await io.homePage.loadingTime();

    await io.flowBuilder.click(selectors.flowBuilderPagePO.RESOLVED_ERRORS_TAB);
    await io.homePage.loadingTime();

    // C107728 - Verify tag error is displayed on the error in Resolved errors tab
    const errors = await page.$$(selectors.basePagePO.TABLE_ROWS);
    const lastErrorIndex = errors.length - 1;
    await errors[lastErrorIndex].click();
    await errors[lastErrorIndex].hover();
    const isTagVisible = await io.homePage.isVisible(selectors.flowBuilderPagePO.ERROR_TAG);
    await io.assert.expectToBeTrue(isTagVisible, "Tag is not visible");

    // C107729 - Verify user is able to rename tag under Resolved errors tab
    const errorTag = await page.$$(selectors.flowBuilderPagePO.ERROR_TAG)
    const lastErrorTagIndex = errorTag.length - 1;
    await errorTag[lastErrorTagIndex].hover();
    await io.homePage.loadingTime();
    await errorTag[lastErrorTagIndex].click();
    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, "TC_C107728_new");
    await io.homePage.click(selectors.filterErrorTag.CREATE_TAG);
    await io.homePage.loadingTime();

    const editTags = await page.$$(selectors.filterErrorTag.EDIT_TAG);
    let editableTag;
    for (let tag of editTags) {
      let tagValue = await tag.textContent();
      if (tagValue.includes("TC_C107728_")) {
        editableTag = tag;
        break;
      }
    }
    await editableTag.click();
    await io.homePage.loadingTime();
    await page.keyboard.type("1");
    await page.keyboard.press("Enter");
    await io.homePage.loadingTime();

    const editTags2 = await page.$$(selectors.filterErrorTag.EDIT_TAG);
    let element;
    for (let tag of editTags2) {
      let tagValue = await tag.textContent();
      if (tagValue.includes("TC_C107728_")) {
        element = tag;
        break;
      }
    }
    let value = await element.textContent();
    await io.assert.expectToContainValue("TC_C107728_new1", String(value), "");
    await io.homePage.loadingTime();
  });
});
