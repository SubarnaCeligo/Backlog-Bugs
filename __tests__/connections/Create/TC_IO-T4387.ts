import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import bodyOffline from "@testData/Connections/IO_T4387_offline.json"
import bodyOnline from "@testData/Connections/IO_T4387_online.json"

test.describe("TC_IO-T4387", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.connections.deleteConnection(bodyOffline.name)
  });
  test("@Env-All Verify when the offline connection is made online, success colour is changed to green.", async ({
    io,
    page
  }) => {
    let actualJson;
    await test.step("*** Creating Offline Connection ***", async () => {
      actualJson = await io.connections.createConnectionViaAPI(bodyOffline);
      await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    });

    await test.step("*** Verifying the created connection and making it offline***", async () => {
      await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, bodyOffline.name);
      await io.assert.expectToBeTrue(await io.homePage.isVisible(`text=${bodyOffline.name}`), "Connection is not created");
      await io.connectionPage.click(selectors.integrationPagePO.OPENACTIONSMENU);
      await io.connectionPage.clickByText("Edit connection");
      await io.connectionPage.loadingTime();
      await io.connectionPage.click(selectors.flowBuilderPagePO.CLOSE);

      await page.getByText('Offline', { exact: true }).waitFor({ state: 'visible', timeout: 60000 });
      await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.CONNECTION_STATUS, 'aria-label', 'error');

    });

    await test.step("*** Making the connection online and verify if the success color is green ***", async () => {
      await io.connections.createOrEditConnection(bodyOnline);
      await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, bodyOffline.name);
      await io.assert.expectToBeTrue(await io.homePage.isVisible(`text=${bodyOffline.name}`), "Connection is not created");
      await io.connectionPage.loadingTime();
      await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.CONNECTION_STATUS, 'aria-label', 'success');
      await expect(page.getByRole("status")).toHaveCSS("background-color", "rgb(76, 187, 2)");
    });

  });
});