import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T34262 from "@testData/FlowBuilder/T34262.json";

test.describe("T34262 Input filter is not working once one to many is applied", () => {
  test("@Env-All @Zephyr-IO-T34262 @Priority-P2 T34262 Input filter is not working once one to many is applied", async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(T34262, "FLOWS");

    await io.flowBuilder.addStep('*** Open lookup ***');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP);
    

    await io.flowBuilder.addStep('*** Clicking on preview ***');
    await io.flowBuilder.click(selectors.importPagePO.CLICKPREVIEW);
    
    await io.flowBuilder.addStep('*** Getting the preview results ***');
    await io.flowBuilder.clickByText('Copy');

    await io.flowBuilder.addStep('*** Validting preview results ***');
    const previewResults = JSON.parse(await page.evaluate("navigator.clipboard.readText()"));
    expect(previewResults.page_of_records).not.toBeUndefined();

    await io.flowBuilder.addStep('*** Clicking on edit mock input ***');
    await io.flowBuilder.clickByText('Edit mock input');

    await io.flowBuilder.addStep('*** Getting the edit mock input data ***');
    await io.flowBuilder.click(selectors.exportsPagePO.SAMPLE_DATA_CONTENTS);
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Control+C');
    await page.keyboard.press('Meta+C');
    const mockInputResults = JSON.parse(await page.evaluate("navigator.clipboard.readText()"));

    await io.flowBuilder.addStep('*** Validting mock input data ***');
    expect(mockInputResults.page_of_records).not.toBeUndefined();
    expect(mockInputResults.page_of_records[0].record).toEqual(expect.objectContaining(previewResults.page_of_records[0].record.users[0].photo.thumbnails[0]));

  });
});
