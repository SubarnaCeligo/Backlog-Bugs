import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./manage_all.json";

test.describe(`C1560 Veirfy,Generating and uploading a template zip file in user account of manage access`, () => {
  test(`@Env-All @Zephyr-IO-T6894 C1560 Veirfy,Generating and uploading a template zip file in user account of manage access`, async ({
    page,
    io
  }) => {
    const res = await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      testData
    );
    await io.homePage.navigateTo(
        `${io.data.links.HOME_PAGE_URL}/installIntegration`
      );
      await io.flowBuilder.loadingTime();
      await io.homePage.addStep(
        "Navigated to install integration page (/home/installIntegration)"
      );
      const fileChooserPromise = page.waitForEvent("filechooser");
      await io.homePage.clickByText("Choose file");
      await io.flowBuilder.loadingTime();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles("testData/inputData/Templates/C68650copy.zip");
      await io.homePage.addStep("Uploaded integration zip file");
      await io.homePage.clickByText("Install integration");
      await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
      await io.flowBuilder.loadingTime();
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.loadingTime();
      await io.flowBuilder.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC100370_FTP_TO_FTP');
      await io.homePage.waitForElementAttached("text='TC100370_FTP_TO_FTP'")
      const flow = await io.homePage.isVisible("text='TC100370_FTP_TO_FTP'")
      await io.assert.expectToBeValue(flow.toString(),'true', "Template flow not found")


  });
});