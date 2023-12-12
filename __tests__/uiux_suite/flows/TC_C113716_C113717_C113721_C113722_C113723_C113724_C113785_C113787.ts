import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Flows/TC_C113716.json";

test.describe(`TC_C113716_C113717_C113721_C113722_C113723_C113724_C113785_C113787 To verify flow debugger for ns lookups`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
});
  test(`TC_C113716_C113717_C113721_C113722_C113723_C113724_C113785_C113787 To verify flow debugger for ns lookups`, async ({
    io,
    page
  }) => {
  await io.createResourceFromAPI(testData, "FLOWS");
  await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
  await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
  await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_ON_OFF);
  await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.RUNTEST_BUTTON, 0);
  await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUNTEST_BUTTON_TOP_XPATH);
  await io.flowBuilder.addStep("Verified the flow ran successfully");
  await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
  await io.flowBuilder.click(selectors.importPagePO.SWITCH_TO_MAPPING)
  await io.flowBuilder.click(selectors.importPagePO.MAPPING_LOOKUP_T_ICON);
  await io.flowBuilder.loadingTime();
  await io.flowBuilder.click(selectors.importPagePO.ADVANCED); 
  await io.flowBuilder.loadingTime();
  let datatst= await page.$$(selectors.flowBuilderPagePO.GEAR_ICON);
  console.log(datatst.length)
  await datatst[42].click();
  const contents = (await io.importsPage.getText(selectors.importPagePO.TEST_RESULTS_CONTENTS)).toString();
  let status=false
  const recordString = 'Record 1,Line 1,Line 2,Record 2,Line 1,Line 2,Line 3,Record 3';
  if(contents.includes(recordString)){status=true}
 await io.assert.expectToBeTrue(status, "Test results are not displayed")
  
});
});
