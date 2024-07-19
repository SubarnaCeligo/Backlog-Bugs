import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C2034 Verify if we are able to link same NS account in both IO production & sandbox.", () => {
  test("@Zephyr-IO-T2535 @Env-All @Priority-P2 C2034 Verify if we are able to link same NS account in both IO production & sandbox.", async ({io, page}) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.flowBuilder.loadingTime();
      await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
      await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
      let result = false;
      // Set up a promise that resolves when the specific request is made
      const requestPromise = page.waitForRequest(request => request.url().includes("/ping"));

      await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, 'HTTP CONNECTION SANDBOX NEW');
      await io.homePage.clickByTextByIndex("HTTP CONNECTION SANDBOX NEW",0);

      // Wait for either the request to be made or the actions to complete
      const request = await Promise.race([requestPromise]);

      if(request) {
          console.log(request.url());
          result=true
      }
      expect(result).toBeTruthy();
  });
});