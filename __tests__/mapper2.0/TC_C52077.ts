import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/Mapper2.0/TC_C52077.json";

test.describe("TC_C52077", () => {
  test("@Env-All @Zephyr-IO-T22541 TC_C52077", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on filter ***", async ()=>{});
    test.step("*** Click on the Filter option***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.FILTER_OPTION
    );
    await io.homePage.loadingTime();
    await io.homePage.clickButtonBasedOnLabelName(
      "ul li label",
      "Required fields"
    );
    test.step("*** Selected Required field ***", async ()=>{});
    test.step("*** clicking on Apply button ***", async ()=>{});
    await io.homePage.clickByText(
      "Apply"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await test.step("*** Validate the message test.afterEach applying mapped fields filter ***", async ()=>{});
    var result = await io.homePage.getText(
      "p > div"
    );
    await io.assert.expectToBeValue(String(result), 
      'You don\'t have any fields that match the filter you applied.  Clear the filter by setting it to "All fields".'
    , "");

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
