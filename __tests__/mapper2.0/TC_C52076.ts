import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/Mapper2.0/TC_C52076.json";

test.describe("TC_C52076", () => {
  test("@Env-All @Zephyr-IO-T22540 TC_C52076", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
    await io.flowBuilder.loadingTime();

    test.step("*** Click on the Filter option***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.FILTER_OPTION
    );
    await io.homePage.loadingTime();

    await io.homePage.clickButtonBasedOnLabelName(
      "ul li label",
      "Mapped fields"
    );
    test.step("*** Selected Mapping field ***", async ()=>{});

    await io.homePage.clickButtonBasedOnLabelName(
      "ul li label",
      "Required fields"
    );
    test.step("*** Selected Required field ***", async ()=>{});

    let ele = await page.locator("//button[text()='Apply']");
    let isEnabled = await ele.isEnabled();
    await io.assert.expectToBeTrue(isEnabled, "");

    await io.homePage.clickButtonBasedOnLabelName(
      "ul li label",
      "All fields"
    );
    test.step("*** Selected All fields field ***", async ()=>{});

    await test.step("*** Validating user is not be able to select all three options ***", async ()=>{});

    ele = await page.locator("//button[text()='Apply']");
    isEnabled = await ele.isEnabled();
    await io.assert.expectToBeFalse(isEnabled, "");

    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
