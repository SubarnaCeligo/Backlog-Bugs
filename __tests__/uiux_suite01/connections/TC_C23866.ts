
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("C23866 To Verify user is able to edit and save the 'Freshworks CRM' Connection", () => {
    test("@Env-QA C23866 To Verify user is able to edit and save the 'Freshworks CRM' Connection", async ({io, page}) => {
      await io.homePage.navigateTo (io.data.links.CONNECTIONS_PAGE_URL);
      await io.homePage.fill(selectors.flowBuilderPagePO.SEARCH, "FRESHSALES_TEST");
      await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.JOBS_ROWS);
      await io.homePage.clickByTextByIndex("FRESHSALES_TEST", 0);
      await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_SBDOMAIN)
      await io.connectionPage.fill(selectors.basePagePO.HTTP_SBDOMAIN,"subdomain_value")
      await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_APIKEY)
      await io.connectionPage.fill(selectors.basePagePO.HTTP_APIKEY,"APIkey_value")
      await io.connectionPage.waitForElementAttached(selectors.basePagePO.HTTP_APIKEY)
      await io.assert.verifyElementIsDisplayed(selectors.importPagePO.PASSWORD,  "API key values not displayed with asterisk(***)")
      await io.connectionPage.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE)
      await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE)
      await io.connectionPage.click(selectors.basePagePO.MFA_SAVE)
    });
  });
 