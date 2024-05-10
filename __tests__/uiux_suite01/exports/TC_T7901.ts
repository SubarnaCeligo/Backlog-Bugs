import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T7901_Verify Logo for MariaDB connector in connectors list and connection page.[Exports]", () => {
    test("T7901_Verify Logo for MariaDB connector in connectors list and connection page.[Exports]", async ({ io, page }) => {
      await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
      //await page.click(selectors.basePagePO.RESOURCES);
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

      // also checking in imports page
      await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
      await io.homePage.goToMenu("Resources", "Exports");

      await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
      const mariaDBImageImports = await page.waitForSelector(selectors.connectionsPagePO.MARIADB_IMAGE)

      
      const srcImports = await mariaDBImageImports?.getAttribute("src");
      const heightImports = await mariaDBImageImports?.evaluate((node) => (node as HTMLImageElement).height);
      const widthImports = await mariaDBImageImports?.evaluate((node) => (node as HTMLImageElement).width);

      expect(srcImports).toContain("mariadb.png");
      expect(heightImports).toBeGreaterThan(10);
      expect(widthImports).toBeGreaterThan(10);
    });
}); 
