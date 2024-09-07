
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C107721.json";
import TC2 from "@testData/STANDALONE/TC_C107721_2.json";

test.describe("TC_C107721", () => {
  let flowId, flowId2;
  test.beforeEach(async ({ io, page }, testInfo) => {
    await test.step("Delete created tags", async () => { });
    const tags = await io.api.getCall("v1/tags");
    if (!tags) {
      return;
    }
    for (let tag of tags) {
      if (tag.tag.includes("Tag@1")) {
        await io.api.deleteCall("v1/tags/" + tag._id);
      }
    }
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    await test.step("Delete created flows", async () => { });
    await io.api.deleteFlowsWithId([flowId, flowId2]);

    await test.step("Delete created tags", async () => { });
    const tags = await io.api.getCall("v1/tags");
    if (!tags) {
      return;
    }
    for (let tag of tags) {
      if (tag.tag.includes("Tag@1")) {
        await io.api.deleteCall("v1/tags/" + tag._id);
      }
    }
  });
  test("tag error @Zephyr-IO-T24108 @Env-All", async ({ io, page }, testInfo) => {
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
    const errorTag = await page.$$(selectors.flowBuilderPagePO.ERROR_TAG)
    const lastErrorTagIndex = errorTag.length - 2;
    await errorTag[lastErrorTagIndex].hover();
    await io.homePage.loadingTime();
    await errorTag[lastErrorTagIndex].click();
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, "Tag@1");
    await io.homePage.click(selectors.filterErrorTag.CREATE_TAG);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.loadingTime();

    test.step("*** Verify error tag is available for account level ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    flowId2 = await io.createResourceFromAPI(TC2, "FLOWS");
    await test.step("*** Created Flows :" + TC2.name, async () => { });
    await io.homePage.loadingTime();
    //Run Flow
    await io.api.checkJobStatusFromAPI(TC2.name, flowId2, [0, 0, 5]);
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();

    await io.flowBuilder.navigateToTheFlow(flowId2);
    await io.homePage.loadingTime();
    await page.waitForTimeout(5000);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ERROR_ICON, 0);
    await io.homePage.loadingTime();

    const errors2 = await page.$$(selectors.basePagePO.TABLE_ROWS);
    const lastErrorIndex2 = errors2.length - 1;
    await errors2[lastErrorIndex2].click();
    const errorTag2 = await page.$$(selectors.flowBuilderPagePO.ERROR_TAG)
    const lastErrorTagIndex2 = errorTag2.length - 2;
    await errorTag2[lastErrorTagIndex2].hover();
    await io.homePage.loadingTime();
    await errorTag2[lastErrorTagIndex2].click();
    await io.homePage.loadingTime();
    const deleteTagAvailable = await io.flowBuilder.isVisible(selectors.filterErrorTag.DELETE_TAG1);
    await io.assert.expectToBeTrue(deleteTagAvailable, "Tag is not available");

    await (await page.locator(selectors.filterErrorTag.DELETE_TAG1)).hover();
    await io.homePage.loadingTime();
    await page.locator(selectors.filterErrorTag.DELETE_TAG1).click();
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);

    await io.flowBuilder.loadingTime();
  });
});
