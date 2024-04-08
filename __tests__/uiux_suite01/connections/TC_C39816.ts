import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C39816 To Verify Anaplan Logo on Connection form", () => {
  test("@Env-All C39816 To Verify Anaplan Logo on Connection form", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await page.click(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    const mariaDBImage = await page.waitForSelector(selectors.connectionsPagePO.ANAPLAN_CONNECTOR_IMAGE)
    
    const src = await mariaDBImage?.getAttribute("src");
    const height = await mariaDBImage?.evaluate((node) => (node as HTMLImageElement).height);
    const width = await mariaDBImage?.evaluate((node) => (node as HTMLImageElement).width);

    // checking for image src and minimum height and width to verify it is rendered correctly
    expect(src).toContain("anaplan.png");
    expect(height).toBeGreaterThan(10);
    expect(width).toBeGreaterThan(10);
  });
});
