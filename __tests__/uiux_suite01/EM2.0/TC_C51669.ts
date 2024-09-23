import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowJSON from "@testData/EM2.0/C51669.json";


test.describe(`C51669 Verify by closing the "Error details" drawer without saving the changes made on "Edit Retry data"tab`, () => {
  let id
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId(id)
  });  
  test(`@Zephyr-IO-T19821 @Env-All C51669 Verify by closing the "Error details" drawer without saving the changes made on "Edit Retry data"tab`, async ({
    io,
    page
  }) => {
    // await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
    // await io.flowBuilder.clickByText("Automation Flows");
    // await io.flowBuilder.clickByText("C51669");
    id = await io.createResourceFromAPI(flowJSON, "FLOWS");
    await io.api.runBatchFlowViaAPI("C51669", id);
    const lastRun = page.getByText("Last run");
    await lastRun.waitFor({ state: "visible" ,timeout:360000});
    await io.flowBuilder.reloadPage()
    await io.flowBuilder.loadingTime()
    await page.getByText("1 error").nth(1).click();
    await page
      .locator(".ace_editor")
      .evaluate(e => {
        // @ts-ignore
        const editor = ace.edit(e);
        editor.setValue('"test@gmail.com"');
      })
      .catch(error => {
        console.error("An error occurred:", error);
      });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await expect(page.getByText("You’ve got unsaved changes")).toBeVisible();
  });
});
