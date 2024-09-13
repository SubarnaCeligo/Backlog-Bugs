
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/Mapper2.0/TC_C51532.json";

test.describe("TC_C51327", () => {
  test("@Env-All @Zephyr-IO-T22423 TC_C51327", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on output format dropdown ***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.CHANGEOUTPUTFORMAT
    );
    await io.homePage.clickButtonByIndex(
      "[id='outputFormats'] li",
      0
    );
    test.step("*** Search the destination field ***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.SEARCH
    );
    test.step("*** Entering the search value ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      "$.children.firstName"
    );

    await test.step("*** Validate the search should not work for source fields and search should only work for destination fields ***", async ()=>{});
    const element = await page.getByText("Your search term doesn\'t match any destination fields");
    await expect(element).toBeVisible();

    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
