import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C20898 Verify if the toggle is on for all flows, then at flow level it gets enabled and vice versa", () => {
  test("C20898 Verify if the toggle is on for all flows, then at flow level it gets enabled and vice versa", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.myAccountPagePO.USERS);
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.COLUMNS);
    await io.homePage.click(`tbody tr:has-text('${process.env["IO_UserName"]}') [aria-label="Add notifications"]`);
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_FLOWS);
    await io.homePage.clickByText('All flows');
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.FLOWS_TAB)
    await io.homePage.click(selectors.integrationPagePO.FLOWS_TAB);
    await io.homePage.waitForElementAttached('tbody tr th a');
    await io.homePage.clickByIndex('tbody tr th a', 0);
    await io.homePage.click(selectors.basePagePO.FLOWSETTING);
    await io.assert.verifyElementAttribute(`${selectors.flowBuilderPagePO.NOTIFY_ME_ON_FLOW_ERROR} ${selectors.basePagePO.VALUE_TRUE}`, 'checked', '');
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.myAccountPagePO.USERS);
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.COLUMNS);
    await io.homePage.click(`tbody tr:has-text('${process.env["IO_UserName"]}') [aria-label="Edit notifications"]`);
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_FLOWS);
    await io.homePage.click('li:has-text("All flows")');
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
    await io.homePage.click(selectors.basePagePO.SAVE);
  });
});