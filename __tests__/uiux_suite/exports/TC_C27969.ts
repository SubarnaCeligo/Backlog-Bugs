import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C27969 Verify the fields in 'Non-standard API response patterns' section are updated as per requirement in REST export and Lookups`, () => {
  test(`C27969 Verify the fields in 'Non-standard API response patterns' section are updated as per requirement in REST export and Lookups`, async ({
    io,
    page
  }) => {
    await io.exportsPage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
    await io.exportsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);
    await io.exportsPage.clickByText("REST API (HTTP)");
    await io.exportsPage.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.exportsPage.clickByText("3PL CONNECTION");
    await page.locator(selectors.exportsPagePO.NAME).fill("C27969");
    await io.exportsPage.click(selectors.basePagePO.SAVE);
    await io.exportsPage.delay(2000);
    const tab = page.locator(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await tab.click();
    const divList = await tab.evaluate(e => {
      const list = e.parentElement.querySelector(
        selectors.exportsPagePO.NON_STANDARD_API_TAB_CONTENT
      ).childNodes;
      const arr = [];
      // @ts-ignore
      list.forEach(el => arr.push(el.firstChild.id));
      return arr;
    });

    const firstId = divList[0];
    const secondId = divList[3];
    const thirdId = divList[4];

    expect(firstId).toBe("http.response.resourcePath");
    await expect(
      page.getByText("Path to records in HTTP response body")
    ).toBeVisible();

    expect(secondId).toBe("http.response.successPath");
    await expect(
      page.getByText("Path to success field in HTTP response body")
    ).toBeVisible();

    expect(thirdId).toBe("http.response.successValues");
    await expect(page.getByText("Success values")).toBeVisible();
  });
});
