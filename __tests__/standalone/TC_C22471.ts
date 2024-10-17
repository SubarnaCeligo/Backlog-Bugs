
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C22471", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4602 TC_C22471", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.homePage.loadingTime();
    test.step("*** clicked on HTTP adaptor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Gdrive HTTP connection");
    test.step("*** Naming the Gdrive Connection  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.HTTP_BASE_URI, "https://www.googleapis.com/");
    test.step("*** Naming the Baseuri  ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    test.step("*** Clicking on authtype dropdown   ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.BASIC);
    test.step("*** Clicking on basic type    ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.BASICUSERNAME, "jsabhdjfbvsjhbfj@gmail.com");
    test.step("*** Naming the Username  ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.PASSWORD, "jbdkjashkfj");
    test.step("*** Giving the password  ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HOWTOTESTCONN);
    test.step("Clicked on how to test this connection", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.PING_METHOD);
    test.step("Clicked on http method", async ()=>{});

    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD_GET);
    test.step("Clicked on http get method", async ()=>{});

    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);

    const testErrEl = await page.getByText("Your test was not successful. Check your information and try again");
    await testErrEl.waitFor({ state: 'visible', timeout: 10000 });
    await expect(testErrEl).toBeVisible();
    test.step("*** Validation of Connection is not succesfull and verifying the error  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
