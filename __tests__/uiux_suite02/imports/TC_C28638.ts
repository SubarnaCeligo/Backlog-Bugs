import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C28638 Verify all the field values are saved in the HTTP/REST lookup and transfer files (blob) resources with updated labels while save button is clicked UI_Backlog", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("C28638 Verify all the field values are saved in the HTTP/REST lookup and transfer files (blob) resources with updated labels while save button is clicked UI_Backlog", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'http');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP);
    await io.myAccountPage.clickByText("Import records into destination application");
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime()
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP connection');
    await io.flowBuilder.clickByTextByIndex('HTTP connection', 0);
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C28638_Connection');
    await io.flowBuilder.click(selectors.importPagePO.SELECTHTTPMETHOD);
    await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);
    await io.homePage.fill(selectors.flowBuilderPagePO.HEADER_NAME, 'Name');
    await io.homePage.fill(selectors.flowBuilderPagePO.HEADER_VALUE, 'TC_C28638');
     // Validating able to save all headers values
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
  });
}); 
