import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/C108586.json";

test.describe("TC_C108586 Verify any beginning and trailing spaces are truncated and spaces between word names are allowed while creating tag name", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });

  test("@Zephyr-IO-T26353 @Env-All C108586 Verify any beginning and trailing spaces are truncated and spaces between word names are allowed while creating tag name", async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(flow, "FLOWS");
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + id
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    let errors = page.locator(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await errors.waitFor({state: 'visible', timeout: 500000});
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.hover(selectors.dashboardPagePO.FA_FILTER_CHECKBOX, 1);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ERROR_TAG, 1);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.CREATE_NEW_TAG_INPUT);
    await io.flowBuilder.fill(selectors.em2DotOLineGraphPO.CREATE_NEW_TAG_INPUT, "Urgent");
    await io.flowBuilder.clickByIndex(selectors.em2DotOLineGraphPO.CREATE_NEW_TAG, 0);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.CREATE_NEW_TAG_INPUT);
    await io.flowBuilder.fill(selectors.em2DotOLineGraphPO.CREATE_NEW_TAG_INPUT, "Urgent Priority");
    await io.flowBuilder.clickByIndex(selectors.em2DotOLineGraphPO.CREATE_NEW_TAG, 0);
    let tagsList = [];
    let tagsList1 = page.locator(selectors.importPagePO.EDIT_TAG);
    let tagsListCount = await tagsList1.count();
    for (let index = 0; index < tagsListCount; index++) { 
        tagsList.push(await tagsList1.nth(index).innerText());
    }
    await io.assert.expectToBeTrue(tagsList.includes("Urgent"), 'Urgent tag is not included');
    await io.assert.expectToBeTrue(tagsList.includes("Urgent Priority"), 'Urgent Priority Tag is not included');
    });
});