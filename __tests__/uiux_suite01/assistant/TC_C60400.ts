import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C60400 "Verify whether data types(select,integer) are supporting for path parameters in 2.0(ex:ADP) for resource type Talent and api endpoint Get all talent of a worker"`, () => {
  test(`@Env-QA @Env-STAGING @Zephyr-IO-T23198 C60400 "Verify whether data types(select,integer) are supporting for path parameters in 2.0(ex:ADP) for resource type Talent and api endpoint Get all talent of a worker"`, async ({
    io,
    page
  }) => {
    await io.exportsPage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
    await io.exportsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);
    await io.exportsPage.clickByText("ADP Workforce Now");
    await io.exportsPage.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.exportsPage.click(
      selectors.connectionsPagePO.CONNECTION_OPTION_TEXT
    );
    await io.exportsPage.fill(selectors.exportsPagePO.NAME, "ADP Export");
    await io.exportsPage.click(selectors.basePagePO.SAVE);
    await io.exportsPage.waitForElementAttached(
      selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB
    );
    await io.exportsPage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE
    );
    await io.exportsPage.clickByText("Talent");
    await io.exportsPage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.exportsPage.clickByText("Get all talents for a worker");
    await io.exportsPage.click(selectors.connectionsPagePO.LIST_NAME);
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.LISTBOX_ROLE,
      "List box is not displayed"
    );
    await io.exportsPage.addStep("Verified List_name is a dropdown");
  });
});
