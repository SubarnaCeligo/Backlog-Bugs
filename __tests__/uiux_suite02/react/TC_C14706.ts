import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C14706 Export Panel on Staging is Missing the Following Components", () => {
  test("@Env-All @Zephyr-IO-T2942 C14706 Export Panel on Staging is Missing the Following Components", async ({
    io,
    page
  }) => {
    await io.exportsPage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
    await io.homePage.loadingTime()
    await io.exportsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime()
    await io.exportsPage.clickByText("REST API (HTTP)");
    await io.homePage.loadingTime()
    await io.exportsPage.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.loadingTime()
    await io.exportsPage.fill(selectors.exportsPagePO.CONNECTIONS_DROPDOWN, "3PL CONNECTION");
    //await io.exportsPage.clickByText("3PL CONNECTION");
    await io.homePage.selectConnectionDropDown(page, "3PL CONNECTION")
    await io.homePage.loadingTime()
    await io.exportsPage.fill(selectors.basePagePO.NAME, "3PL Export");
    await io.exportsPage.click(selectors.basePagePO.SAVE);
    await io.exportsPage.click(selectors.importPagePO.HTTP_REQUEST);
    await io.homePage.loadingTime()
    await expect(page.getByRole("tab", { name: "Body" })).toBeVisible();
    await io.exportsPage.addStep("Verified that the 'Body' tab is visible");
    await expect(page.getByRole("tab", { name: "Headers" })).toBeVisible();
    await io.exportsPage.addStep("Verified that the 'Headers' tab is visible");
    await io.exportsPage.click(selectors.exportsPagePO.HTTP_RESPONSE);
    await expect(page.getByRole("tab", { name: "Body" })).toBeVisible();
    await io.exportsPage.addStep("Verified that the 'Body' tab is visible");
    await expect(page.getByRole("tab", { name: "Headers" })).toBeVisible();
    await io.exportsPage.addStep("Verified that the 'Headers' tab is visible");
  });
});
