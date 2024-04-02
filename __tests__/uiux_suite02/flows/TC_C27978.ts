import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C27978 Verify 'What would you like to export?' drawer label is updated as expected in REST/HTTP lookup additional files`, () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
  });

  test(`C27978 Verify 'What would you like to export?' drawer label is updated as expected in REST/HTTP lookup additional files`, async ({
    io,
    page
  }) => {
    await io.exportsPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    // await io.flowBuilder.clickByText("REST API (HTTP)");
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, "REST API (HTTP)");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RESTAPIHTTP);
    await io.flowBuilder.clickByText("Look up additional files (per record)");
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText("3PL CONNECTION");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME);
    await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "C27977");
    await io.flowBuilder.click(selectors.exportsPagePO.LOOKUP.HTTP_METHOD);
    await io.flowBuilder.clickByText("GET");
    await io.flowBuilder.fill(
      selectors.exportsPagePO.LOOKUP.HTTP_RELATIVE_URI,
      "/"
    );
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.assert.verifyElementDisplayedByText(
      "Where would you like to transfer from?",
      "'Where would you like to transfer from?' is not displayed"
    );
  });
});
