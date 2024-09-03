
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/EM2.0/TC_C24224.json";

test.describe("TC_C24491", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T7211 TC_C24491 Verify whether the confirmation dialog box is shown when user clicks on 1000 retiable errors from Retry dropdown", async ({io, page}) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickByText("Mysql to mysql flow_DND");
    test.step("Clicked on the flow", async ()=>{});


    test.step("***Clicked On Flow Which Has Errors***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    test.step("Error Table is opened", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN
    );
    test.step("***Clicked On Retry Dropdown ***", async ()=>{});
    await io.homePage.loadingTime();
    const text = await io.flowbranching.flowBranchingPage.getList("li");

    expect(text).toContain("1000 retriable errors");
    expect(text).toContain("0 retriable errors");

    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_ALL
    );
    const dialogModal = await page.locator(selectors.integrationPagePO.CONFIRMATIONDIALOG)
    await io.assert.expectToBeTrue(await dialogModal.isVisible(),"")
    expect(await dialogModal.textContent()).toEqual("Confirm retry");
await test.step(
      `***Confirmation Dialogbox Is Showed With Message " Confirm retry"***`
, async ()=>{});
  });
});
