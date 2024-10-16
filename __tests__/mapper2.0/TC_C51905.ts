import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/Mapper2.0/TC_C51905.json";

test.describe("TC_C51905", () => {
  test("@Env-All @Zephyr-IO-T22526 TC_C51905", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on the import mappings***", async ()=>{});

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.clickButtonByIndex(
        selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
        1
      );
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Add the destination field ***", async ()=>{});
    await io.homePage.doubleClick(
      "[data-test*='fieldMappingGenerate']"
    );
    await page.keyboard.type("Name");

    await io.homePage.doubleClick(
      "[data-test*='fieldMappingExtract']"
    );
    await page.keyboard.type("{{rows.href}}");

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADD_FIELD_MAPPING);

    test.step("*** Clicking on preview button ***", async ()=>{});

    await io.homePage.click(
      selectors.flowBuilderPagePO.AUTO_PREVIEW
    );

    await io.homePage.loadingTime();

    await test.step("*** Verifying error message user configured the handle bar expressions with the rows format ***", async ()=>{});
    let errorValue = (await io.homePage.getText(
      "[id='error']"
    )).toString();

    await io.assert.expectToContainValue("Mapper·2.0:·The·source·field·values·should·start·with·'record'·since·input·data·is·of·the·type·record.·For·instance·record.field1,·record.field2,·etc.", errorValue, "");

    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
