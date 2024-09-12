
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C19770", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T854 TC_C19770", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.G2ACONNECTION);
    test.step("*** clicked on G2  adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.G2NAMEHELPTEXT);
    test.step("*** Clicking on the question mark ***", async ()=>{});
    
    const nametext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)
    await io.assert.expectToContainValue( "Enter a unique name for your connection so that you can easily reference it from other parts of the application.", String(nametext),"");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    
    await io.homePage.click(selectors.flowBuilderPagePO.G2TOKENHELPTEXT);
    const tokenText = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)
    await io.assert.expectToContainValue( "The authentication token provided to you from the service provider. Some service providers use other names for this value like 'bearer token', or 'secret key'. In some cases, a service may have a token request process, or tokens that expire after a given time. Use the refresh fields to instruct integrator.io on how to request and extract the token from the response.Multiple layers of protection, including AES 256 encryption, are in place to keep your authentication token safe. When editing this connection, you must re-enter this value each time; it is stored only when the connection is saved and never displayed as text.", String(tokenText),"");
    test.step("*** Verified Helptext should be present for all the fields in concur connection. ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async ()=>{});
  });
});
