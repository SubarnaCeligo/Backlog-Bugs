
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '../../testData/inputData/GENERAL/TC_C32615.json'

test.describe("TC_C32618_Verify_the_Column _names", () => {
  let flowId
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test("@Env-All @Zephyr-IO-T9593 @Zephyr-IO-T9594 @Zephyr-IO-T9595 C32618 C32619 C32620 TC_C32618_Verify_the_Column _names", async ({io,page}, testInfo) => {
    flowId = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await page.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime();
    await page.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);

    await page.click(selectors.flowBuilderPagePO.ASYNCHELPER);
    await io.homePage.loadingTime();


    await page.click('[data-test="http._asyncHelperId"]'); 
    await io.homePage.clickByText('test-async-helper_DND');
    await io.homePage.loadingTime();

    await io.homePage.clickByIndex(selectors.integrationPagePO.EDITRESOURCE, 1);
    await io.homePage.loadingTime();

    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.ERRORVALUES_ASYNCHELPER, 'Error values filed is not displayed');


    const errorValue = await (await page.$(selectors.flowBuilderPagePO.ERRORVALUES_ASYNCHELPER)).evaluate(el => el.innerHTML);
    await io.assert.expectToBeTrue(errorValue.includes('error-value-1'), 'Error value is not displayed');
  });
});
