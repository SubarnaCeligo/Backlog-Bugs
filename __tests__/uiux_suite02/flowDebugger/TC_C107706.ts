import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C98698 from '../../../testData/inputData/FlowDebugger/C98698.json';


test.describe("TC_C107706 Verify that T badge is consistent in all the places for test mode.", () => {
  test("@Zephyr-T24089 @Env-All @Priority-P2 Verify that T badge is consistent in all the places for test mode. UI_Backlog", async ({ io, page }) => {
    await io.createResourceFromAPI(C98698, "FLOWS");

    //Disable the flow
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).first().click()

    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
    
    const resourceBadges = await page.$$(selectors.exportsPagePO.TRANSFER_HOTSPOT_ICON);

    const exportBadge = resourceBadges[0];
    expect(await exportBadge.screenshot()).toMatchSnapshot("TIconExport.png", {maxDiffPixelRatio: 0.2});

    const lookupBadge = resourceBadges[1];
    expect(await lookupBadge.screenshot()).toMatchSnapshot("TIconLookup.png", {maxDiffPixelRatio: 0.2});

    const importBadge = resourceBadges[2];
    expect(await importBadge.screenshot()).toMatchSnapshot("TIconLookup.png", {maxDiffPixelRatio: 0.2});

    const exportTransformationBadge = await page.$(selectors.exportsPagePO.EXPORT_TRANSFORMATION_HOTSPOT_ICON);
    expect(await exportTransformationBadge.screenshot()).toMatchSnapshot("TIcon-1.png", {maxDiffPixelRatio: 0.2});

    const exportFilterBadge = await page.$(selectors.exportsPagePO.EXPORT_FILTER_HOTSPOT_ICON);
    expect(await exportFilterBadge.screenshot()).toMatchSnapshot("TIcon-1.png", {maxDiffPixelRatio: 0.2});

    const inputFilterBadge = await page.$(selectors.importPagePO.INPUT_FILTER_HOTSPOT_ICON);
    expect(await inputFilterBadge.screenshot()).toMatchSnapshot("TIcon-1.png",{maxDiffPixelRatio: 0.2});

    const lookupTransformationBadge = await page.$(selectors.exportsPagePO.LOOKUP_TRANSFORMATION_HOTSPOT_ICON);
    expect(await lookupTransformationBadge.screenshot()).toMatchSnapshot("TIcon-1.png", {maxDiffPixelRatio: 0.2});

    const importMappingBadge = await page.$(selectors.importPagePO.IMPORT_MAPPINGS_HOTSPOT_ICON);
    expect(await importMappingBadge.screenshot()).toMatchSnapshot("TIcon-1.png", {maxDiffPixelRatio: 0.2});

    


  
  });
});