import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C27978 Verify 'What would you like to export?' drawer label is updated as expected in REST/HTTP lookup additional files`, () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
  });

  test(`C27978 Verify 'What would you like to export?' drawer label is updated as expected in REST/HTTP lookup additional files`, async ({
    io,
    page
  }) => {
    await io.homePage.clickByText("Standalone flows");
    await io.flowBuilder.clickByText("test http flow");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
    const label = page.getByText("Where would you like to transfer from?");
    await label.waitFor({ state: "visible", timeout: 10000 });
    expect(label).toBeVisible();
  });
});
