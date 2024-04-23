import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C98698 from '../../../testData/inputData/FlowDebugger/C98698.json';


test.describe("TC_C107706 Verify that T badge is consistent in all the places for test mode.", () => {
  test("@Zephyr-T24089 @Env-All @Priority-P2 Verify that T badge is consistent in all the places for test mode. UI_Backlog", async ({ io, page }) => {
    await io.createResourceFromAPI(C98698, "FLOWS");

    //Disable the flow
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);

    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
    
    const resourceBadges = await page.$$('[data-test="Transfer"] .MuiBadge-badge');

    const exportBadge = resourceBadges[0];
    expect(await exportBadge.screenshot()).toMatchSnapshot("TIconExport.png");

    const lookupBadge = resourceBadges[1];
    expect(await lookupBadge.screenshot()).toMatchSnapshot("TIconLookup.png");

    const importBadge = resourceBadges[2];
    expect(await importBadge.screenshot()).toMatchSnapshot("TIconLookup.png");

    const exportTransformationBadge = await page.$(selectors.exportsPagePO.EXPORT_TRANSFORMATION_HOTSPOT_ICON);
    expect(await exportTransformationBadge.screenshot()).toMatchSnapshot("TIcon-1.png");

    const exportFilterBadge = await page.$(selectors.exportsPagePO.EXPORT_FILTER_HOTSPOT_ICON);
    expect(await exportFilterBadge.screenshot()).toMatchSnapshot("TIcon-1.png", {maxDiffPixelRatio: 0.1});

    const inputFilterBadge = await page.$('[data-test="inputFilter"] .MuiBadge-badge');
    expect(await inputFilterBadge.screenshot()).toMatchSnapshot("TIcon-1.png",{maxDiffPixelRatio: 0.1});

    const lookupTransformationBadge = await page.$('[data-test="lookupTransformation"] .MuiBadge-badge');
    expect(await lookupTransformationBadge.screenshot()).toMatchSnapshot("TIcon-1.png", {maxDiffPixelRatio: 0.1});

    const importMappingBadge = await page.$(selectors.importPagePO.IMPORT_MAPPINGS_HOTSPOT_ICON);
    expect(await importMappingBadge.screenshot()).toMatchSnapshot("TIcon-1.png", {maxDiffPixelRatio: 0.1});

    


  
  });
});