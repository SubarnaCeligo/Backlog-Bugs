
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C29813", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T1896 @Env-All TC_C29813", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.QUICKBASE);
    test.step("*** clicked on Quickbase adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click("[id='name']>div>div>div>button");
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const namehelptext = await page.locator(selectors.flowBuilderPagePO.STACKHELPTEXT).textContent();
    await io.assert.expectToBeValue(String(namehelptext), "Enter a unique name for your connection so that you can easily reference it from other parts of the application.Was this helpful?", "");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    await io.homePage.click("[id='http.unencrypted.hostname']>div>div>div>button");
    test.step("*** Clicking on the question mark ***", async ()=>{});

    const hosthelptext = await io.homePage.getText(selectors.flowBuilderPagePO.STACKHELPTEXT)
    await io.assert.expectToBeValue(String(hosthelptext), "Enter the hostname for your Quickbase account." + "\nFor example, if your account is located at https://demo.quickbase.com/, then your hostname would be demo.quickbase.com.Was this helpful?", "");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    await io.homePage.click("[id='http.auth.token.token']>div>div>div>button");
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const userhelptext = await page.locator(selectors.flowBuilderPagePO.STACKHELPTEXT).textContent();
    expect(userhelptext).toEqual("The authentication token provided to you from the service provider. Some service providers use other names for this value like 'bearer token', or 'secret key'. In some cases, a service may have a token request process, or tokens that expire after a given time. Use the refresh fields to instruct integrator.io on how to request and extract the token from the response.Multiple layers of protection, including AES 256 encryption, are in place to keep your authentication token safe. When editing this connection, you must re-enter this value each time; it is stored only when the connection is saved and never displayed as text.Was this helpful?"
    );
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    await io.homePage.click("[id='http.unencrypted.appId']>div>div>div>button");
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const appidhelptext = await page.locator(selectors.flowBuilderPagePO.STACKHELPTEXT).textContent();
    expect(appidhelptext).toEqual("Enter your Quickbase app ID." + "\n" + "To retrieve the app ID:" + "\n" + "1. Sign in to your Quickbase account." + "\n" + "2. Navigate to My Apps and select your existing app or create a new app. " + "\n" + "3. Copy the app ID that appears at the end of the URL in the address bar. For example: abc123 in https://demo.quickbase.com/db/abc123Was this helpful?"
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async ()=>{});
  });
});
