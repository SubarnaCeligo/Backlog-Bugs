import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C27969 Verify the fields in 'Non-standard API response patterns' section are updated as per requirement in REST export and Lookups`, () => {
  test(`C27969 Verify the fields in 'Non-standard API response patterns' section are updated as per requirement in REST export and Lookups`, async ({
    io,
    page
  }) => {
    await io.exportsPage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
    await io.exportsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);
    await io.exportsPage.addStep("Clicked on 'add new resource' button");
    await io.exportsPage.clickByText("REST API (HTTP)");
    await io.exportsPage.addStep("Selected 'REST API (HTTP)' option");
    await io.exportsPage.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.exportsPage.addStep("Clicked on 'connections' dropdown");
    await io.exportsPage.clickByText("3PL CONNECTION");
    await io.exportsPage.addStep("Selected '3PL CONNECTION' option");
    await page.locator(selectors.exportsPagePO.NAME).fill("C27969");
    await io.exportsPage.addStep("Filled the name field with 'C27969'");
    await io.exportsPage.click(selectors.basePagePO.SAVE);
    await io.exportsPage.addStep("Clicked on 'save' button");
    await io.exportsPage.delay(2000);
    const tab = page.locator(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await tab.click();
    await io.exportsPage.addStep("Clicked on 'Non-standard API' tab");
    const divList = await tab.evaluate((e, tabContent) => {
      const list = e.parentElement.querySelector(tabContent).childNodes;
      const arr = [];
      // @ts-ignore
      list.forEach(el => arr.push(el.firstChild.id));
      return arr;
    }, selectors.exportsPagePO.NON_STANDARD_API_TAB_CONTENT);

    const firstId = divList[0];
    const secondId = divList[3];
    const thirdId = divList[4];

    await io.assert.expectToBeValue(
      "http.response.resourcePath",
      firstId,
      "First field is not 'http.response.resourcePath'"
    );
    await expect(
      page.getByText("Path to records in HTTP response body")
    ).toBeVisible();
    await io.exportsPage.addStep(
      "Verified 'Path to records in HTTP response body' text is visible"
    );

    await io.assert.expectToBeValue(
      "http.response.successPath",
      secondId,
      "Second field is not 'http.response.successPath'"
    );
    await expect(
      page.getByText("Path to success field in HTTP response body")
    ).toBeVisible();
    await io.exportsPage.addStep(
      "Verified 'Path to success field in HTTP response body' text is visible"
    );

    await io.assert.expectToBeValue(
      "http.response.successValues",
      thirdId,
      "Third field is not 'http.response.successValues'"
    );
    await expect(page.getByText("Success values")).toBeVisible();
    await io.exportsPage.addStep("Verified 'Success values' text is visible");
  });
});
