import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41600 To verify all the modified changes in existing scripts are shown under 'scripts' accordion(Action: Update) by comparing source and clone scripts", () => {
  test("@Env-All C41600 To verify all the modified changes in existing scripts are shown under 'scripts' accordion(Action: Update) by comparing source and clone scripts", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByTextByIndex("Upload", 0);
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/inputData/flowbranching/C41600.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.homePage.clickByText("Install integration");
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
    await io.homePage.clickByText("Use existing connection");
    await io.homePage.clickByText("Please select");
    await io.flowBuilder.clickByTextByIndex("AMAZON S3 CONNECTION", 0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);
    await io.flowBuilder.clickByTextByIndex("New flow", 0);
    await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_HOOKS);
    await io.flowBuilder.clickByTextByIndex("PreScript", 0);
    await io.flowBuilder.clickByTextByIndex("", 0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await page.goBack();
    await io.flowBuilder.click(selectors.integrationPagePO.CLONE_INTEGRATION);
    await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON);
    await io.homePage.click(
        selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
      );
    await io.homePage.clickByText("Use existing connection");
    await io.homePage.clickByText("Please select");
    await io.flowBuilder.clickByTextByIndex("AMAZON S3 CONNECTION", 0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);
    await io.flowBuilder.click(selectors.integrationPagePO.REVISIONS);
    await io.flowBuilder.click(selectors.integrationPagePO.CREATE_PULL);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.NAME_DESCRIPTION, "123");
    await io.flowBuilder.clickByTextByIndex("New flow", 2);
    io.flowBuilder.click(selectors.integrationPagePO.NEXT);

  });
});