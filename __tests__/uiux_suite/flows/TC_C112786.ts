import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from '../../../testData/inputData/FlowDebugger/TC_C112786.json';

test.describe("Bug# IO-55940 - Lookup in NS import is being reset after configuring conditional mapping(advanced lookup)", () => {
    test("Bug# IO-55940 - Lookup in NS import is being reset after configuring conditional mapping(advanced lookup)", async ({ io, page }) => {

        await io.createResourceFromAPI(testData, "FLOWS");
  await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
  await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
  await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
  await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_ON_OFF);
  await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.RUNTEST_BUTTON, 0);
  await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUNTEST_BUTTON_TOP_XPATH);
  await io.flowBuilder.addStep("Verified the flow ran successfully");

  await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT_MAPPINGS) 
  await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

  await io.flowBuilder.click(selectors.importPagePO.SWITCH_TO_MAPPING)

  await io.flowBuilder.click(selectors.importPagePO.MAPPING_LOOKUP_T_ICON);
  await io.flowBuilder.loadingTime();
  await io.flowBuilder.click(selectors.importPagePO.ADVANCED); 
  await io.flowBuilder.loadingTime();
  await io.flowBuilder.click(selectors.importPagePO.ADVANCED); 
  let datatst= await page.$$(selectors.flowBuilderPagePO.GEAR_ICON);
  console.log(datatst.length)
  await datatst[43].click();
  const contents = (await io.importsPage.getText(selectors.importPagePO.TEST_RESULTS_CONTENTS)).toString();
  let status=false
  const recordString = 'Record 1,Line 1,Line 2,Record 2,Line 1,Line 2,Line 3,Record 3';
  if(contents.includes(recordString)){status=true}
 await io.assert.expectToBeTrue(status, "Test results are not displayed")

    });
});