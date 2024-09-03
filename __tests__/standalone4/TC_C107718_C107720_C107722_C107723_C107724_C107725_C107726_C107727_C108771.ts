
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C107718.json";


test.describe("TC_C107718_C107720_C107722_C107723_C107724_C107725_C107726_C107727_C108771", () => {
  let flowId;
  test.beforeEach(async ({ io, page }, testInfo) => {
    await test.step("Delete created tags", async () => { });
    const tags = await io.api.getCall("v1/tags");
    if (!tags) {
      return;
    }
    for (let tag of tags) {
      if (tag.tag.includes("TC_C107718")) {
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
      if (tag.tag.includes("TC_C107718")) {
        await io.api.deleteCall("v1/tags/" + tag._id);
      }
    }
  });
  test("tag error @Zephyr-IO-T24105 @Zephyr-IO-T24107 @Zephyr-IO-T24109 @Zephyr-IO-T24110 @Zephyr-IO-T24111 @Zephyr-IO-T24112 @Zephyr-IO-T24113 @Zephyr-IO-T24114 @Env-All", async ({ io, page }, testInfo) => {
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

    // C107718 - Verify user is able to create error tag on error
    // C107722 - Verify different options to add tags on errors from the top panel for batch tags, from an error row (on hover), from a tag pill and and from the error details
    const errors = await page.$$(selectors.basePagePO.TABLE_ROWS);
    const lastErrorIndex = errors.length - 1;
    await errors[lastErrorIndex].click();
    const errorTag = await page.$$(selectors.flowBuilderPagePO.ERROR_TAG)
    const lastErrorTagIndex = errorTag.length - 2;
    await errorTag[lastErrorTagIndex].hover();
    await io.homePage.loadingTime();
    await errorTag[lastErrorTagIndex].click();
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, "TC_C107718_new");
    await io.homePage.click(selectors.filterErrorTag.CREATE_TAG);
    let x = await page.$$(selectors.flowBuilderPagePO.ERROR_TAG);
    let lastTagIndex = x.length - 1;
    const lastTag = (await page.$$(selectors.flowBuilderPagePO.ERROR_TAG))[lastTagIndex];
    await lastTag.click();
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, "TC_C107718_tagnew");
    await io.homePage.click(selectors.filterErrorTag.CREATE_TAG);

    // C107726 - Verify user is able to rename tag under Errors tab
    const editTags = await page.$$(selectors.filterErrorTag.EDIT_TAG);
    let editableTag;
    for (let tag of editTags) {
      let tagValue = await tag.textContent();
      if (tagValue.includes("TC_C107718_new")) {
        editableTag = tag;
        break;
      }
    }
    await editableTag.click();
    await io.homePage.loadingTime();
    await page.keyboard.type("1");
    await page.keyboard.press("Enter");

    // C107723 - Verify user is able to create error tag of less than equals 100characters on error
    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, "TC_C107718_111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111");
    await io.homePage.click(selectors.filterErrorTag.CREATE_TAG);
    await io.homePage.loadingTime();
    const longTagMessage = "The maximum size of the field: tag in the Tag document should be 100 characters.";
    var result = await io.homePage.getTextFromElement(
      selectors.basePagePO.NOTIFICATION_ID,
      longTagMessage
    );
    await io.assert.expectToBeTrue(result, "The error message for long input is not displayed");

    // C107725 - Verify truncated error tag is displayed when tag name covered the 200px width (more or less than than 27 characters)
    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, "TC_C107718_2345678901234567890123");
    await io.homePage.click(selectors.filterErrorTag.CREATE_TAG);
    await io.homePage.loadingTime();

    const element = (await page.$$(selectors.filterErrorTag.EDIT_TAG))[0];
    let value = await element.textContent();
    await io.assert.expectToContainValue("...", String(value), "");
    test.step("*** verified tag with 200px has '...' ***", async () => { });

    // C107724 - Verify user is not able to create empty(blank) tag
    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, " ");
    let createEmptyTag = await io.homePage.isVisible(selectors.filterErrorTag.CREATE_TAG);
    await io.assert.expectToBeFalse(createEmptyTag, "");

    // C107727 - Verify user is able to Clear tag under Errors tab
    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, "TC_C107718_tagapply");
    await io.homePage.click(selectors.filterErrorTag.CREATE_TAG);
    await io.homePage.click(selectors.flowBuilderPagePO.APPLY_TAG);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();

    await errors[lastErrorIndex].click();
    await errorTag[lastErrorTagIndex].hover();
    await io.homePage.loadingTime();
    await errorTag[lastErrorTagIndex].click();
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.filterErrorTag.CLEARTAGSSELECTOR);

    // // C107720 - Verify user is NOT able to create duplicate error tag on error
    await lastTag.click();
    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, "TC_C107718_tagapply");
    await io.homePage.click(selectors.filterErrorTag.CREATE_TAG);
    await io.homePage.loadingTime();
    const createDuplicateTagMessage = "A tag with this name already exists.";
    var result = await io.homePage.getTextFromElement(
      selectors.basePagePO.NOTIFICATION_ID,
      createDuplicateTagMessage
    );
    await io.assert.expectToBeTrue(result, "The error message for creating duplicate tag name is not displayed");
    await io.homePage.loadingTime();

    // C108771 - Verify user is not able to rename the tag name with existing tag name
    const editTags2 = await page.$$(selectors.filterErrorTag.EDIT_TAG);
    for (let tag of editTags2) {
      let tagValue = await tag.textContent();
      if (tagValue.includes("TC_C107718_new1")) {
        editableTag = tag;
        break;
      }
    }
    await editableTag.click();
    await io.homePage.loadingTime();
    var platform = process.platform;
    if (platform.toUpperCase().indexOf("DARWIN") > -1) {
      await page.keyboard.down("Meta");
      await page.keyboard.press("A");
      await page.keyboard.up("Meta");
      await page.keyboard.press("Delete");
    } else {
      await page.keyboard.down("Control");
      await page.keyboard.press("A");
      await page.keyboard.up("Control");
      await page.keyboard.press("Delete");
    }
    await page.keyboard.type("TC_C107718_tagnew");
    await page.keyboard.press("Enter");
    await io.homePage.loadingTime();
    var result = await io.homePage.getTextFromElement(
      selectors.basePagePO.NOTIFICATION_ID,
      createDuplicateTagMessage
    );
    await io.assert.expectToBeTrue(result, "The error message for renaming duplicate tag name is not displayed");
  });
});
