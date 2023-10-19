import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C97060 App crash should not happen when user edits the connector defined custom settings`, () => {
  test(`C97060 App crash should not happen when user edits the connector defined custom settings`, async ({
    io,
    page
  }) => {
    await io.exportsPage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
    await io.exportsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);
    // todo replace: selectors.connectionsPagePO.SAGE_INTACCT_CONNECTION
    await io.exportsPage.click('[data-test="Sage Intacct"]');
    await io.exportsPage.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.exportsPage.click(
      selectors.connectionsPagePO.CONNECTION_OPTION_TEXT
    );
    await io.exportsPage.fill(
      selectors.exportsPagePO.NAME,
      "Sage Intacct Export"
    );
    await io.exportsPage.click(selectors.basePagePO.SAVE);
    await io.exportsPage.waitForElementAttached(
      selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB
    );
    await io.exportsPage.click(
      // todo replace: selectors.exportsPagePO.RESOURCE
      "#mui-component-select-\\/assistantMetadata\\/resource"
    );
    await io.exportsPage.clickByText("Accounts");
    await io.exportsPage.click(
      // todo replace: selectors.exportsPagePO.API_ENDPOINT
      "#mui-component-select-\\/assistantMetadata\\/operation"
    );
    await io.exportsPage.clickByText("Get account by ID");
    await io.exportsPage.click(selectors.basePagePO.SAVE);
    await io.exportsPage.clickByText("Custom settings");
    await io.exportsPage.clickByText("Launch form builder");
    // todo replace: selectors.exportsPagePO.FORM_DEFINITION
    await page.locator("#data").evaluate(e => {
      // @ts-ignore
      const editor = ace.edit(e);
      return editor.session.removeFullLines(1, 1);
    });
    await io.exportsPage.addStep("Edited the custom settings form builder");
    await io.exportsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.exportsPage.addStep("Verified that the app does not crash");
  });
});
