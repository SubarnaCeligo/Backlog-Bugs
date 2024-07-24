import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/FlowBuilder/C66299.json";

test.describe(`IO-24878 Verify Separator/Divider Line added between the icon buttons as per the mocks (in both test and production modes).`, () => {
  test(`@Env-All @Zephyr-IO-T24878 IO-24878 Verify Separator/Divider Line added between the icon buttons as per the mocks (in both test and production modes).`, async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(testData, "FLOWS");
    await io.flowBuilder.loadingTime();
    // test mode
    await io.flowBuilder.click(selectors.basePagePO.ENABLESSO);
    await io.flowBuilder.click(selectors.myAccountPagePO.CONFIRMDISABLE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached('.MuiDivider-root');
    let dividerCount = await page.locator('.MuiDivider-root').count();
    expect(dividerCount).toBe(4);
    // production mode
    await io.flowBuilder.click(selectors.basePagePO.ENABLESSO);
    await io.flowBuilder.waitForElementAttached('.MuiDivider-root');
    dividerCount = await page.locator('.MuiDivider-root').count();
    expect(dividerCount).toBe(4);
  });
});