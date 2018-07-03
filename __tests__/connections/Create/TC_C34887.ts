import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C34887", () => {
  test("C34887 Verify weather Restricted report type checkbox and help text is being displayed as expected for SP-API Connection with /reports/2021-06-30/documents/ in relative URI", async ({io, page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.click(selectors.basePagePO.TOOLS);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.FLOW_BUILDER);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Amazon Seller Central');
    await page.keyboard.press('Enter');
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION_DROPDOWN);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByText('Amazon Seller Central');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_GET_RELATIVEURL);
    await page.keyboard.type('/reports/2021-06-30/documents/');

    // verify the user is able to see the restricted report type checkbox
    await io.flowBuilder.clickByText('Restricted report type');
  });
});