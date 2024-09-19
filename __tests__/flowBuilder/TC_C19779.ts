import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C19779.json";

test.describe("TC_C19779 | TC_C19805", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });

  test.afterEach(async ({io}) => {
    await io.api.deleteFlowsWithId([flowId]);
    test.step("** Deleted flow **", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T2775| While deleting the transform rules using backspace only the respective field value should be deleted  ", async ({io,page}, testInfo) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
await test.step(
      "Created Flow " + TC.name + " With ID " + flowId
, async ()=>{});
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    test.step("Opened Flowbuilder of flow. ", async ()=>{});

    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION
    );
    await io.homePage.loadingTime();
    let elem =await io.homePage.getElementLocatorById("extract", 1);
    await io.homePage.click(elem);
    await page.keyboard.type("company");
await test.step(
      "Updating and Deleting Export Transformation. "
, async ()=>{});
    await io.homePage.clearTextValue(elem);
    test.step("Cleared Second Extract Field. ", async ()=>{});

    await io.homePage.click(
      selectors.flowBuilderPagePO.PREVIEW
    );
    test.step("Clicked Preview Button. ", async ()=>{});

    await io.homePage.loadingTime();
    let obtained = await io.homePage.getText(
      selectors.mappings.RESULTTEXT
    );
    let received = JSON.stringify(obtained).replace(/[\s+\\n]/g, "");
    expect(received).toEqual('"{"email":"democustomer6@example.com"}"');
await test.step(
      "** Verified Only selected Extract Field Is Cleared When Deleted Using Backspace **"
, async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T2777| For imports, Advanced sections should not be auto expanded", async ({io,page}, testInfo) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    await test.step( "Created Flow " + TC.name + " With ID " + flowId, async ()=>{});
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();
    test.step("** Clicked On Already Created FTP Import **", async ()=>{});
    var elem =await (await page.$(selectors.mappings.MAPPER2DOT0PO.ADVANCED)).getAttribute("aria-expanded")
    await io.assert.expectToBeValue("false", elem,"")
    await io.homePage.click(
      selectors.importPagePO.IMPORT_CLOSE_DRAWER
    );

    test.step("!!! Navigated to Create Flow !!!", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );

    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FTP);
    await io.homePage.click(
      selectors.connectionsPagePO.TRANSFER_FILES
    );
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.loadingTime();
    elem =await (await page.$(selectors.mappings.MAPPER2DOT0PO.ADVANCED)).getAttribute("aria-expanded")
    await io.assert.expectToBeValue("false", elem,"")

await test.step(
      "** Verifed Advanced Section Is Closed While Creating Import **"
, async ()=>{});
  });
});
