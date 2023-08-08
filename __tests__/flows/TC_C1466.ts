import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C1466 Verify,user able to select single or multiple options from 'Notify me when connection goes offline'", () => {

  test("C1466 Verify,user able to select single or multiple options from 'Notify me when connection goes offline'", async ({
    io, page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.clickByText("Automation Flows");
    await io.homePage.click(selectors.integrationPagePO.NOTIFICATIONS_TAB);
    await io.homePage.click('[data-test=connections]');
    for (const row of await page.getByRole('option').all()){
        await row.click();
    }
    const options = await page.getByRole('option').all();
    options.forEach(async option => {
        await expect(option).toHaveAttribute("aria-selected", "true");
    })
  });
});