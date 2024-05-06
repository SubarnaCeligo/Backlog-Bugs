import { expect, test } from "@celigo/ui-core-automation";
import TC from "@testData/Connections/Create/Create_Connection_HTTP_Basic_JSON_Zendesk.json";
import { decrypt } from "@celigo/aut-utilities";
import * as selectors from "@celigo/aut-selectors";

async function addNewConnectionStandalone(io: any, connectionName: string) {
  await io.homePage.clickByText("Standalone flows");
  await io.homePage.addStep("*** Clicked  on Standlone Flows Tile ***");
  await io.homePage.loadingTime();
  await io.homePage.click(selectors.basePagePO.CONNECTIONS);
  await io.homePage.addStep("*** Clicked  on Connection Tab  ***");
  await io.homePage.loadingTime();
  await io.homePage.clickByText("Create connection");
  await io.homePage.addStep("*** Clicked  on Create Connection  ***");
  await io.connectionPage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
  await io.homePage.addStep("*** Clicked  on HTTP Connector  ***");
  await io.importsPage.fill(selectors.basePagePO.NAME, connectionName);
  await io.homePage.addStep("*** Filled Connection Name  ***");
  await io.importsPage.fill(
    selectors.connectionsPagePO.BASE_URI_INPUT,
    TC.importJSON.http.baseURI
  );
  await io.homePage.addStep("*** Filled Base URI  ***");
  await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
  await io.homePage.addStep("*** Clicked  on  Auth Type  ***");
  await io.connectionPage.clickByText("Basic");
  await io.homePage.addStep("*** Selected Basic Auth Type  ***");
  await io.connectionPage.fill(
    selectors.connectionsPagePO.USERNAME,
    process.env["HTTP_ZENDESK_USER"]
  );
  await io.homePage.addStep("*** Filled Username  ***");
  await io.connectionPage.fill(
    selectors.connectionsPagePO.PASSWORD,
    decrypt(process.env["HTTP_ZENDESK_PASSWORD"])
  );
  await io.homePage.addStep("*** Filled Password  ***");
  await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
  await io.homePage.addStep("*** Clicked Save and Close  ***");
}

async function verifyConnectionData(io: any, page:any, ElementText: string) {
  await io.homePage.clickByText("Standalone flows");
  await io.homePage.addStep("*** Clicked  on Standlone Flows Tile ***");
  await io.homePage.loadingTime();
  await io.homePage.click(selectors.basePagePO.CONNECTIONS);
  await io.homePage.addStep("*** Clicked  on Connection Tab  ***");
  await io.homePage.loadingTime();
  const element = await page.$(`text=${ElementText}`);
  expect(element).toBeNull();
  await io.homePage.addStep("*** Checking Element not present in DOm ***");
}

test.describe(`@Author-MayankOmar IO-T4047  verify 'none' tile of production, the api (GET /api/tiles) is returning offline connections under 'none' tile of production.`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("IO-T4047 @Epic-IO-62000 @Zephyr-IO-T4047  @Env-All Verify after adding a connection on Standalone flow in Production environment  does not reflect in Sandbox environment ", async ({
    io,
    page
  }) => {
    await io.homePage.addStep("*** Navigated to home page ***");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.homePage.addStep("*** Navigated to Production Env ***");
    await io.homePage.loadingTime();
    await addNewConnectionStandalone(io, "HTTP CONNECTION PRODUCTION NEW");
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.addStep("*** Navigated to home page ***");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
    await io.homePage.addStep("*** Navigated to Sandbox Env ***");
    await verifyConnectionData(io,page, "HTTP CONNECTION PRODUCTION NEW");
  });

    test("IO-T4047 @Epic-IO-62000 @Zephyr-IO-T4047  @Env-All Verify after adding a connection on Standalone flow in Sandbox environment  does not reflect in Production environment ", async ({
      io,
      page
    }) => {
      await io.homePage.addStep("*** Navigated to home page ***");
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
      await io.homePage.addStep("*** Navigated to Sandbox Env ***");
      await addNewConnectionStandalone(io, "HTTP CONNECTION SANDBOX NEW");
      await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.addStep("*** Navigated to home page ***");
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
      await io.homePage.addStep("*** Navigated to Production Env ***");
      await verifyConnectionData(io, page, "HTTP CONNECTION SANDBOX NEW");
    });
});
