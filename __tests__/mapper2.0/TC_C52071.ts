import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/Mapper2.0/TC_C52071.json";

test.describe("TC_C52071", () => {
  test("@Env-All @Zephyr-IO-T22536 TC_C52071", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
    await io.flowBuilder.loadingTime();

    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS,
    );
    await page.keyboard.type("test");
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS
    );
    await page.keyboard.type("123");
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.ADD_FIELD_MAPPING
    );

    test.step("*** Click on the Filter option***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.FILTER_OPTION
    );
    await io.homePage.loadingTime();

    test.step("*** Flter with mapping fields***", async ()=>{});
    await io.homePage.clickButtonBasedOnLabelName(
      "ul li label",
      "Mapped fields"
    );
    test.step("*** Click on apply button***", async ()=>{});
    await io.homePage.clickByText(
      "Apply"
    );
    await io.homePage.loadingTime();

    await test.step("*** Validate the message test.afterEach applying required fields filter ***", async ()=>{});
    const textToCheck = "Filtered by mapped fields (clear filter to enable editing)"; // Replace with the text you want to check
    const elementWithText = await page.locator(`text=${textToCheck}`);
    const isElementVisible = await elementWithText.isVisible();
    await io.assert.expectToBeTrue(isElementVisible, "");

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
