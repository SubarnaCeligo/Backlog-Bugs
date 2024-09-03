
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C107732.json";


test.describe("TC_C107732_C107733", () => {
  let flowId;
  test.beforeEach(async ({ io, page }, testInfo) => {
    await test.step("Delete created tags", async () => { });
    const tags = await io.api.getCall("v1/tags");
    if (!tags) {
      return;
    }
    for (let tag of tags) {
      if (tag.tag.includes("TC_C107732")) {
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
      if (tag.tag.includes("TC_C107732")) {
        await io.api.deleteCall("v1/tags/" + tag._id);
      }
    }
  });
  test("TC_C107732_C107733 @Zephyr-IO-T24119 @Zephyr-IO-T24120 @Env-All", async ({ io, page }, testInfo) => {
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

    // C107732 - Verify user is able to select maximum of 3 tags for an error
    const errors = await page.$$(selectors.basePagePO.TABLE_ROWS);
    const lastErrorIndex = errors.length - 1;
    await errors[lastErrorIndex].click();
    const errorTag = await page.$$(selectors.flowBuilderPagePO.ERROR_TAG)
    const lastTagIndex = errorTag.length - 1;
    await errorTag[lastTagIndex].hover();
    await io.homePage.loadingTime();
    await errorTag[lastTagIndex].click();
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, "TC_C107732_tag1");
    await io.homePage.click(selectors.filterErrorTag.CREATE_TAG);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, "TC_C107732_tag2");
    await io.homePage.click(selectors.filterErrorTag.CREATE_TAG);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, "TC_C107732_tag3");
    await io.homePage.click(selectors.filterErrorTag.CREATE_TAG);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.APPLY_TAG);
    await io.homePage.loadingTime();

    await errors[lastErrorIndex].click();
    await io.homePage.loadingTime();
    await errorTag[lastTagIndex].hover();
    await io.homePage.loadingTime();
    await errorTag[lastTagIndex].click();
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, "TC_C107732_tag4");
    await io.homePage.click(selectors.filterErrorTag.CREATE_TAG);
    await io.homePage.loadingTime();
    let applycheck = await page.locator(selectors.flowBuilderPagePO.APPLY_TAG);
    await expect(await applycheck.isEnabled()).toBeFalsy();

    // C107733 - Verify user is able to see the error
    const selectTags = await page.$$(selectors.filterErrorTag.SELECT_TAG);
    await selectTags[3].click();
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText("3 tag limit reached", "No error message displayed");
    await io.homePage.loadingTime();
  });
});
