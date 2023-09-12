import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("To verify that the user is able to load integration from dev playground page.", () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("To verify that the user is able to load integration from dev playground page.", async ({
    io,
    page
  }) => {
    await io.homePage.goToMenu("Tools", "Playground");
    await io.homePage.clickByText("Automation Flows");
    await page.getByText("TC_51661_DND").nth(1).click();
    await io.homePage.clickByText("Open in Flow Builder");
    const flowBuilderText = await page.evaluate(() => {
      const pElement = document.querySelector(
        ".MuiBreadcrumbs-li p.MuiTypography-body2"
      );
      return pElement ? pElement.textContent : null;
    });

    // Use an assertion library to check if the text is as expected
    const expectedText = "Flow builder";
    io.assert.expectToBeValue(
      expectedText,
      flowBuilderText,
      "unable to find locator"
    );
  });
});
