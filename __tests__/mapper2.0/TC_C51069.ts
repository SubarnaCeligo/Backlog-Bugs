
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/Mapper2.0/TC_C51069.json";

test.describe("TC_C51069", () => {
  test("@Env-All @Zephyr-IO-T22334 TC_C51069 | Verify whether the source field configuration retained after user modifies the destination data type from an array type i.e. [string] to a primitive type i.e. string/boolean/number/object", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on created import ***", async ()=>{});
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(
      await selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();

    var filepath = FTP.pageGenerators[0].qa__export.qa__path;
    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles(`testData/assets${filepath}`);
    await io.homePage.loadingTime();

    test.step("*** Save and close the import ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await test.step("*** Change the datatype of destination field ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " button",
      1
    );
    let option1 = (await io.homePage.getElementOrIndex(
      selectors.mappings.MAPPER2DOT0PO.DATATYPES,
      "number"
    )) as any;
    await option1.click();

    await test.step("*** Validate test.afterEach changing the datatype of destination field, the mappings should be retained ***", async ()=>{});

    let result = await page.$$(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS + " input"
    );
    let value = await result[1].getAttribute("value");
    await io.assert.expectToContainValue("$.children.firstName", value, "");

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
