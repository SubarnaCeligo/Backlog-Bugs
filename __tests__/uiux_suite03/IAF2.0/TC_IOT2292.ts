import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_IOT2292 Verify logostrip component has been added to the Integration apps", () => {
  test("@Env-All @Zephyr-IO-T2292 C36478 Verify logostrip component has been added to the Integration apps", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Resources", "Integration apps");
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR,
      "TC_IOT2292_DND"
    );

    const imageOne = page.locator('img[alt="mysql"]');
    const imageTwo = page.locator('img[alt="netsuite"]');
    const imageThree = page.locator('img[alt="salesforce"]');
    const plusIcon = page.locator("li").filter({ hasText: "+" });

    await expect(imageOne).toBeVisible();
    await expect(imageTwo).toBeVisible();
    await expect(imageThree).toBeVisible();

    await plusIcon.click();
    const imageFour = page.locator('img[alt="http"]');
    const imageFive = page.locator('img[alt="webhook"]');

    await expect(imageFour).toBeVisible();
    await expect(imageFive).toBeVisible();
   

  });
});
