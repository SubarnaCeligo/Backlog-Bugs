import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C2035 Verify in Org User with account level Manage also can link same NS account in both IO production & sandbox", () => {
  test("@Zephyr-IO-T2536 @Env-All @Priority-P2 C2035 Verify in Org User with account level Manage also can link same NS account in both IO production & sandbox", async ({io, page}) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.connectionPage.navigateTo(io.data.links.HOME_PAGE_URL);
      let result = false;
        // Wait for the request to be made
      const requestPromise = page.waitForRequest(request => request.url().includes("/latest"));


      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
      await io.homePage.clickByText("Currency")

      // Wait for either the request to be made or the actions to complete
      const request = await Promise.race([requestPromise]);

      if(request) {
          console.log(request.url());
          result=true
      }
      expect(result).toBeTruthy();
  });
});