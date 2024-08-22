import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C98698 from '../../testData/inputData/FlowDebugger/C98698.json';

test.describe("TC_C108692 Verify Hotspot icons for handelbars", () => {
  test("@Zephyr-T23951 @Env-All @Priority-P2 TC_C108692 Verify Hotspot icons for handelbars UI_Backlog", async ({ io, page }) => {
    await io.createResourceFromAPI(C98698, "FLOWS");

    //Disable the flow
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_DRAG_DROP);
    const s3BucketHotspotIcons = await page.$$(selectors.exportsPagePO.S3_BUCKET_HOTSPOT_ICON);
    expect(s3BucketHotspotIcons.length).toBe(0);
    await io.flowBuilder.click(selectors.basePagePO.CLOSE);

    await page.waitForTimeout(20000)
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.IMPORT_DRAG_DROP, 1);
    const fileNameHotspotIconsText = await page.$$eval(selectors.exportsPagePO.FILE_NAME_HOTSPOT_ICON, elements => elements.map(element => element.textContent));
    fileNameHotspotIconsText.forEach(text => {
      expect(text).not.toContain('T');
    });
  });
});