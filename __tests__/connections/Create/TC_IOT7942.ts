import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("Verify Logo for MariaDB connector", () => {
    test("@Env-All @Zephyr-IO-T7942 C77929 Verify Logo for MariaDB connector in connectors list and connection page.[Connection]", async ({
      io,
      page
    }) => {
            await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
            await io.homePage.goToMenu("Resources", "Connections");
            await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_NEW_RESOURCE)
            await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
            await page.waitForSelector(selectors.connectionsPagePO.MARIADB_IMAGE)
            const mariaDBImage = await page.$(selectors.connectionsPagePO.MARIADB_IMAGE)
            const src = await mariaDBImage?.getAttribute("src");
            const height = await mariaDBImage?.evaluate((node) => (node as HTMLImageElement).height);
            const width = await mariaDBImage?.evaluate((node) => (node as HTMLImageElement).width);

            // checking for image src and minimum height and width to verify it is rendered correctly
            expect(src).toContain("mariadb.png");
            expect(height).toBeGreaterThan(10);
            expect(width).toBeGreaterThan(10);
        });
    });
