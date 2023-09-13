import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C27965 Verify the fields in 'What would you like to export?' section are updated as per requirement in REST export and Lookups`, () => {
  test(`C27965 Verify the fields in 'What would you like to export?' section are updated as per requirement in REST export and Lookups`, async ({
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
    await page.locator(selectors.exportsPagePO.NAME).fill("C27965");
    await io.exportsPage.addStep("Filled the name field with 'C27965'");
    await io.exportsPage.click(selectors.basePagePO.SAVE);
    await io.exportsPage.addStep("Clicked on 'save' button");
    await io.exportsPage.waitForElementAttached(
      selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB
    );
    const divList = await page
      .locator(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB)
      .evaluate((e, tabContent) => {
        const list = e.parentElement.querySelector(tabContent).childNodes;
        const arr = [];
        // @ts-ignore
        list.forEach(el => arr.push(el.firstChild.id));
        return arr;
      }, selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB_CONTENT);

    const firstId = divList[0];
    const secondId = divList[1];

    await io.assert.expectToBeValue(
      "http.method",
      firstId,
      "First field is not 'http.method'"
    );
    await io.assert.expectToBeValue(
      "http.relativeURI",
      secondId,
      "Second field is not 'http.relativeURI'"
    );
  });
});
