import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C36010_HTTP_connection_type.", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});
    await io.connections.deleteConnection("C36010_HTTP_Connection");
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T4641 @Env-All TC_C36010_HTTP_connection_type ", async ({ io, page }, testInfo) => {
    test.step("*** Navigate to Home Page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Connections");
    test.step("*** clicked on connection button ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async () => { });

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** clicked on HTTP  adaptor ***", async () => { });
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "C36010_HTTP_Connection");
    test.step("*** Naming the HTTP Connection  ***", async () => { });
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.BASE_URL, "https://slack.com/api");
    test.step("*** Naming the Base URL Field   ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.MEDIA_TYPE);
    test.step("*** Clicking on the media type dropdown   ***", async () => { });

    await io.homePage.click(selectors.connectionsPagePO.URLENCODED);
    test.step("*** Selecting the URLEncoded from the dropdown  ***", async () => { });
    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    test.step("*** Clicking on the Auth  type dropdown   ***", async () => { });
    await io.homePage.click(selectors.connectionsPagePO.BASIC);
    test.step("*** Selecting the Basic  from the dropdown  ***", async () => { });
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.BASICUSERNAME, await process.env["SLACK_USERNAME_DIGEST"]);
    test.step("*** Naming the Username  Field   ***", async () => { });
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BASIC_PASSWORD, await process.env["SLACK_PASSWORD_DIGEST"]);
    test.step("*** Naming the Password Field   ***", async () => { });
    await io.homePage.click(selectors.connectionsPagePO.HOW_TO_TESTCONNECTION);
    test.step("*** Click on Non standard  ***", async () => { });
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SUCCESSPATH, "   ok");
    test.step("***  writing the Path to success field    ***", async () => { });
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SUCCESSVALUE, "true ");

    test.step("*** Writing the succes value field   ***", async () => { });
    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    test.step("*** Clicking on Test Connection  ***", async () => { });
    await io.homePage.loadingTime()
    var successMessage = await io.homePage.getText("[id='notification']>div>p")
    await io.assert.expectToContainValue("Your connection is working great! Nice Job!", String(successMessage), "")
    test.step("*** Validation of Connection is working fine or not ***", async () => { });
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Saving the Connection ***", async () => { });
    await io.homePage.loadingTime();
  });
});
