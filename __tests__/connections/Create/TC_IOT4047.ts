import { test } from "@celigo/ui-core-automation";
import TC from "@testData/Connections/Create/Create_Connection_HTTP_Basic_JSON_Zendesk.json";
import * as selectors from "@celigo/aut-selectors";



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
    await io.connectionPage.addNewConnectionStandalone({io, connectionName:"HTTP CONNECTION PRODUCTION NEW", baseUrl:TC.importJSON.http.baseURI, userName:process.env["HTTP_ZENDESK_USER"], password: process.env["HTTP_ZENDESK_PASSWORD"] })
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.addStep("*** Navigated to home page ***");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
    await io.homePage.addStep("*** Navigated to Sandbox Env ***");
    await io.connectionPage.verifyConnectionData(io,page, "HTTP CONNECTION PRODUCTION NEW");
  });

    test("IO-T4047 @Epic-IO-62000 @Zephyr-IO-T4047  @Env-All Verify after adding a connection on Standalone flow in Sandbox environment  does not reflect in Production environment ", async ({
      io,
      page
    }) => {
      await io.homePage.addStep("*** Navigated to home page ***");
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
      await io.homePage.addStep("*** Navigated to Sandbox Env ***");
      await io.connectionPage.addNewConnectionStandalone({io, connectionName:"HTTP CONNECTION SANDBOX NEW", baseUrl:TC.importJSON.http.baseURI, userName:process.env["HTTP_ZENDESK_USER"], password: process.env["HTTP_ZENDESK_PASSWORD"] })
      await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.addStep("*** Navigated to home page ***");
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
      await io.homePage.addStep("*** Navigated to Production Env ***");
      await io.connectionPage.verifyConnectionData(io, page, "HTTP CONNECTION SANDBOX NEW");
    });
});
