import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C47254 Creating http connection with some conditions", () => {
  test("@Zephyr-IO-T7549 @Env-All TC_C47254", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Clicking on add new connection and selecting adaptor as HTTP ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "BasicAuth");
    test.step("*** Giving name to the connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.BASE_URL, "https://api.qa.staging.integrator.io");
    test.step("*** Writing base url ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.AUTHORIZATIONTYPE, "token");
    test.step("*** Selecting authorization as Token ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.TOKENVALUE, "ivalidtoken");
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SENDTOKENVIA, "header");
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HEADERSCHEME, "Bearer");
    await io.homePage.loadingTime();
    await io.homePage.isVisible(selectors.flowBuilderPagePO.HOWTOTESTCONN)

    await io.homePage.click(selectors.flowBuilderPagePO.HOWTOTESTCONN);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPMETHOD, "GET");
    await io.homePage.isVisible(selectors.flowBuilderPagePO.RELATIVEURIFIELD)
    await io.homePage.fill(selectors.flowBuilderPagePO.RELATIVEURIFIELD, "/v1/connections.json");

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.TEST_CONNECTION);
    await io.homePage.loadingTime()
    await io.assert.verifyElementDisplayedByText(
      'Unauthorized',
      "Connection should fail"
    );
    test.step("*** Verifying that the connection error message is correct ***", async ()=>{});
  });
});
