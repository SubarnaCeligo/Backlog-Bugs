
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C25263", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1877 TC_C25263", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.FULFILLMENT);
    test.step("*** clicked on fulfillment  adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.NAME_HELP_TEXT);
    test.step("*** Clicking on the question mark ***", async ()=>{});

    var iclienthelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(iclienthelptext)).toContain("Enter a unique name for your connection so that you can easily reference it from other parts of the application.");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    
    await io.homePage.click(selectors.flowBuilderPagePO.FULFILLMENTICLIENTHELPTEXT);
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const clientIdhelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    expect(clientIdhelptext).toContain("Enter your Fulfillment.com client ID. To retrieve your client ID, contact Fulfillment.com support.");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.homePage.click(selectors.flowBuilderPagePO.FULFILLMENTUSERNAMEHELPTEXT);
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const usernamehelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(usernamehelptext)).toContain("Enter your Fulfillment.com account username.");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.homePage.click(selectors.flowBuilderPagePO.FULFILLMENTPASSWORDHELPTEXT);
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const passwordhelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    expect(passwordhelptext).toContain("Enter your Fulfillment.com account password.");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.homePage.click(selectors.flowBuilderPagePO.FULFILLMENTCLIENTSECRETHELPTEXT);
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const tokenhelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    expect(tokenhelptext).toContain("Enter your Fulfillment.com client secret.Multiple layers of protection, including AES 256 encryption, are in place to keep your client secret safe. When editing this connection, you must re-enter this value each time; it is stored only when the connection is saved and never displayed as text. To retrieve your client secret, contact Fulfillment.com support.");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("** Verified  the help texts for  Client ID ,Client secret, Username, Password, Token. **", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async ()=>{});
  });
});
