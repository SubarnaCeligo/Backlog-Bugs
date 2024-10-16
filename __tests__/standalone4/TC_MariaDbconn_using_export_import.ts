import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";
import MariaDB from "@testData/STANDALONE/MariaDB_conn_using_Import_Export.json";

test.describe("MariaDbconn_using_export_import", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    io.homePage.loadingTime();
  });
  test.afterEach(async ({ io, page }, testInfo) => {
      test.step("*** Beginning of Test Suite ***", async () => { });
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.loadingTime();
      await io.api.deleteConnectionViaName("MariaDB_Connection_Export");
      await io.api.deleteConnectionViaName("MariaDB_Connection_Import");
      await io.homePage.loadingTime();
  });
  test("TC_93614_Create_Connection_from_Export @Env-All @Zephyr-IO-T7898", async ({io,page}, testInfo) => {
    // C93614 - Verify creating Maria Db connection using Export
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    io.homePage.loadingTime();
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click( selectors.flowBuilderPagePO.MARIADB);
    test.step("*** Selected MariaDB as the adaptor ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Selected create new connection ***", async ()=>{});
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    await io.homePage.fillByIndex(selectors.connectionsPagePO.NAME_INPUT, "MariaDB_Connection_Export", 1);
    test.step("*** Name the MariaDB connection ***", async ()=>{});
    await io.homePage.fill(selectors.connectionsPagePO.HOST, MariaDB.importJSON.rdbms.host);
    test.step("*** Entering the Host ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.DATABASENAME, MariaDB.importJSON.rdbms.database);
    test.step("*** Entering the DataBase Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.USERNAME_RDBMS, MariaDB.importJSON.rdbms.user);
    test.step("*** Entering the Username ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.RDBMS_PASSWORD, decrypt(MariaDB.importJSON.rdbms.password));
    test.step("*** Entering the Password ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.TEST_CONNECTION);
    await io.homePage.loadingTime();
    let msg = await io.homePage.getText(selectors.basePagePO.NOTIFICATION_ID)
    await io.assert.expectToContainValue("Your connection is working great! Nice Job!", String(msg), "");
    
    test.step("*** Verified Connection should work fine ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Verified Connection should work fine ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
  });

  test("TC_93545_Create_Connection_from_Import @Env-All @Zephyr-IO-T7882", async ({io,page}, testInfo) => {
    // C93545 - Verify creating Maria Db connection using Import
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    io.homePage.loadingTime();

    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click( selectors.flowBuilderPagePO.MARIADB);
    test.step("*** Selected MariaDB as the adaptor ***", async ()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.IMPORT_RECORDS);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Selected create new connection ***", async ()=>{});
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    await io.homePage.fillByIndex(selectors.connectionsPagePO.NAME_INPUT, "MariaDB_Connection_Import", 1);
    test.step("*** Name the MariaDB connection ***", async ()=>{});

    await io.homePage.fill(selectors.connectionsPagePO.HOST, MariaDB.importJSON.rdbms.host);
    test.step("*** Entering the Host ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.DATABASENAME, MariaDB.importJSON.rdbms.database);
    test.step("*** Entering the DataBase Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.USERNAME_RDBMS, MariaDB.importJSON.rdbms.user);
    test.step("*** Entering the Username ***", async ()=>{});
    await io.homePage.fillWebPage("[data-test='rdbms.password']", decrypt(MariaDB.importJSON.rdbms.password));
    test.step("*** Entering the Password ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.TEST_CONNECTION);
    await io.homePage.loadingTime();
    let msg = await io.homePage.getText(selectors.basePagePO.NOTIFICATION_ID)
    await io.assert.expectToContainValue("Your connection is working great! Nice Job!", String(msg), "");
    test.step("*** Verified Connection should work fine ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Verified Connection should work fine ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
  });
});
