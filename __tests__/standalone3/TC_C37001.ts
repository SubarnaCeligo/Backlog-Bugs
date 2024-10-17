import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import connDoc from "@testData/STANDALONE/TC_C37001.json";

test.describe("TC_C37001", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});
    await io.connections.deleteConnection("TC_C37001_bigquery_dummy");
    await io.homePage.loadingTime();
  });

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T7661 @Env-All TC_C37001", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.connections.createConnectionViaAPI(connDoc);

    test.step("Navigated to integration", async ()=>{});
    
    await io.homePage.click(selectors.basePagePO.CONNECTIONS);
    await io.homePage.loadingTime();
    test.step("Navigated to connection tab", async ()=>{});

    await io.assert.verifyElementDisplayedByText("BIGQUERY CONNECTION", "Bigquery connection not visible");

    await io.homePage.clickByText("Register connections");
    await io.homePage.loadingTime();
    test.step("clicked on register connection", async ()=>{});    

    await io.homePage.click(selectors.integrationPagePO.SELECT_CONNECTION_TO_REGISTER);
    await io.homePage.click(selectors.exportsPagePO.REGISTERCONNECTION);
    await io.homePage.loadingTime();

    await io.assert.verifyElementDisplayedByText("TC_C37001_bigquery_dummy", "TC_C37001_bigquery_dummy connection not visible");

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
