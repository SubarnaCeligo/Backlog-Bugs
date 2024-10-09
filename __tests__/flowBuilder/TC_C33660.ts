import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC3 from "@testData/FlowBuilder/TC_C33660.json";
import TC4 from "@testData/FlowBuilder/TC_C29810.json";
import TC5 from "@testData/FlowBuilder/TC_C31311.json";
import TC6 from "@testData/FlowBuilder/TC_C12230.json";
import TC7 from "@testData/FlowBuilder/TC_C28122.json";
import TC8 from "@testData/FlowBuilder/TC_C26396.json";
test.describe("TC_C33660", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io}) => {
    await io.api.deleteFlowsWithId([flowId]);
    test.step("** Deleted flow **", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T2926| User should able to close the 'Define Lookup Criteria' Page", async ({io}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC3);
    flowId = await io.api.getFlowId(TC3.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
await test.step(
      "***Navigated To FlowBuilder For The Created Flow***"
, async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    test.step("***Navigated To Imports Page***", async ()=>{});
    await io.homePage.click(
      "[data-test='addupdate']"
    );
    test.step("***Selected Operation As Insert/Update***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.FILTERBUTTON
    );
    test.step("***Clicked On Filter Option***", async ()=>{});
    var result = await io.assert.checkElementState(
      selectors.basePagePO.CLOSE
    , "isDisabled");
await test.step(
      "***User Should Able To Close The 'Define Lookup Criteria' Page***"
, async ()=>{});
    expect(result).toBeFalsy();
  });

//   test("TC_C29810", async ({io,page}) => {
//     var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC4);
// await test.step(
//       "Created Flows(Salesforce Import & Netsuite Import) " +
//         flows.get(TC4.name)["flowName"] +
//         " " +
//         " With IDs " +
//         flows.get(TC4.name)["flowId"], async ()=>{}
//     );
//     var flowId2 = await io.api.getFlowId(TC4.name);
//     await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId2);
//     await io.homePage.clickButtonByIndex(
//       selectors.basePagePO.ADD_DATA_PROCESSOR,
//       1
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.IMPORT_MAPPINGS
//     );
//     test.step("***Navigated To Response Mappings Page***", async ()=>{});
//     await io.homePage.click(
//       selectors.mappings.DEFAULT_MAPPING_TYPE.AUTO_MAP
//     );
//     await io.homePage.click(
//       selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_SETTING
//     );
//     test.step("***Opened Mapping Settings***", async ()=>{});
//     await io.homePage.click(
//       selectors.mappings.MAPPER2DOT0PO.LOOKUP
//     );
//     await io.homePage.click(
//       "[data-test='dynamic']"
//     );
//     test.step("***Selected Dynamic Lookup***", async ()=>{});
//     await io.homePage.click(
//       "[data-test='lookup.name']"
//     );
//     await io.homePage.fillWebPage(
//       selectors.mappings.MAPPER2DOT0PO.STATICLOOKUP,
//       "sample"
//     );
//     await io.homePage.click(
//       "[data-test='lookup.sObjectType']"
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.ACCOUNTRECTYPE
//     );
// await test.step(
//       "***Entered All The Mandatory Fields For Dynamic Lookup***"
// , async ()=>{});
//     await io.homePage.clickButtonByIndex(
//       selectors.basePagePO.SAVE_AND_CLOSE,
//       1
//     );
//     test.step("***Clicked On Save***", async ()=>{});
//     var text = await io.homePage.getText(
//       selectors.mappings.MAPPER2DOT0PO.STATICLOOKUP
//     );
//     var expected = "sample";
//     test.step("***Lookup Is Saved With The Given Name***", async ()=>{});
//     expect(text).toEqual(expected);
//     await io.homePage.click(
//       selectors.mappings.MAPPER2DOT0PO.STATICLOOKUP
//     );
//     test.step("***Selected Static Lookup***", async ()=>{});
//     await io.homePage.click(
//       "[data-test='lookup.name']"
//     );
//     await io.homePage.fillWebPage(
//       "[data-test='lookup.name']",
//       "sample"
//     );
// await test.step(
//       "***Entered All The Mandatory Fields For Static Lookup***"
// , async ()=>{});
//     await io.homePage.clickButtonByIndex(
//       selectors.basePagePO.SAVE,
//       1
//     );
//     test.step("***Clicked On Save***", async ()=>{});
//     var text1 = await io.homePage.getText(
//       "[data-test='lookup.name']"
//     );
//     var expected1 = "sample";
//     test.step("***Lookup Is Saved With The Given Name***", async ()=>{});
//     expect(text1).toEqual(expected1);
//   });
//   test("TC_C31311", async ({io,page}) => {
//     var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC5);
// await test.step(
//       "Created Flows(Salesforce Import) " +
//         flows.get(TC5.name)["flowName"] +
//         " " +
//         " With IDs " +
//         flows.get(TC5.name)["flowId"], async ()=>{}
//     );
//     var flowId2 = await io.api.getFlowId(TC5.name);
//     await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId2);
//     await io.homePage.click(
//       "[data-test='Export']"
//     );
//     await io.homePage.click(
//       selectors.connectionsPagePO.NAME_INPUT
//     );
//     await io.homePage.clearTextValue(
//       selectors.connectionsPagePO.NAME_INPUT
//     );
//     await io.homePage.fillWebPage(
//       selectors.connectionsPagePO.NAME_INPUT,
//       "change_name"
//     );
//     await io.homePage.click(
//       selectors.basePagePO.SAVE_AND_CLOSE
//     );
//     test.step("***Changed Export Name***", async ()=>{});
//     await io.homePage.click("[datatest='Audit log']");
//     test.step("***Navigated To Audit Logs Tab***", async ()=>{});
//     var text = await io.homePage.getText(
//       " tr:nth-child(2) > td:nth-child(7)"
//     );
//     var expected = "pageGenerators.0.skipRetries";
// await test.step(
//       "***pageGenerators.0.skipRetries Is Updated In The Audit Logs When A Flow Is Updated***"
// , async ()=>{});
//     expect(text).toEqual(expected);
//   });
//   test("TC_C28653", async ({io,page}) => {
//     await io.goToFlowsPage();
//     flowId4 = await io.api.getFlowId("TC_C28653_DND");
//     await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId4);
//     await io.homePage.clickButtonByIndex(
//       selectors.basePagePO.ADD_DATA_PROCESSOR,
//       1
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.IMPORT_MAPPINGS
//     );
//     test.step("***Navigated To Import Mappings Page***", async ()=>{});
//     var text = await io.homePage.getText(
//       "[data-test='text-fieldMappingGenerate-0'] >div >textarea"
//     );
//     var expected = "first_name";
//     expect(text).toEqual(expected);
//     var text1 = await io.homePage.getText(
//       selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_GENERATE_1
//     );
//     var expected1 = "last_name";
//     expect(text1).toEqual(expected1);
//     var text2 = await io.homePage.getText(
//       selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_GENERATE_2
//     );
//     var expected2 = "applications";
// await test.step(
//       "***Mandatory Fields Are Added For Greenhouse Import***"
// , async ()=>{});
//     expect(text2).toEqual(expected2);
//   });
//   test("TC_C12230", async ({io,page}) => {
//     var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC6);
// await test.step(
//       "Created Flows(With Multiple Imports With Response Mappings Added) " +
//         flows.get(TC6.name)["flowName"] +
//         " " +
//         " With IDs " +
//         flows.get(TC6.name)["flowId"], async ()=>{}
//     );
//     var flowId5 = await io.api.getFlowId(TC6.name);
//     await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId5);
// await test.step(
//       "***Navigated To FlowBuilder For The Created Flow***"
// , async ()=>{});
//     await io.homePage.clickButtonByIndex(
//       selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING,
//       1
//     );
//     test.step("***Opened Response Mappings Page For PP3***", async ()=>{});
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.PREVIEW
//     );
//     test.step("***Clicked On Preview Button***", async ()=>{});
//     var text = await io.homePage.getText(
//       selectors.mappings.RESULTTEXT
//     );
//     var expected = JSON.stringify(TC6);
// await test.step(
//       "***Response Mapping For PP3 Doesnot Includes Response Mappings For PP1 & PP2***"
// , async ()=>{});
//     expect(text).not.toEqual(expected);
//   });
//   test("TC_C28122", async ({io,page}, testInfo) => {
//     //*Create Flow
//     var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC7);
// await test.step(
//       "Created Flows " +
//         flows.get(TC7.name)["flowName"] +
//         " " +
//         " With IDs " +
//         flows.get(TC7.name)["flowId"], async()=>{}
//     );
//     var flowId7 = await io.api.getFlowId(TC7.name);
//     await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId7);
//     test.step("*** Saving Flow And Run Flow***", async ()=>{});
//     await io.homePage.click(
//       selectors.basePagePO.RUNFLOW
//     );
//     await io.homePage.click(
//       "//div[@pageprocessorindex='0']//div[6]//button"
//     );
//     test.step("***Clicked On View Errors***", async ()=>{});
//     var result = await io.assert.checkElementState(
//       selectors.basePagePO.CLOSE_RIGHT_DRAWER
//     , "isDisabled");
// await test.step(
//       "***User Is Able To Close The View Errors Window***"
// , async ()=>{});
//     await io.assert.expectToBeTrue(result, "");
//     await io.homePage.click(
//       selectors.basePagePO.CLOSE_RIGHT_DRAWER
//     );
//     await io.homePage.click(
//       selectors.aliasesPagePO.ALIASES_FLOW_SETTINGS
//     );
//     await io.homePage.click(
//       "[data-test='Custom']"
//     );
//     await io.homePage.click(
//       selectors.basePagePO.LAUNCH_EDITOR
//     );
//     await io.homePage.click(
//       selectors.basePagePO.FALSE
//     );
// await test.step(
//       "***Navigated To Settings > Launch Form Builder And Made Changes***"
// , async ()=>{});
//     var result1 = await io.assert.checkElementState(
//       selectors.basePagePO.SAVE_AND_CLOSE
//     , "isDisabled");
// await test.step(
//       "***User Is Able To Save & Close If There Are Unsaved Changes***"
// , async ()=>{});
//     expect(result1).toBeFalsy();
//     await io.homePage.click(
//       selectors.basePagePO.CLOSE
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.SCHEDULE_FLOW
//     );
//     test.step("***Navigated To Flow Schedule***", async ()=>{});
//     await io.homePage.click(
//       selectors.importPagePO.ADVANCED
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.PRESET
//     );
//     //await io.homePage.loadingTime();
//     var result2 = await io.assert.checkElementState(
//       selectors.basePagePO.SAVE_AND_CLOSE
//     , "isDisabled");
// await test.step(
//       "***User Is Able To Save & Close If There Are Unsaved Changes***"
// , async ()=>{});
//     await io.assert.expectToBeTrue(result2, "");
//     await io.homePage.click(
//       selectors.basePagePO.CLOSE_RIGHT_DRAWER
//     );
//     await io.homePage.click(
//       selectors.basePagePO.MFA_SAVE
//     );
//     await io.homePage.click(
//       selectors.basePagePO.ADD_DATA_PROCESSOR
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION
//     );
//     test.step("***Navigated To Transformations***", async ()=>{});
//     await io.homePage.click(
//       "[placeholder='extract']"
//     );
//     await io.homePage.fillWebPage(
//       "[placeholder='extract']",
//       "id"
//     );
//     await io.homePage.click(
//       "[placeholder='generate']"
//     );
//     await io.homePage.fillWebPage(
//       "[placeholder='generate']",
//       "Name"
//     );
//     await io.homePage.loadingTime();
//     var result3 = await io.assert.checkElementState(
//       selectors.basePagePO.SAVE_AND_CLOSE
//     , "isDisabled");
// await test.step(
//       "***User Is Able To Save & Close If There Are Unsaved Changes***"
// , async ()=>{});
//     await io.assert.expectToBeTrue(result3, "");
//     await io.homePage.click(
//       selectors.basePagePO.CLOSE_RIGHT_DRAWER
//     );
//     await io.homePage.click(
//       selectors.basePagePO.MFA_SAVE
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.EXPORT_FILTER
//     );
//     test.step("***Clicked On Output Filter***", async ()=>{});
//     await io.homePage.click(
//       selectors.basePagePO.JAVASCRIPTWINDOW
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.OPENAI.FUNCTION_NAME
//     );
//     await io.homePage.clearTextValue(
//       selectors.flowBuilderPagePO.OPENAI.FUNCTION_NAME
//     );
//     var result4 = await io.assert.checkElementState(
//       selectors.basePagePO.SAVE_AND_CLOSE
//     , "isDisabled");
// await test.step(
//       "***User Is Able To Save & Close If There Are Unsaved Changes***"
// , async ()=>{});
//     await io.assert.expectToBeTrue(result4, "");
//     await io.homePage.click(
//       selectors.basePagePO.CLOSE_RIGHT_DRAWER
//     );
//     await io.homePage.click(
//       selectors.basePagePO.MFA_SAVE
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
//     );
//     await io.homePage.click(
//       "[data-test='exportHooks']"
//     );
//     await io.homePage.click(
//       "[data-test='stack']"
//     );
//     test.step("***Clicked On Export Hooks***", async ()=>{});
//     var result5 = await io.assert.checkElementState(
//       selectors.basePagePO.SAVE_AND_CLOSE
//     , "isDisabled");
// await test.step(
//       "***User Is Able To Save & Close If There Are Unsaved Changes***"
// , async ()=>{});
//     await io.assert.expectToBeTrue(result5, "");
//     await io.homePage.click(
//       selectors.basePagePO.CLOSE_RIGHT_DRAWER
//     );
//     await io.homePage.click(
//       selectors.basePagePO.MFA_SAVE
//     );
//     await io.homePage.clickButtonByIndex(
//       selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
//       1
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.INPUT_FILTER
//     );
//     test.step("***Clicked On Input Filter***", async ()=>{});
//     await io.homePage.click(
//       selectors.basePagePO.JAVASCRIPTWINDOW
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.OPENAI.FUNCTION_NAME
//     );
//     await io.homePage.clearTextValue(
//       selectors.flowBuilderPagePO.OPENAI.FUNCTION_NAME
//     );
//     var result6 = await io.assert.checkElementState(
//       selectors.basePagePO.SAVE_AND_CLOSE
//     , "isDisabled");
// await test.step(
//       "***User Is Able To Save & Close If There Are Unsaved Changes***"
// , async ()=>{});
//     await io.assert.expectToBeTrue(result6, "");
//     await io.homePage.navigateTo(io.connectorUrl + "scripts");
//     await io.homePage.click(
//       selectors.integrationPagePO.ADDNEWRESOURCE
//     );
//     test.step("***Navigated to Scripts***", async ()=>{});
//     await io.homePage.click(
//       selectors.basePagePO.ADD_NAME
//     );
//     await io.homePage.fillWebPage(
//       selectors.basePagePO.ADD_NAME,
//       "sample"
//     );
//     test.step("***Made Some Changes***", async ()=>{});
//     var result7 = await io.assert.checkElementState(
//       selectors.basePagePO.SAVE_AND_CLOSE
//     , "isDisabled");
// await test.step(
//       "***User Is Able To Save & Close If There Are Unsaved Changes***"
// , async ()=>{});
//     await io.assert.expectToBeTrue(result7, "");
//   });
//   test("TC_C26396_C26397", async ({io,page}, testInfo) => {
//     //*Create Flow
//     var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC8);
// await test.step(
//       "Created Flows(With Transformations & Filters) " +
//         flows.get(TC8.name)["flowName"] +
//         " " +
//         " With IDs " +
//         flows.get(TC8.name)["flowId8"], async()=>{}
//     );
//     test.step("***Performing Get Request**", async ()=>{});
//     var response = await io.api.getExport( "BG export");
//     var expected = "returnRetryData=true Trace key";
//     test.step("***Trace Key Is Present***", async ()=>{});
//     await io.assert.expectToContainValue(expected,response, "");
//     const response1 = await io.api.postCall(
//       "/v1/connections/" + TC8.qa__api_tdata + "/export/pages",
//       TC8
//     );
//     return response;
//     var expected1 = "returnRetryData=true Trace key";
//     test.step("***Trace Key Is Present***", async ()=>{});
//     await io.assert.expectToContainValue(expected1,response1, "");
//   });
//   test("TC_C28120_C28121_C28119", async ({io,page}, testInfo) => {
//     //*Create Flow
//     // var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC9);
// // await test.step(
//     //   "Created Flows " +
//     //     flows.get(TC9.name)["flowName"] +
//     //     " " +
//     //     " With IDs " +
//     //     flows.get(TC9.name)["flowId"]
//     // );

//     var flowId7 = await io.api.getFlowId("TC_C28120_DND");
//     await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId7);
//     test.step("*** Saving Flow And Run Flow***", async ()=>{});
//     await io.homePage.click(
//       selectors.aliasesPagePO.ALIASES_FLOW_SETTINGS
//     );
//     await io.homePage.click(
//       "[data-test='Custom']"
//     );
//     await io.homePage.click(
//       selectors.basePagePO.LAUNCH_EDITOR
//     );
//     await io.homePage.click(
//       selectors.mappings.INPUTTEXT
//     );
//     var mockinput = await page.$('[id="data"] textarea');
//     await mockinput.dblclick();
//     var inputLines = await page.$$(
//       "#data > div.ace_scroller > div > div.ace_layer.ace_text-layer > div"
//     );
//     for (var j = 0; j < 2; j++) {
//       await inputLines[j].dblclick();
//       await page.keyboard.press("Delete");
//     }
// await test.step(
//       "***Navigated To Settings > Launch Form Builder And Made Changes***"
// , async ()=>{});
//     await io.homePage.clickButtonByIndex(
//       selectors.basePagePO.SAVE,
//       1
//     );
//     var result1 = await io.assert.checkElementState(
//       selectors.basePagePO.SAVE
//     , "isDisabled");
// await test.step(
//       "***Save Button Is Greyed Out After Saving Unsaved Changes***"
// , async ()=>{});
//     expect(result1).toBeFalsy();
//     var result8 
//     var ele = await page.$$(selectors.basePagePO.CLOSE);
//       await ele[1].waitForElementState("visible");
//       if (ele[1].isEnabled()) {
//         result8 = true;
//       } else { result8 = false };
// await test.step(
//       "***After Saving Unsaved Changes Close Button,X Is Active***"
// , async ()=>{});
//     await io.assert.expectToBeTrue(result8, "");
//     var result15 

//       var ele = await page.$$(selectors.basePagePO.CLOSE);
//       await ele[1].waitForElementState("visible");
//       if (ele[1].isVisible()) {
//         result15 = true;
//       } else { result15 = false };
//     await io.assert.expectToBeTrue(result15, "");
//     var result16 = await io.assert.checkElementState(
//       selectors.basePagePO.SAVE
//     , "isVisible");
//     await io.assert.expectToBeTrue(result16, "");
// await test.step(
//       "***After Saving Unsaved Changes Save And Close Buttons Are Displayed***"
// , async ()=>{});
//     await io.homePage.clickButtonByIndex(
//       selectors.basePagePO.CLOSE,
//       1
//     );
//     await io.homePage.click(
//       selectors.basePagePO.CLOSE
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.SCHEDULE_FLOW
//     );
//     test.step("***Navigated To Flow Schedule***", async ()=>{});
//     await io.homePage.click(
//       selectors.importPagePO.ADVANCED
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.PRESET
//     );
//     await io.homePage.click(
//       selectors.basePagePO.SAVE
//     );
//     var result2 = await io.assert.checkElementState(
//       selectors.basePagePO.SAVE
//     , "isDisabled");
// await test.step(
//       "***Save Button Is Greyed Out After Saving Unsaved Changes***"
// , async ()=>{});
//     expect(result2).toBeFalsy();
//     var result9 = await io.assert.checkElementState(
//       selectors.basePagePO.CLOSE
//     , "isDisabled");
// await test.step(
//       "***After Saving Unsaved Changes Close Button,X Is Active***"
// , async ()=>{});
//     await io.homePage.loadingTime();
//     await io.assert.expectToBeTrue(result9, "");
//     var result17 = await io.assert.checkElementState(
//       selectors.basePagePO.CLOSE
//     , "isVisible");
//     await io.assert.expectToBeTrue(result17, "");
//     var result18 = await io.assert.checkElementState(
//       selectors.basePagePO.SAVE
//     , "isVisible");
//     await io.assert.expectToBeTrue(result18, "");
// await test.step(
//       "***After Saving Unsaved Changes Save And Close Buttons Are Displayed***"
// , async ()=>{});
//     await io.homePage.click(
//       selectors.basePagePO.CLOSE_RIGHT_DRAWER
//     );
//     await io.homePage.click(
//       selectors.basePagePO.ADD_DATA_PROCESSOR
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION
//     );
//     test.step("***Navigated To Transformations***", async ()=>{});
//     await io.homePage.click(
//       "[placeholder='extract']"
//     );
//     await io.homePage.clearTextValue(
//       "[placeholder='extract']"
//     );
//     await io.homePage.fillWebPage(
//       "[placeholder='extract']",
//       "id"
//     );
//     await io.homePage.click(
//       "[placeholder='generate']"
//     );
//     await io.homePage.clearTextValue(
//       "[placeholder='generate']"
//     );
//     await io.homePage.fillWebPage(
//       "[placeholder='generate']",
//       "Name"
//     );
//     await io.homePage.loadingTime();
//     await io.homePage.click(
//       "[data-test='delete-0']"
//     );
//     await io.homePage.click(
//       selectors.basePagePO.SAVE
//     );
//     await io.homePage.loadingTime();
//     var result3 = await io.assert.checkElementState(
//       selectors.basePagePO.SAVE
//     , "isDisabled");
// await test.step(
//       "***Save Button Is Greyed Out After Saving Unsaved Changes***"
// , async ()=>{});
//     expect(result3).toBeFalsy();
//     var result10 = await io.assert.checkElementState(
//       selectors.basePagePO.CLOSE
//     , "isDisabled");
// await test.step(
//       "***After Saving Unsaved Changes Close Button,X Is Active***"
// , async ()=>{});
//     await io.assert.expectToBeTrue(result10, "");
//     var result19 = await io.assert.checkElementState(
//       selectors.basePagePO.CLOSE
//     , "isVisible");
//     await io.assert.expectToBeTrue(result19, "");
//     var result20 = await io.assert.checkElementState(
//       selectors.basePagePO.SAVE
//     , "isVisible");
//     await io.assert.expectToBeTrue(result20, "");
// await test.step(
//       "***After Saving Unsaved Changes Save And Close Buttons Are Displayed***"
// , async ()=>{});
//     await io.homePage.click(
//       selectors.basePagePO.CLOSE_RIGHT_DRAWER
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.EXPORT_FILTER
//     );
//     test.step("***Clicked On Output Filter***", async ()=>{});
//     await io.homePage.click(
//       selectors.basePagePO.JAVASCRIPTWINDOW
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.OPENAI.FUNCTION_NAME
//     );
//     await io.homePage.clearTextValue(
//       selectors.flowBuilderPagePO.OPENAI.FUNCTION_NAME
//     );
//     await io.homePage.click(
//       selectors.basePagePO.SAVE
//     );
//     await io.homePage.loadingTime();
//     var result4 = await io.assert.checkElementState(
//       selectors.basePagePO.SAVE
//     , "isDisabled");
// await test.step(
//       "***Save Button Is Greyed Out After Saving Unsaved Changes***"
// , async ()=>{});
//     expect(result4).toBeFalsy();
//     var result11 = await io.assert.checkElementState(
//       selectors.basePagePO.CLOSE
//     , "isDisabled");
// await test.step(
//       "***After Saving Unsaved Changes Close Button,X Is Active***"
// , async ()=>{});
//     await io.assert.expectToBeTrue(result11, "");
//     var result21 = await io.assert.checkElementState(
//       selectors.basePagePO.CLOSE
//     , "isVisible");
//     await io.assert.expectToBeTrue(result21, "");
//     var result22 = await io.assert.checkElementState(
//       selectors.basePagePO.SAVE
//     , "isVisible");
//     await io.assert.expectToBeTrue(result22, "");
// await test.step(
//       "***After Saving Unsaved Changes Save And Close Buttons Are Displayed***"
// , async ()=>{});
//     await io.homePage.click(
//       selectors.basePagePO.CLOSE_RIGHT_DRAWER
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
//     );
//     await io.homePage.click(
//       "[data-test='exportHooks']"
//     );
//     await io.homePage.click(
//       "[data-test='stack']"
//     );
//     test.step("***Clicked On Export Hooks***", async ()=>{});
//     await io.homePage.click(
//       selectors.basePagePO.SAVE
//     );
//     await io.homePage.loadingTime();
//     var result5 = await io.assert.checkElementState(
//       selectors.basePagePO.MFA_SAVE
//     , "isDisabled");
// await test.step(
//       "***Save Button Is Greyed Out After Saving Unsaved Changes***"
// , async ()=>{});
//     expect(result5).toBeFalsy();
//     var result12 = await io.assert.checkElementState(
//       selectors.basePagePO.CLOSE
//     , "isDisabled");
// await test.step(
//       "***After Saving Unsaved Changes Close Button,X Is Active***"
// , async ()=>{});
//     await io.assert.expectToBeTrue(result12, "");
//     var result23 = await io.assert.checkElementState(
//       selectors.basePagePO.CLOSE
//     , "isVisible");
//     await io.assert.expectToBeTrue(result23, "");
//     var result24 = await io.assert.checkElementState(
//       selectors.basePagePO.MFA_SAVE
//     , "isVisible");
//     await io.assert.expectToBeTrue(result24, "");
// await test.step(
//       "***After Saving Unsaved Changes Save And Close Buttons Are Displayed***"
// , async ()=>{});
//     await io.homePage.click(
//       selectors.basePagePO.CLOSE_RIGHT_DRAWER
//     );
//     await io.homePage.clickButtonByIndex(
//       selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
//       1
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.INPUT_FILTER
//     );
//     test.step("***Clicked On Input Filter***", async ()=>{});
//     await io.homePage.click(
//       selectors.basePagePO.JAVASCRIPTWINDOW
//     );
//     await io.homePage.click(
//       selectors.flowBuilderPagePO.OPENAI.FUNCTION_NAME
//     );
//     await io.homePage.clearTextValue(
//       selectors.flowBuilderPagePO.OPENAI.FUNCTION_NAME
//     );
//     await io.homePage.click(
//       selectors.basePagePO.MFA_SAVE
//     );
//     await io.homePage.loadingTime();
//     var result6 = await io.assert.checkElementState(
//       selectors.basePagePO.SAVE
//     , "isDisabled");
// await test.step(
//       "***Save Button Is Greyed Out After Saving Unsaved Changes***"
// , async ()=>{});
//     expect(result6).toBeFalsy();
//     var result13 = await io.assert.checkElementState(
//       selectors.basePagePO.CLOSE
//     , "isDisabled");
// await test.step(
//       "***After Saving Unsaved Changes Close Button,X Is Active***"
// , async ()=>{});
//     await io.assert.expectToBeTrue(result13, "");
//     var result25 = await io.assert.checkElementState(
//       selectors.basePagePO.CLOSE
//     , "isVisible");
//     await io.assert.expectToBeTrue(result25, "");
//     var result26 = await io.assert.checkElementState(
//       selectors.basePagePO.SAVE
//     , "isVisible");
//     await io.assert.expectToBeTrue(result26, "");
// await test.step(
//       "***After Saving Unsaved Changes Save And Close Buttons Are Displayed***"
// , async ()=>{});
//     await io.homePage.navigateTo(io.connectorUrl + "scripts");
//     await io.homePage.click(
//       selectors.integrationPagePO.ADDNEWRESOURCE
//     );
//     test.step("***Navigated to Scripts***", async ()=>{});
//     await io.homePage.click(
//       selectors.basePagePO.ADD_NAME
//     );
//     await io.homePage.fillWebPage(
//       selectors.basePagePO.ADD_NAME,
//       "sample"
//     );
//     test.step("***Made Some Changes***", async ()=>{});
//     await io.homePage.click(
//       selectors.basePagePO.SAVE
//     );
//     await io.homePage.loadingTime();
//     var result7 = await io.assert.checkElementState(
//       selectors.basePagePO.SAVE
//     , "isDisabled");
// await test.step(
//       "***Save Button Is Greyed Out After Saving Unsaved Changes***"
// , async ()=>{});
//     expect(result7).toBeFalsy();
//     var result14 = await io.assert.checkElementState(
//       selectors.basePagePO.CLOSE
//     , "isDisabled");
// await test.step(
//       "***After Saving Unsaved Changes Close Button,X Is Active***"
// , async ()=>{});
//     await io.assert.expectToBeTrue(result14, "");
//     var result27 = await io.assert.checkElementState(
//       selectors.basePagePO.CLOSE
//     , "isVisible");
//     await io.assert.expectToBeTrue(result27, "");
//     var result28 = await io.assert.checkElementState(
//       selectors.basePagePO.SAVE
//     , "isVisible");
//     await io.assert.expectToBeTrue(result28, "");
// await test.step(
//       "***After Saving Unsaved Changes Save And Close Buttons Are Displayed***"
// , async ()=>{});
//   });
});
