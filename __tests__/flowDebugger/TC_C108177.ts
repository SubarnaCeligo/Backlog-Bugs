import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C108177 from '../../testData/inputData/FlowDebugger/C108177.json';

test.describe("TC_C108177 Verify the dropdown height for list of sources when selecting the source (enabled and disabled flows)", () => {
  test("@Zephyr-T24102 @Env-All @Priority-P2 TC_C108177 Verify the dropdown height for list of sources when selecting the source (enabled and disabled flows). UI_Backlog", async ({ io, page }) => {
    await io.createResourceFromAPI(C108177, "FLOWS");

    //Disable the flow
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
 
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN);
    const dropdown = await page.locator(`${selectors.flowBuilderPagePO.SELECT_PAGE_GENERATOR_POPPER} ul`);
    const dropdownHeight = await dropdown.evaluate((el) => {
        return window.getComputedStyle(el).getPropertyValue('max-height');
    }); 

    expect(dropdownHeight).toEqual("496px");
  });
});