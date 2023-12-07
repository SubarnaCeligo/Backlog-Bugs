import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C61021 Verify the prompt displayed on selecting ‘SuiteBundle SuiteScript 1.0 (to be deprecated)’ option of NetSuite API Version’ options while creating new NS import`, () => {
  test(`C61021 Verify the prompt displayed on selecting ‘SuiteBundle SuiteScript 1.0 (to be deprecated)’ option of NetSuite API Version’ options while creating new NS import`, async ({
    io,
    page
  }) => {
    await io.importsPage.navigateTo(io.data.links.IMPORTS_PAGE_URL);
    await io.importsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);
    await io.importsPage.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
    await io.importsPage.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.importsPage.fill(
      selectors.exportsPagePO.CONNECTIONS_DROPDOWN,
      "NS No SA SB"
    );
    await io.exportsPage.click(
      selectors.connectionsPagePO.CONNECTION_OPTION_TEXT
    );
    await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "NS Import");
    await io.exportsPage.click(selectors.basePagePO.SAVE);
    await page
      .getByText("How would you like the records imported?")
      .waitFor({ state: "visible" });
    await io.assert.verifyElementDisplayedByText(
      "Install the Integrator.io SuiteApp in your NetSuite account to integrate with SuiteScript APIs.",
      "SuiteApp install message is not displayed"
    );
  });
});
