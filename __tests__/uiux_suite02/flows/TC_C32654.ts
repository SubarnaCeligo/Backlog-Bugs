import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C102875 from '../../../testData/inputData/FlowBuilder/C102875.json';
import TC_C119790 from '../../../testData/inputData/FlowBuilder/C119790.json';

test.describe(`C32654 Verify Drawer title ,mapping screen layout for Response mapper and Lookup results mapper`, () => {
  let id;
  test.afterEach(async ({ io, page }) => {
      await io.api.deleteFlowViaAPI(id);
  });

  test(`@Env-All @Zephyr-IO-T5898 C32654 Verify Drawer title for Lookup results mapper`, async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(TC_C102875, "FLOWS");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DATA_PROCESSOR);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DATA_PROCESSOR);
    await io.flowBuilder.click(selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING);
    await expect(page.getByText('Edit response mapping')).toBeVisible();
  });

  test('@Env-All @Zephyr-IO-T5898 C32654 Verify Drawer title for Response mapper', async ({ io, page }) => { 
    id = await io.createResourceFromAPI(TC_C119790, "FLOWS");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DATA_PROCESSOR);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DATA_PROCESSOR);
    await io.flowBuilder.click(selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING);
    await expect(page.getByText('Edit results mapping')).toBeVisible();
  });
});
