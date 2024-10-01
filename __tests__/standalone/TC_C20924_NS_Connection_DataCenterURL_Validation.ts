
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import NETSUITE from "@testData/STANDALONE/TC_C20924_NS_Connection_DataCenterURL_Validation.json";

test.describe("TC_C20924_NS_Connection_DataCenterURL_Validation", () => {
  let connId;

  test.afterEach(async ({io,page}, testInfo) => {
    // *Create Deleted Connection
    await io.connections.deleteConnection(NETSUITE.name, connId);
    test.step("*** Deleting Connection ***", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T4422 TC_C20924_NS_Connection_DataCenterURL_Validation", async ({io,page}, testInfo) => {
    // *Create Connection
    test.step("*** Creating Connection ***", async ()=>{});
    connId = await io.connections.createConnectionViaAPI(NETSUITE);
    test.step("*** Get connection document ***", async ()=>{});
    var connection = await io.connections.getConnection(NETSUITE. name, connId);
    var restDomain = await connection.netsuite.dataCenterURLs.restDomain;
    var url = `${io.connectorUrl}connections/edit/connections/${connId}`;
    await io.homePage.navigateTo(url);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Editing the saved connection ***", async ()=>{});

    test.step("*** Change the account ID ***", async ()=>{});
    
    await io.connectionPage.click(selectors.connectionsPagePO.NETSUITE_ICLIENT);
    const dropdownOptions = await page.getByRole('menuitem').all();
    dropdownOptions[1].click();
    test.step("*** Selecting NS iClient ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.TOKENACCID, NETSUITE.AccountId);
    await io.homePage.fillWebPage(selectors.connectionsPagePO.NETSUITE_TOKENID, decrypt(NETSUITE.netsuite.qa__tokenId));
    await io.homePage.fillWebPage(selectors.connectionsPagePO.NETSUITE_TOKEN_SECRET, decrypt(NETSUITE.netsuite.qa__tokenSecret));
    test.step("*** Save the connection ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    await io.homePage.loadingTime();

    test.step("*** Get edited connection doc for netsuite ***", async ()=>{});
    var connectionEdit = await io.connections.getConnection(NETSUITE.name, connId);
    test.step("*** Validating the domain center URL for netsuite ***", async ()=>{});
    var restDomainEdit = await connectionEdit.netsuite.dataCenterURLs.restDomain;
    await expect(restDomain).not.toContain(restDomainEdit);

  });
});
