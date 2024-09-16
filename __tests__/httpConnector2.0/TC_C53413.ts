
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("TC_C53413 Verify connection form under export form", () => {
  const connectionName = "TC_C53413 Orderful Connection";
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection(connectionName);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T17053 @Env-All TC_C53413 Verify connection form under export form", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    test.step("*** Clicked on PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.ORDERFUL);
    test.step("*** Selected orderful as the adaptor ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicking on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fill(
      selectors.connectionsPagePO.CONNECTION_NAME,
      "orderful export"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.connectionsPagePO.CREATE_CONNECTION)
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const simpleToggle = await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH).nth(1);
    expect(await simpleToggle.getAttribute("class")).toContain(selectors.basePagePO.MUI_SELECTED_OPTION);
    test.step("Verifying if Simple tab is selected", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.HTTP_2DOT0,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("Move to HTTP tab", async ()=>{});
    await page.locator(selectors.connectionsPagePO.CONNECTION_NAME).nth(1).click();
    await page.keyboard.type(connectionName);
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.TOKENVALUE,
      await decrypt(process.env["ORDERFUL_Token"])
    );

    await io.homePage.click(
      selectors.basePagePO.TEST_CONNECTION
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var txt = await io.homePage.getTextFromElement(
      selectors.basePagePO.NOTIFICATION_ID,
      "Your connection is working great! Nice Job!"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.assert.expectToBeTrue(txt, "");
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.SAVE_AND_CLOSE,
      1
    );
    await test.step(
      "Save the connection and Click on the connection option",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.EDITCLIENT
    );
    const httpToggle = await page.locator(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH).nth(1);
    expect(await httpToggle.getAttribute("class")).toContain(selectors.basePagePO.MUI_SELECTED_OPTION);
    test.step("Verifying if HTTP tab is selected", async ()=>{});
    await simpleToggle.click();
    test.step("*** Moving to Simple tab ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const name = await page.locator(selectors.basePagePO.NAME).nth(1).inputValue();
    expect(name).toBe(connectionName);
    test.step("*** Verifying the Connection name ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await test.step(
      "Verifying Simple tab in edit connection under export form",
      async ()=>{}
    );
  });
});
