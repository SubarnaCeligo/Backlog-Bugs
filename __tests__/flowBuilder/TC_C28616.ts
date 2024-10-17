
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";



test.describe("TC_C28616", () => {
  test("@Env-All @Zephyr-IO-T3067|Verify the sorting of the flows which are in progress and waiting in queue", async ({io, page}) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      "TC_C34143_Flow_DND"
    );
    await io.homePage.loadingTime();
    await io.homePage.clickByText("Automation Flows");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCH);
    await io.homePage.fill(
      selectors.flowBuilderPagePO.SEARCH,
      "TC_C34143_Flow_DND"
    );
    await io.homePage.loadingTime();
    await io.homePage.click("table >tbody >tr:nth-child(1) >td:nth-child(8)");
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.clickByText("Last run");
    await io.homePage.loadingTime();
    const cell = await page.locator("table >tbody >tr:nth-child(1) >th:nth-child(1)").textContent();
    expect(cell).toContain("TC_C34143_Flow_DND");
  });
});
