import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`@Zephyr-IO-T1150 C97060 App crash should not happen when user edits the connector defined custom settings`, () => {
 //Skipped as per discussion with TC Owner and QA team
  test.skip(`C97060 App crash should not happen when user edits the connector defined custom settings`, async ({
    io,
    page
  }) => {
    await io.exportsPage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
    await io.exportsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);
    await io.exportsPage.click(
      selectors.connectionsPagePO.SAGE_INTACCT_CONNECTION
    );
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
    await io.exportsPage.click(selectors.exportsPagePO.RESOURCE);
    await io.exportsPage.clickByText("Accounts");
    await io.exportsPage.click(selectors.exportsPagePO.API_ENDPOINT);
    await io.exportsPage.clickByText("Get account by ID");
    await io.exportsPage.fill(selectors.exportsPagePO.ACCOUNT_NUMBER, "12345");
    await io.exportsPage.click(selectors.basePagePO.SAVE);
    await io.exportsPage.clickByText("Custom settings");
    await io.exportsPage.clickByText("Launch form builder");
    await page.locator(selectors.exportsPagePO.FORM_DEFINITION).evaluate(e => {
      // @ts-ignore
      const editor = ace.edit(e);
      return editor.setValue(`{
        "layout": {
          "fields": [
            "pathparam"
          ]
        }
      }`);
    });
    await io.exportsPage.addStep("Edited the custom settings form builder");
    await io.exportsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.exportsPage.addStep("Verified that the app does not crash");
  });
});
