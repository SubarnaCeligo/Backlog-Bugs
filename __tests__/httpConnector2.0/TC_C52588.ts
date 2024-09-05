
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("TC_C52588_TC_C102435 Verify able to edit and save the new HTTP connections and also verify concurrency level value and help text", () => {
  const connectionName = 'Orderful Edit Connection';
  const connectionNewName = 'Edited Orderful Connection';

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    //*Create Deleted Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection(connectionNewName);
  });
  test("@Zephyr-IO-T17180 @Zephyr-IO-T8081 @Env-All TC_C52588_TC_C102435 Verify able to edit and save the new HTTP connections and also verify concurrency level value and help text", async ({io,page}, testInfo) => {
    var value = await io.homePage.isVisible(
      selectors.basePagePO.CONNECTIONS
    );
    if (value == true) {
      test.step("*** Clicking on the connection option ", async ()=>{});
      await io.homePage.click(selectors.basePagePO.CONNECTIONS);
    } else {
      test.step(" Clicking on the Resource option ", async ()=>{});
      await io.homePage.click(selectors.basePagePO.RESOURCES);
      test.step(" Clicking on the connection option ***", async ()=>{});
      await io.homePage.click(selectors.basePagePO.CONNECTIONS);
    }
    await io.homePage.loadingTime();
    test.step("*** click on create connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** Select orderful connection ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.ORDERFUL);
    await io.homePage.loadingTime();
    test.step("*** Select HTTP type ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.HTTP_2DOT0
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Enter the connection name ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      connectionName
    );
    test.step("*** Enter the token details ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.TOKENVALUE,
      decrypt(process.env["ORDERFUL_Token"])
    );

    //TC_C102435
await test.step(
      "*** Verify concurrency level  value and help text for new http  based connections.***"
, async ()=>{});
    await io.homePage.click(
      selectors.importPagePO.ADVANCED
    );
    await io.homePage.click(
      selectors.connectionsPagePO.TARGET_CONCURRENCY_LEVEL + " " + selectors.exportsPagePO.HELP_TEXT_ICLIENT
    );
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const ConcurrencyText = await io.homePage.getText(
      selectors.connectionsPagePO.CONNHELPTEXT
    );

    expect(ConcurrencyText).toContain(
      "Set this field to limit the number of concurrent API requests allowed by this connection resource (at any one time), or leave this field blank to use burst mode. In burst mode, the target concurrency value will be automatically set to 25."
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.CLOSEBTN
    );
    test.step("*** Verified Concurrency level helptext ***", async ()=>{});

    var Concurrencyvalue = (await io.homePage.getText(selectors.connectionsPagePO.CONCURRENCYLEVEL)).toString();
    await io.assert.expectToContainValue("25",Concurrencyvalue, "");
await test.step(
      "*** Validation for C53127 - Verify the field “Concurrency level” is set to 25 by default ***"
, async ()=>{});
await test.step(
      "*** Verified Concurrency level  default value ***"
, async ()=>{});

    await io.homePage.click(
      selectors.basePagePO.ADD_NAME
    );
    test.step("*** Test the created connection***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.TEST_CONNECTION
    );
    await io.homePage.loadingTime();
    var connecText = await io.homePage.getTextFromElement(
      selectors.basePagePO.NOTIFICATION_ID,
      "Your connection is working great! Nice Job!"
    );
    await io.assert.expectToBeTrue(connecText, "");
await test.step(
      "Verified user should be able to test the connection successfully and save test"
, async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("***Searching created connection ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      connectionName
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("***Click on the created connection ***", async ()=>{});
    await io.homePage.click(
      selectors.integrationPagePO.SELECTSTACKLIST
    );
    await io.homePage.loadingTime();
    test.step("*** Edit the connection name ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      connectionNewName
    );
    test.step("*** Enter the token details ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.TOKENVALUE,
      decrypt(process.env["ORDERFUL_Token"])
    );
    test.step("*** Test the created connection***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.TEST_CONNECTION
    );
    await io.homePage.loadingTime();
    connecText = await io.homePage.getTextFromElement(
      selectors.basePagePO.NOTIFICATION_ID,
      "Your connection is working great! Nice Job!"
    );
    await io.assert.expectToBeTrue(connecText, "");
await test.step(
      "Verified user should be able to test the connection successfully and save test"
, async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      connectionNewName
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("***Validating the connection ***", async ()=>{});
    var data = await io.homePage.getText(
      selectors.integrationPagePO.SELECTSTACKLIST
    );
    await expect(data).toContain(connectionNewName);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
});
