
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Gusto from "@testData/HTTPConnector2.0/TC_C99698.json";

test.describe("TC_C99698", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T25521 @Env-All TC_C99698 Check for custom settings field inside iClient when required flag as false", async ({io,page}, testInfo) => {
    test.step("** Getting response from post request ***", async ()=>{});
    const response = await io.api.postCall(
      "v1/httpconnectors",
      JSON.stringify(Gusto)
    );
    await test.step(
      "*** Creating a local Connector from post request ***",
      async ()=>{}
    );
    await io.homePage.reloadPage();
    await io.homePage.reloadPage();
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await (await io.homePage.findElementByDataTest("Gusto-story")).click();
    test.step("*** Selected Gusto-story as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.ADDNEWRESOURCE,
      1
    );
    await io.homePage.loadingTime();
    const environmentLabel1 = await page.locator(
      selectors.connectionsPagePO.ENVIRONMENT_LABEL
    ).nth(1).textContent();
    expect(environmentLabel1).not.toContain("*");
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.loadingTime();
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the iClients option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.ICLIENTS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iclient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.APPLICATION
    );
    await io.homePage.selectTextfromDropDown(page, "gusto-story")
    const environmentLabel2 = await page.locator(
      selectors.connectionsPagePO.ENVIRONMENT_LABEL
    ).textContent();
    expect(environmentLabel2).not.toContain("*");
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** Verified the required fields should be shown as optional fields ***",
      async ()=>{}
    );
    const formedUrl = "v1/httpconnectors/" + response._id;
    const removeConnector = await io.api.deleteCall(
      formedUrl
    );
    test.step("*** Validating the response of the route***", async ()=>{});
    await expect(removeConnector).hasOwnProperty(204);
    test.step("*** Navigate to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
