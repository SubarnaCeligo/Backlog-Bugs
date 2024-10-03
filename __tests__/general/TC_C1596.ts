import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/GENERAL/TC_C1596.json";

test.describe("TC_C1596", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    // *Edit Deleted Connection
    await test.step("*** Deleting Connection ***",()=>{});
    await io.connections.deleteConnection( FTP.importJSON.name);
  });
  test("@Zephyr-IO-T1414 @Env-All TC_C1596_Audit_Logs_Connection", async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test ***",()=>{});
    await io.connections.deleteConnection( FTP.importJSON.name);
    await io.connections.createConnectionViaAPI(  FTP.apiJSON);
    // *Edit Connection
    await test.step("*** Editing Connection ***",()=>{});
    var actualJSON = await io.connections.createOrEditConnection(FTP);

    
    //*Verifying Audit Logs
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.selectTabInProfileMenu("Profile")
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.myAccountPagePO.AUDIT_LOG
    );
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    var result = await page.$$(selectors.flowBuilderPagePO.FIELD);
    var result1 = [];
    for (let i of result) {
      let text = await i.textContent();
      if (text != "") {
        result1.push(text);
      }
    }
    await io.homePage.loadingTime()

    var resourceTypePath = await page.$$(
      selectors.flowBuilderPagePO.RESOURCE
    );
    var resourceType = [];
    for (let i of resourceTypePath) {
      let text = await i.textContent();
      if (text != "") {
        resourceType.push(text);
      }
    }

    var newValuePath = await page.$$(selectors.flowBuilderPagePO.NEWVALUE);
    var newValue = [];
    for (let i of newValuePath) {
      let text = await i.textContent();
      if (text != "") {
        newValue.push(text);
      }
    }
    await io.homePage.loadingTime()

    var oldValuePath = await page.$$(selectors.flowBuilderPagePO.OLDVALUE);
    var oldValue = [];
    for (let i of oldValuePath) {
      let text = await i.textContent();
      if (text != "") {
        oldValue.push(text);
      }
    }
    await io.homePage.loadingTime()

    if (
      io.assert.expectToBeValueInArray(result1,"ftp.type","") ||
      io.assert.expectToBeValueInArray(resourceType, "Connection", "")
    ) {
      await io.assert.expectToBeValueInArray(oldValue, "ftp", "");
      await io.assert.expectToBeValueInArray(newValue, "sftp", "");
await test.step(
        "*** Verified New value column should get updated with new value ***"
, async ()=>{});
    }
    if (io.assert.expectToBeValueInArray(result1,"ftp.hostURI","")) {
      await io.assert.expectToBeValueInArray(oldValue, "celigo.brickftp.com", "");
      await io.assert.expectToBeValueInArray(newValue, "celigo.files.com", "");
await test.step(
        "*** Verified New value column should get updated with new value ***"
, async ()=>{});
    }
    if (io.assert.expectToBeValueInArray(result1,"ftp.username","")) {
      await io.assert.expectToBeValueInArray(oldValue, "celigoc1", "");
      await io.assert.expectToBeValueInArray(newValue, "io.auto.qa@celigo.com", "");
await test.step(
        "*** Verified New value column should get updated with new value ***"
, async ()=>{});
    }
    if (io.assert.expectToBeValueInArray(result1,"ftp.port","")) {
      await io.assert.expectToBeValueInArray(oldValue, "21", "");
      await io.assert.expectToBeValueInArray(newValue, "22", "");
await test.step(
        "*** Verified New value column should get updated with new value ***"
, async ()=>{});
    }
await test.step(
      "*** Verified The update on the connection should be audited ***"
, async ()=>{});
  });
});
