import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C28982 Verify Connection status is displaying correctly in create export/ import form`, () => {
  test(`@Priority-P2 @Zephyr-IO-T14722 @Env-All C28982`, async ({
    io,
    page
  }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.delay(2000);
    await io.flowBuilder.clickByText("HTTP");
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.homePage.loadingTime()
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.exportsPagePO.CONNECTIONS_DROPDOWN, "3PL CONNECTION");
    await page
      .locator(`${selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST} li`)
      .filter({ hasText: "3PL CONNECTION" })
      .first()
      .click()
    await expect(page.getByText("Online")).toBeVisible();
    await io.assert.verifyElementDisplayedByText(
      "Online",
      "'Online' is not displayed"
    );
    const element = await page.getByText("Online");
    const color = await element.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.getPropertyValue('color');
    });

    let result=false
    if (color === 'rgb(4, 120, 87)') {
      result =true
    } else {
      console.error("The color is not as expected. Found:", color);
    }
    await expect(result).toBe(true);

    });
});
