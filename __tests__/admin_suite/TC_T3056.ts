import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T3056 Verify user with Admin access is able to view and sort the Applications, Last Open error and Type fields based on their permissions", () => {
  test("@Env-All @Priority-P2 @Zephyr-IO-T3056 C33328 Verify user with Admin access is able to view and sort the Applications, Last Open error and Type fields based on their permissions", async ({
    page,
    io
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.myAccountPage.loadingTime();
    await io.flowBuilder.click(selectors.homePagePO.LIST_VIEW);
    await io.myAccountPage.loadingTime();

    const applicationElement = await page.getByText('Applications');
    const errorElement = await page.getByText('Last open error');
    const typeElement = await page.getByText('Type');

    expect(applicationElement).toBeVisible();
    expect(errorElement).toBeVisible();
    expect(typeElement).toBeVisible();

    await errorElement.click();
    await io.myAccountPage.loadingTime();
    expect(await errorElement.textContent()).toContain('sorted descending')
    await typeElement.click();
    await io.myAccountPage.loadingTime();
    expect(await typeElement.textContent()).toContain('sorted ascending')

    await io.flowBuilder.click(selectors.homePagePO.TILE_VIEW);
  });
});