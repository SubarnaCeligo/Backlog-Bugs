import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C26374 To verify "Integrations to transfer" dropdown is updated to latest.`, () => {
  test(`@Env-All @Zephyr-IO-T6963 C26374 To verify "Integrations to transfer" dropdown is updated to latest.`, async ({
    page,
    io
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.homePagePO.TRANSFER);
    await io.myAccountPage.clickByText("Create transfer");
    await io.myAccountPage.clickByText("Please select");
    const ulElement = await page.$(selectors.basePagePO.LISTBOX_ROLE);

    if (ulElement) {
      const hasTransferIntegration = await ulElement.evaluate(ul => {
        const liElements = ul.querySelectorAll("li");
        for (const li of liElements) {
          if (li.textContent.includes("Transfer integration")) {
            return true;
          }
        }
        return false;
      });

      await io.assert.expectToBeValue(
        hasTransferIntegration.toString(),
        "false",
        "Integration is found"
      );
    }
  });
});
