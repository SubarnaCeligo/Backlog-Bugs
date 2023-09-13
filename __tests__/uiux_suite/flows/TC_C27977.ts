import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C27977 Verify the fields in 'Non-standard API response patterns' section are updated as per requirement in HTTP/REST lookup additional files`, () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
  });

  test(`C27977 Verify the fields in 'Non-standard API response patterns' section are updated as per requirement in HTTP/REST lookup additional files`, async ({
    io,
    page
  }) => {
    await io.exportsPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.flowBuilder.clickByText("REST API (HTTP)");
    await io.flowBuilder.clickByText("Look up additional files (per record)");
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText("3PL CONNECTION");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME);
    await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "C27977");
    await io.flowBuilder.click('[data-test="http.blobMethod"]');
    await io.flowBuilder.clickByText("GET");
    await io.flowBuilder.fill("[id='text-http.relativeURI']", "/");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.clickByText("Non-standard API response patterns");
    await io.assert.verifyElementDisplayedByText(
      "Path to file in HTTP response body",
      "'Path to file in HTTP response body' is not displayed"
    );
  });
});
