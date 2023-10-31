import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./manage_all.json";

test.describe(`C1560 Verify PG,PP-export&import created in account level manage user are shown up in list of "exports&imports" in that account.`, () => {
  test(`C1560 Verify PG,PP-export&import created in account level manage user are shown up in list of "exports&imports" in that account.`, async ({
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
      await io.homePage.addStep(
        "Navigated to install integration page (/home/installIntegration)"
      );
      const fileChooserPromise = page.waitForEvent("filechooser");
      await io.homePage.clickByText("Choose file");
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles("testData/inputData/Templates/C68650copy.zip");
      await io.homePage.addStep("Uploaded integration zip file");
      await io.homePage.clickByText("Install integration");
      await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached("text='TC100370_FTP_TO_FTP'")
      const flow = await io.homePage.isVisible("text='TC100370_FTP_TO_FTP'")
      await io.assert.expectToBeValue(flow.toString(),'true', "Template flow not found")

     
  });
});