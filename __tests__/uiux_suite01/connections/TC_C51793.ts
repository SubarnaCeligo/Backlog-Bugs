import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
 
test.describe("C51793 Verify the help guide is shown once user click on Cant find  link when toggle is under simple", () => {
    test("C51793 Verify the help guide is shown once user click on Cant find  link when toggle is under simple   ", async ({io, page}) => {
      await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL)
      await io.connectionPage.clickByText("Create connection")
      await io.connectionPage.click(selectors.basePagePO.JAZZHR_SELECTOR)
      const expectedUrl = "https://docs.celigo.com/hc/en-us/articles/4414650330139#Client-Info";
      const anchor = await page.locator('a:has-text("Can\'t find?")').nth(0);
      const hrefAttribute = await anchor.getAttribute('href');
      expect(hrefAttribute).toBe(expectedUrl);
      
    });
  });