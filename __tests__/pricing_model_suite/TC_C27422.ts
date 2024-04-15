import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("C27422 Verify the endpoint under subscription page when it exceed the limit.", () => {
  test("C27422 Verify the endpoint under subscription page when it exceed the limit.", async ({
    io,
    page
  }) => {
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");

    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      {...getLicensePayload(platformLicense), numEndpoints: 1}
    );

    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
    await page.waitForLoadState("load", { timeout: 60000 });
    const progressBars = await page
      .locator(selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR)
      .all();

    const lst = [];
    
    for(const row of progressBars) {
      const items = await row.locator("span").all();
      items.forEach(async item => {
        const color = await item.evaluate(
          el => getComputedStyle(el).backgroundColor
        );
        lst.push(color);
      });
    }

    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      getLicensePayload(platformLicense)
    );

    let n = lst.length;
    expect(lst[n-6]).toBe("rgb(255, 60, 60)");
  });
});
