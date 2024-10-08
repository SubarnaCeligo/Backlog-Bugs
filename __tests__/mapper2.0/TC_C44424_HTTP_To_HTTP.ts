import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C44424_HTTP_To_HTTP.json";

test.describe(" TC_C44424_C44433_C44399_C44517_C43217_C43218 | Golden ", () => {
  let flowId: string;
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io, page}) => {
    test.step("*** Delete Flow Using UI ***", async ()=>{});
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2424 @Zephyr-IO-T2433 @Zephyr-IO-T2416 @Zephyr-IO-T2407 @Zephyr-IO-T2409 @Zephyr-IO-T2410 TC_C44424_C44433_C44399_C44517_C43217_C43218", async ({io, page}) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowId = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowId);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    // TC_C44424 | Verify by switching between mapper 1.0 and mapper 2.0 toggle
    const mapper1Btn = await page.$(selectors.mappings.MAPPER2DOT0PO.MAPPER1DOT0BUTTON);
    const mapper2Btn = await page.$(selectors.mappings.MAPPER2DOT0PO.MAPPER2DOT0BUTTON);

    await io.assert.expectToBeTrue(await mapper1Btn.isVisible(), "");
    await io.assert.expectToBeTrue(await mapper2Btn.isVisible(), "");

    test.step("** Currently At 'Mapper 2.0' **", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.MAPPER1DOT0BUTTON);
    test.step("** Toggled To 'Mapper 1.0' Button**", async ()=>{});

    await test.step("** Verified User Can Toggle Between 'Mapper 1.0' And 'Mapper 2.0'**", async ()=>{});

    // TC_C44433 | Verify alert banner should be shown on mapper 1.0 when mapper 2.0 mappings are saved moved to mapper 1.0
    let alertText =
      "Your 1.0 mappings are for reference only and will be ignored. Delete all 2.0 mappings to use 1.0 mappings instead.";
    let result = await io.homePage.getTextFromElement(
      selectors.myAccountPagePO.ACCOUNT_ERROR_MESSAGE,
      alertText
    );
    await io.assert.expectToBeTrue(result, "");
    test.step("** Verified Alert Banner Is Shown **", async ()=>{});

    // TC_C44399 | verify delete action for each mapping row
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.MAPPER2DOT0BUTTON);
    await io.mappings.expandMapping2dot0();
    const fieldNodes = await io.homePage.getElementsLength(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER);

    await page.locator(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS).nth(4).hover();
    await io.homePage.delay(1000);

    const deleteBtn = (await page.$$(selectors.mappings.MAPPER2DOT0PO.DELETEBUTTONS))[4];
    await deleteBtn.click();
    await io.homePage.loadingTime();
    test.step("Deleting Parent Row Record With children", async ()=>{});

    const text =
      "Are you sure you want to delete this parent record row? All its child rows will be deleted as well.";
    const body = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.CONFIRMDIALOGBODY) as string;
    await io.assert.expectToBeValue(text, body, "");

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.CLOSEBUTTON);
    let updatedFieldNodes = await io.homePage.getElementsLength(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER);
    expect(fieldNodes).toEqual(updatedFieldNodes);

    await test.step("** Verified Dialog Box is Obtained When Parent Row with Children Are Tried To Be Deleted**", async ()=>{});

    // TC_C44517 | verify description field with lengthy chatracters
    test.step("Adding Description To Some Field", async ()=>{});
    await io.homePage.clickByIndex(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTON, 0);
    const descText =
      "Celigo is a fantastic tool that has enabled us to connect key business systems with ease." +
      "As our business has seen exceptional customer demand in the last year we have needed to use tools" +
      " like Celigo to improve processes, scale quickly, and speed up internal administration and data pass-over." +
      "Celigo has helped us by saving time and freeing up team members to do better things. That is the real value-add.";

    await io.homePage.fillWebPage(selectors.mappings.MAPPER2DOT0PO.DESCRIPTION, descText);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    test.step("Checking Description Added Properly", async ()=>{});
    await io.homePage.clickByIndex(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTON, 0);
    let savedDesc = await (await page.locator(selectors.mappings.MAPPER2DOT0PO.DESCRIPTION)).getAttribute("value");

    await io.homePage.clickByIndex(selectors.basePagePO.CLOSE, 1);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    await io.assert.expectToBeValue(descText, savedDesc, "");
    await io.homePage.delay(2000);

    await test.step("** Verified Mapper2.0 Can Accomodate Lengthy Description Field And Is Visible**", async ()=>{});

    // TC_C43217 | Verify whether the description field is added to import mappings subschema
    test.step("*** Obtaining the flowJson ***", async ()=>{});
    const flowJson = await io.api.getFlowById(flowId);
    test.step("*** Obtaining importId from flowJson ***", async ()=>{});
    const importId = flowJson.pageProcessors[0]._importId;
    let importJSON = await io.api.getImportById(importId);

    test.step("Obtaining Import JSON data", async ()=>{});
    await io.assert.expectToBeValue(importJSON.mappings[0]?.description, descText, "");

    await test.step("** Verified Description Field Is Visible In JSON Schema In Mappings Field**", async ()=>{});

    // TC_C43218 | Verify whether the description field is updatable in import mappings subschema in edit case
    test.step("Updating Description Field", async ()=>{});
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.IMPORT_MAPPING);
    await io.homePage.loadingTime();

    await io.homePage.clickByIndex(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTON, 0);
    await io.homePage.clearTextValue(selectors.mappings.MAPPER2DOT0PO.DESCRIPTION);
    const updatedDescText =
      "This is the updated description text to validate description field editable";
    await io.homePage.fillWebPage(selectors.mappings.MAPPER2DOT0PO.DESCRIPTION, updatedDescText);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.delay(2000);
    
    test.step("Obtaining Import JSON data", async ()=>{});
    importJSON = await io.api.getImportById(importId);
    await io.assert.expectToBeValue(importJSON.mappings[0]?.description, updatedDescText, "");

    await test.step("** Verified Description Field Is Updatable In Mappings Subschema When Edit Done **", async ()=>{});
  });
});
