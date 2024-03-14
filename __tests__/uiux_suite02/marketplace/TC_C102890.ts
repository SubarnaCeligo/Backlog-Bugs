import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as testData from "@testData/Marketplace/C22282.json";

test.describe("TC_C102890 'Frequently selected' and 'All Application A->Z' filter content is scrollable inside the container", () => {
  test.beforeEach(async ({ io }) => {
    await io.flowBuilder.navigateTo(
      process.env["IO_UI_CONNECTOR_URL"] + "marketplace"
    );
  });
  test("C102890 'Frequently selected' and 'All Application A->Z' filter content is scrollable inside the container", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.MARKETPLACE);
    await io.homePage.goToMenu("Marketplace");
    let scrolling = await page.getByText(testData["allapplications(a - z)"]);
    const isScrollable = await scrolling.evaluate(
      e => e.parentElement.scrollHeight > e.parentElement.clientHeight
    );
    await io.assert.expectToBeTrue(isScrollable, "Description is not scrollable");
  });
});
