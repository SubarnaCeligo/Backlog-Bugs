
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C108585.json";


test.describe("TC_C108585", () => {
  let flowId;
  test.beforeEach(async ({ io, page }, testInfo) => {
    await test.step("Delete created tags", async () => { });
    const tags = await io.api.getCall("v1/tags");
    if (!tags) {
      return;
    }
    for (let tag of tags) {
      if (tag.tag.includes("TC_C108585")) {
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
      if (tag.tag.includes("TC_C108585")) {
        await io.api.deleteCall("v1/tags/" + tag._id);
      }
    }
  });
  test("TC_C108585 @Zephyr-IO-T24152 @Env-All", async ({ io, page }, testInfo) => {
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

    // C108585 - Verify any beginning and trailing spaces are truncated and spaces between word names are allowed while creating tag name
    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, "  TC_C108585_tag  ");
    await io.homePage.click(selectors.filterErrorTag.CREATE_TAG);
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, "TC_C108585_new tag");
    await io.homePage.click(selectors.filterErrorTag.CREATE_TAG);
    await io.homePage.loadingTime();

    const editTags = await page.$$(selectors.filterErrorTag.EDIT_TAG);
    let element;
    for (let tag of editTags) {
      let tagValue = await tag.textContent();
      if (tagValue === "TC_C108585_tag") {
        element = tag;
        break;
      }
    }
    let value = await element.textContent();
    await io.assert.expectToContainValue("TC_C108585_tag", String(value), "");

    for (let tag of editTags) {
      let tagValue = await tag.textContent();
      if (tagValue.includes("TC_C108585_new")) {
        element = tag;
        break;
      }
    }
    value = await element.textContent();
    await io.assert.expectToContainValue("TC_C108585_new tag", String(value), "");
  });
});
