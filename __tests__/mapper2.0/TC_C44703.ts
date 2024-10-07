import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C44703.json";

test.describe("TC_C44703", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
  });
  // TC_C44703 | Verify 2.0 mappings are applied & info banner displays in 1.0 -- When User has 1.0 --> toggled to 2.0
  //             --> add mappings --> toggles to 1.0 without saving 2.0 --> Click Save in 1.0 without making changes in 1.0
  test("@Env-All @Zephyr-IO-T2452 TC_C44703", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Open import mapping***", async ()=>{});
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.ADD_DATA_PROCESSOR,
      1
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();

    let mapperDestinationField = await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER);
    await mapperDestinationField.focus();
    await mapperDestinationField.dblclick();
    await page.keyboard.type("name");

    let mapperSourceField = await page.locator(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER);
    await mapperSourceField.focus();
    await mapperSourceField.dblclick();
    await page.keyboard.type("Auto_C44703");

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS);
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.MAPPER1DOT0BUTTON);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    await io.homePage.loadingTime();
    let obtained = await io.homePage.getText(
      selectors.mappings.RESULTTEXT
    );

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    let received = String(obtained).replace(/[\s+\n]/g, "");
  
    expect(received).toEqual('{"name":"Auto_C44703"}');

    await test.step("Verified Preview Shown For Mapper2 Mappings Only ", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    let alertExpetedText =
      "Your 1.0 mappings are for reference only and will be ignored. Delete all 2.0 mappings to use 1.0 mappings instead.";
    let alertText = await (await page.locator(selectors.myAccountPagePO.ACCOUNT_ERROR_MESSAGE)).textContent();

    await io.assert.expectToBeTrue(alertExpetedText === alertText, "");
    test.step("** Verified Alert Banner Is Shown **", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();

    await test.step("** Verified 2.0 Mappings Are Applied Under Given Case **", async ()=>{});
  });
});
