import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as C34887 from "@testData/Connections/C34887.json";

test.describe("C34887 Verify weather Restricted report type checkbox and help text is being displayed as expected for SP-API Connection with /reports/2021-06-30/documents/ in relative URI", () => {
  test.beforeEach(async ({ io }) => {
    await io.connections.deleteConnection(C34887.name);
    await io.connections.createConnectionViaAPI(C34887);
  });
  test("@Env-All @Zephyr-IO-T9350 C34887 Verify weather Restricted report type checkbox and help text is being displayed as expected for SP-API Connection with /reports/2021-06-30/documents/ in relative URI", async ({io, page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.click(selectors.basePagePO.TOOLS);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.FLOW_BUILDER);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Amazon Seller Central');
    await page.waitForTimeout(500);
    await page.keyboard.press('Enter');
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);;
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION_DROPDOWN);
    await io.flowBuilder.clickByText("AMAZON SELLER CENTRAL CONNECTION");
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByText('Marketplace Web Service API (MWS)');
    await io.flowBuilder.clickByText('Selling Partner API (SP-API)');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_GET_RELATIVEURL);
    await page.keyboard.type('/reports/2021-06-30/documents/');

    // verify the user is able to see the restricted report type checkbox
    await io.flowBuilder.clickByText('Restricted report type');
  });
});