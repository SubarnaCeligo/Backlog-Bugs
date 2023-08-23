import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C27965 Verify the fields in 'What would you like to export?' section are updated as per requirement in REST export and Lookups`, () => {
  test(`C27965 Verify the fields in 'What would you like to export?' section are updated as per requirement in REST export and Lookups`, async ({
    io,
    page
  }) => {
    await io.exportsPage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
    await io.exportsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);
    await io.exportsPage.clickByText("REST API (HTTP)");
    await io.exportsPage.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.exportsPage.clickByText("3PL CONNECTION");
    await page.locator(selectors.exportsPagePO.NAME).fill("C27965");
    await io.exportsPage.click(selectors.basePagePO.SAVE);
    await io.exportsPage.delay(2000);
    const divList = await page
      .locator(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB)
      .evaluate(e => {
        const list = e.parentElement.querySelector(
          selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB_CONTENT
        ).childNodes;
        const arr = [];
        // @ts-ignore
        list.forEach(el => arr.push(el.firstChild.id));
        return arr;
      });
    const firstId = divList[0];
    const secondId = divList[1];
    expect(firstId).toBe("http.method");
    expect(secondId).toBe("http.relativeURI");
  });
});
