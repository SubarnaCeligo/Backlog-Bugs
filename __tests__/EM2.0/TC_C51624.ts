
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/EM2.0/TC_C20813.json";

test.describe("TC_C51646_C51624_C51651_C51659_C51670", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigating To Flow Page***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting Flow ***", async ()=>{});
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T19798 @Zephyr-IO-T19776 @Zephyr-IO-T19803 @Zephyr-IO-T19811 @Zephyr-IO-T19822 TC_C51646_C51624_C51651_C51659_C51670", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = flows.get(TC.name)["flowId"];
    await io.api.checkJobStatusFromAPI(
      TC.name,
      flowId,
      [5, 0, 5]
    );
    await io.em2.getEm2ErrorTable( flowId);
    await io.homePage.loadingTime();
    await io.homePage.delay(10000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);

    // C51646| Verify the presence and functionlaity of the "Select view" option in the New view
    await io.flowBuilderDashboard.changeErrorDrawerView();
    await io.homePage.click(selectors.myAccountPagePO.ERROR_CHECKBOX);
    (await page.$(selectors.flowBuilderPagePO.EM2DOT0PO.TOGGLE_VIEW_DROPDOWN)).waitForElementState("visible");
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.TOGGLE_VIEW_DROPDOWN);
    (await page.$(selectors.flowBuilderPagePO.SPLIT_VIEW_ERRORS)).waitForElementState("visible");
    await io.homePage.click(selectors.flowBuilderPagePO.SPLIT_VIEW_ERRORS);
    await io.flowBuilderDashboard.changeErrorDrawerView();

    // C51624| Verify by selecting one or more Checkboxes in the current view errors list and perform toggle to New view and then toggle back to Current View
    const checkboxes = await (
      await page.locator(selectors.myAccountPagePO.ERROR_CHECKBOX)
    ).nth(1).getAttribute("class");
    expect(checkboxes.includes("Mui-checked")).toBe(true);
    (await page.$(selectors.flowBuilderPagePO.EM2DOT0PO.TOGGLE_VIEW_DROPDOWN)).waitForElementState("visible");
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.TOGGLE_VIEW_DROPDOWN);
    (await page.$(selectors.flowBuilderPagePO.SPLIT_VIEW_ERRORS)).waitForElementState("visible");
    await io.homePage.click(selectors.flowBuilderPagePO.SPLIT_VIEW_ERRORS);

    //C51651| Verify the tooltip for "Error Check boxes "by hovering over
    const firstCheckbox = await page.$$(selectors.myAccountPagePO.ERROR_CHECKBOX);
    await firstCheckbox[1].hover();
    await io.homePage.loadingTime();
    let text = await io.homePage.getText(
      "[role='tooltip']"
    );
    expect(text).toEqual(
      "Selected errors are added to a batch, on which you can perform bulk retry and resolve actions."
    );

    // C51659 | Verify the Add to batch check box by selecting the multiple errors in the Error rows panel
    await io.homePage.click(
      await io.homePage.getCellLocator(1, 3, selectors.flowBuilderPagePO.DRAWER, false, "")
    );
    const boxes = await page.$$(selectors.myAccountPagePO.ERROR_CHECKBOX);
    const addToBatch = await boxes[boxes.length - 1];
    expect(
      (await addToBatch.getAttribute("class")).includes("Mui-checked")
    ).toBeTruthy();

    // C51670 | Verify the "Resolve & next" button functionality in the "Error details" drawer
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RESOLVE_AND_NEXT
    );
    await io.homePage.loadingTime();
    const openErr = await io.homePage.getLengthOfElementArray(selectors.myAccountPagePO.ERROR_CHECKBOX);
    expect(openErr).toEqual(6);
    await io.homePage.click(selectors.flowBuilderPagePO.RESOLVED_ERRORS_TAB);
    await io.homePage.loadingTime();
    const resolvedErr = await io.homePage.getLengthOfElementArray(
      selectors.myAccountPagePO.ERROR_CHECKBOX
    );
    expect(resolvedErr).toEqual(2);
  });
});
