import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C2735 Verify Caching of NS metadata routes for Unification", () => {
  test("@Zephyr-IO-T2543 @Env-All @Priority-P2 C2735 Verify Caching of NS metadata routes for Unification", async ({io, page}) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
      let result = false;
      // Set up a promise that resolves when the specific request is made
      const requestPromise = page.waitForRequest(request => request.url().includes("/ping"));

      await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, '616_NS_Connection v2 pratham');
      await io.homePage.clickByText("616_NS_Connection v2 pratham");

      // Wait for either the request to be made or the actions to complete
      const request = await Promise.race([requestPromise]);

      if(request) {
          console.log(request.url());
          result=true
      }
      expect(result).toBeTruthy();
  });
});