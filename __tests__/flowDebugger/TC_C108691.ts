import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C98698 from '../../testData/inputData/FlowDebugger/C98698.json';

test.describe("TC_C108691 Verify the notification pop-up when edit has been saved", () => {
  test("@Zephyr-T23950 @Env-All @Priority-P2 TC_C108691 Verify the notification pop-up when edit has been saved UI_Backlog", async ({ io, page }) => {
    await io.createResourceFromAPI(C98698, "FLOWS");

    //Disable the flow
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.RUNTEST_BUTTON, 1);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);

    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER, 0);
    const element = page.locator(selectors.exportsPagePO.FILE_FILTER_CONDITIONS);
    await element.scrollIntoViewIfNeeded();

    await io.flowBuilder.fillByIndex(selectors.exportsPagePO.FILE_FILTER_CONDITIONS_FILE_NAME_INPUT, 'test.csv', 0);
    await page.keyboard.press('Enter');
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await page.waitForTimeout(2000);

    let alert = await page.locator(selectors.flowGroupingPagePO.ALERT_MESSAGE);
    let alertText = await alert.evaluate((el) => {
        return el.textContent
    }); 

    expect(alertText).toEqual("Test results were cleared because you made flow edits.Run a new test after making edits to see accurate results.");
    await page.waitForTimeout(5000);

    let alert1 = await page.$$(selectors.flowGroupingPagePO.ALERT_MESSAGE);
    expect(alert1.length).toBe(0);
  });
});