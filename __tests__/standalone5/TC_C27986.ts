
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C27986", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T4500 @Env-All TC_C27986", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CONNECTIONS);
    await io.homePage.loadingTime();
    test.step("*** Clicked on Integration Connections ***", async ()=>{});

    await io.homePage.clickButtonBasedOnLabelName(selectors.integrationPagePO.CLOSEBYTEXT, "Create connection");
    await io.homePage.loadingTime();
    test.step("*** Clicking on create connections ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Clicking on Http ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    test.step("*** Clicking on Auth Type ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.COOKIE_AUTH);
    test.step("*** Clicking on Cookie Type ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.COOKIE_HTTP_METHOD);
    test.step("*** Clicking on Cookie Http Method Type ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.HTTPPOSTMETHOD);
    test.step("*** Clicking on POST Method ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.COOKIE_HTTP_REQUEST);
    test.step("*** Clicking on Cookie Body ***", async ()=>{});
    await io.homePage.loadingTime();
    var verify = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("connection", verify, "");
    await io.assert.expectToContainValue("settings", verify, "");
    test.step("*** HTTP Request body - Under Cookie auth type has connection settings ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Closing the drawer ***", async ()=>{});

    await io.homePage.click("button[data-test='http.auth.cookie.uri']");
    test.step("*** Clicking absolute uri ***", async ()=>{});
    await io.homePage.loadingTime();
    var verify6 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);

    await io.assert.expectToContainValue("connection", verify6, "");
    await io.assert.expectToContainValue("settings", verify6, "");
    test.step("*** Absolute URI -  Under Configure Cookie section has connection settings ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Closing the drawer ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    test.step("*** Clicking on Auth Type ***", async ()=>{});

    await io.homePage.click( selectors.flowBuilderPagePO.MANUAL);
    test.step("*** Clicking on Token ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.LOCATION);
    test.step("*** Clicking on Send Token via ***", async ()=>{});

    await io.homePage.click("[data-value='header']");
    test.step("*** Clicking on http header ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.CONFIGURE_REFRESH_TOKEN);
    test.step("*** Clicking on Configure Refresh Token ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_RELATIVE_URI);
    test.step("*** Clicking on  Refresh Token Relative URI ***", async ()=>{});
    await io.homePage.loadingTime();
    var verify2 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("connection", verify2, "");
    await io.assert.expectToContainValue("settings", verify2, "");
    test.step("*** Relative URI -  Under Configure refresh token section has connection settings ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Closing the drawer ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_HTTP_METHOD);
    test.step("*** Clicking http method ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.HTTPPOSTMETHOD);
    test.step("*** Clicking on POST Method ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_HTTP_REQUEST_BODY);
    test.step("*** Clicking on Refresh request Body ***", async ()=>{});
    await io.homePage.loadingTime();
    var verify3 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("connection", verify3, "");
    await io.assert.expectToContainValue("settings", verify3, "");
    test.step("*** HTTP request body - Under Configure refresh token section has connection settings ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Closing the drawer ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.HOW_TO_TESTCONNECTION);
    test.step("*** Closing on how to click connection ***", async ()=>{});

    await io.homePage.click("button[data-test='http.ping.relativeURI']");
    test.step("*** Clicking on how to click connection relative uri ***", async ()=>{});
    await io.homePage.loadingTime();
    var verify4 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("connection", verify4, "");
    await io.assert.expectToContainValue("settings", verify4, "");
    test.step("*** Relative URI - Under How to test connection section has connection settings ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Closing the drawer ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.PING_METHOD);
    test.step("*** Clicking on the http method ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.HTTPPOSTMETHOD);
    test.step("*** Clicking on POST Method ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.CLICK_CONNECTION_REQUEST_BODY);
    test.step("*** Clicking on connection request body ***", async ()=>{});
    await io.homePage.loadingTime();
    var verify5 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("connection", verify5, "");
    await io.assert.expectToContainValue("settings", verify5, "");
    test.step("*** HTTP request body - Under How to test connection section has connection settings  ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Closing the drawer ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
});
