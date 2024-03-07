import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import body from "@testData/Connections/IO_T4387.json"

test.describe("TC_IO-T4387", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.connections.deleteConnection(body.name)
  });
  test("Verify when the offline connection is made online, success colour is changed to green.", async ({
    io,
    page
  }) => {
    let actualJson;
    await test.step("*** Creating Offline Connection ***", async () => {
      actualJson = await io.connections.createConnectionViaAPI(body);
      await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    });

    await test.step("*** Verifying the created connection and making it offline***", async () => {
      await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, body.name);
      await io.assert.expectToBeTrue(await io.homePage.isVisible(`text=${body.name}`), "Connection is not created");
      await io.connectionPage.click(selectors.integrationPagePO.OPENACTIONSMENU);
      await io.connectionPage.clickByText("Edit connection");
      await io.connectionPage.delay(1000);
      await io.connectionPage.click(selectors.flowBuilderPagePO.CLOSE);

      await page.getByText('Offline', { exact: true }).waitFor({ state: 'visible', timeout: 60000 });
      const connectionStatus = await page.$eval(selectors.flowBuilderPagePO.CONNECTION_STATUS, (span) => span.getAttribute('aria-label'));
      let result = connectionStatus === 'error';
      // Determine the connection status based on the aria-label value
      await io.assert.expectToBeTrue(result, "Connection is not Offline");

    });

    await test.step("*** Making the connection online and verify if the success color is green ***", async () => {
      const connectionData = {
        importJSON: {
          ...body, ftp: { ...body.ftp, username: process.env["FTP_IPASS2_USERNAME"], password: "Test@123456", qa__password: process.env["FTP_IPASS2_PASSWORD"] },
        },
        apiJSON: true,
      }

      await io.connections.createOrEditConnection(connectionData);
      await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, body.name);
      await io.assert.expectToBeTrue(await io.homePage.isVisible(`text=${body.name}`), "Connection is not created");
      await io.connectionPage.delay(2000);
      const connectionStatus = await page.$eval(selectors.flowBuilderPagePO.CONNECTION_STATUS, (span) => span.getAttribute('aria-label'));
      let result = connectionStatus === 'success';
      await io.assert.expectToBeTrue(result, "Connection is Offline");
      await expect(page.getByRole("status")).toHaveCSS("background-color", "rgb(76, 187, 2)");
    });

  });
});