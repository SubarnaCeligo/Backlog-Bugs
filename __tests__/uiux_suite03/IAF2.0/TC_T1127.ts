import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`T1127 - Production and sandbox color change for shopify landing page UI_Backlog`, () => {
  test(`@Env-All T1127 - Production and sandbox color change for shopify landing page UI_Backlog`, async ({ io, page }) => {
    await io.homePage.navigateTo(
      process.env["IO_UI_CONNECTOR_URL"] +
        "landing/shopify"
    );

    const productionElement = await page.waitForSelector(selectors.integrationPagePO.NEW_OPTION);
    
    const productionBackgroundColor = await productionElement.evaluate((el: any) => {
      let currentElement = el;
      let color = getComputedStyle(currentElement).backgroundColor;
      while (color === 'rgba(0, 0, 0, 0)' || color === 'transparent') {
        currentElement = currentElement.parentElement;
        color = getComputedStyle(currentElement).backgroundColor;
      }

      return color;
    });

    await io.connectionPage.addStep("Verified the background for production");
    expect(productionBackgroundColor).toBe("rgb(248, 250, 255)");

    await io.connectionPage.addStep("Clicking on sandbox button");
    await io.flowBuilder.clickByIndex(selectors.homePagePO.SANDBOX_BUTTON, 1);

    const sandboxElement = await page.waitForSelector(selectors.integrationPagePO.NEW_OPTION);
    const sandboxBackgroundColor = await sandboxElement.evaluate((el: any) => {
      let currentElement = el;
      let color = getComputedStyle(currentElement).backgroundColor;
      while (color === 'rgba(0, 0, 0, 0)' || color === 'transparent') {
        currentElement = currentElement.parentElement;
        color = getComputedStyle(currentElement).backgroundColor;
      }

      return color;
    });

    await io.connectionPage.addStep("Verified the background for sandbox");
    expect(sandboxBackgroundColor).toBe("rgb(245, 245, 240)");

    await io.connectionPage.addStep("Clicking on production button");
    await io.flowBuilder.clickByIndex(selectors.homePagePO.PRODUCTION_BUTTON, 1);
  });
});