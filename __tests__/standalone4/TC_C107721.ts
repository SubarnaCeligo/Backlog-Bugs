
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C107721", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    io.homePage.loadingTime();
  });
  test("tag error @Zephyr-IO-T24108 @Env-All", async ({ io, page }, testInfo) => {
    test.step("*** Navigating to flowpage ***", async ()=>{});
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Tags2_DND');
    await io.flowBuilder.waitForElementAttached(':has-text("addTags2_DND")');
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ERROR_ICON, 1);
    await io.homePage.loadingTime();

    const errors = await page.$$(selectors.basePagePO.TABLE_ROWS);
    await errors[1].click();
    const errorTag = await page.$$(selectors.flowBuilderPagePO.ERROR_TAG)
    await errorTag[1].hover();
    await io.homePage.loadingTime();
    await errorTag[1].click();
    await io.homePage.fillWebPage(selectors.filterErrorTag.NEW_TAG_FIELD, "Tag@1");
    await io.homePage.click(selectors.filterErrorTag.CREATE_TAG);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.loadingTime();

    test.step("*** Verify error tag is available for account level ***", async () => { });
    await io.flowBuilder.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Tags_DND');
    await io.flowBuilder.waitForElementAttached(':has-text("addTags_DND")');
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ERROR_ICON, 1);
    await io.homePage.loadingTime();

    const errors2 = await page.$$(selectors.basePagePO.TABLE_ROWS);
    await errors2[1].click();
    const errorTag2 = await page.$$(selectors.flowBuilderPagePO.ERROR_TAG)
    await errorTag2[1].hover();
    await io.homePage.loadingTime();
    await errorTag2[1].click();
    const deleteTagAvailable = await io.flowBuilder.isVisible(selectors.filterErrorTag.DELETE_TAG1);
    await io.assert.expectToBeTrue(deleteTagAvailable, "Tag is not available");

    await (await page.locator(selectors.filterErrorTag.DELETE_TAG1)).hover();
    await io.homePage.loadingTime();
    await page.locator(selectors.filterErrorTag.DELETE_TAG1).click();
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);

    await io.flowBuilder.loadingTime();
  });
});
