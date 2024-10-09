
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/STANDALONE/TC_C50648.json";

test.describe("TC_C28145", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    //*Create Deleted Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection(TC.PostBody.name);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T4515 @Env-All TC_C28145", async ({io,page}, testInfo) => {
    let response = await io.api.postCall( "v1/connections",  JSON.stringify(TC.PostBody));

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("** Navigating to Home Page ***", async ()=>{});
    await io.homePage.reloadPage();
    test.step("** Refreshing Home Page ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.clickButtonBasedOnLabelName(selectors.integrationPagePO.CLOSEBYTEXT, "Create connection");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
    test.step("*** Closing the window ***", async () => {});
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C50648_Connection");
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.myAccountPagePO.CONN_NAME);
    test.step("*** Clicking on Existing Connections ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

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
    await io.assert.expectNotToBeNull(verify, "");
    test.step("*** HTTP Request body - Under Cookie auth type has AFE ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Closing the drawer ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    test.step("*** Clicking on Auth Type ***", async ()=>{});

    await io.homePage.click( selectors.flowBuilderPagePO.MANUAL);
    test.step("*** Clicking on Token ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.LOCATION);
    test.step("*** Clicking on Send Token via ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.CUSTOM_REQUEST_BODY);
    test.step("*** Clicking on HTTP Body ***", async ()=>{});

    let checked = await page.locator(
      selectors.flowBuilderPagePO.CONFIGURE_REFRESH_TOKEN
    ).isChecked();
    await io.homePage.loadingTime();

    if (checked === false) {
      await io.homePage.click(selectors.flowBuilderPagePO.CONFIGURE_REFRESH_TOKEN);
      test.step("*** Clicking on Configure Refresh Token ***", async ()=>{});
    }
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_RELATIVE_URI);
    test.step("*** Clicking on  Refresh Token Relative URI ***", async ()=>{});
    await io.homePage.loadingTime();
    var verify2 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectNotToBeNull(verify2, "");
    test.step("*** Relative URI -  Under Configure refresh token section has AFE ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Closing the drawer ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_HTTP_METHOD);
    test.step("*** Clicking http method ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.HTTPPOSTMETHOD);
    test.step("*** Clicking POST method ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_HTTP_REQUEST_BODY);
    test.step("*** Clicking on Refresh request Body ***", async ()=>{});
    await io.homePage.loadingTime();
    var verify3 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectNotToBeNull(verify3, "");
    test.step("*** HTTP request body - Under Configure refresh token section has AFE ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Closing the drawer ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.HOW_TO_TESTCONNECTION);
    test.step("*** Closing on how to click connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.CONNECTION_RELATIVE_URI);
    test.step("*** Clicking on how to click connection relative uri ***", async ()=>{});
    await io.homePage.loadingTime();
    var verify4 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectNotToBeNull(verify4, "");
    test.step("*** Relative URI - Under How to test connection section has AFE ***", async ()=>{});

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
    await io.assert.expectNotToBeNull(verify5, "");
    test.step("*** HTTP request body - Under How to test connection section has AFE  ***", async ()=>{});
  });
});
