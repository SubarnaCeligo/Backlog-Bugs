import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testMode from "@testData/flows/C107604.json";

test.describe("C107604_C107606", () => {
  test("C107604 Verify drop-down in the HTTP Import when transferring files to the destination application.", async ({io, page}) => {
      await io.createResourceFromAPI(testMode, "FLOWS");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
      const helpBubble =selectors.myAccountPagePO.HELP_BUBBLE;
      const helptext_close = selectors.connectionsPagePO.HELPTEXT_CLOSE;
      const blobFormat = selectors.flowBuilderPagePO.BLOB_Format;
      await expect(page.locator(blobFormat)).toBeVisible();
      await io.assert.verifyElementDisplayedByText(
        "Character encoding",
        "Character encoding is not displayed"
      );
      await io.flowBuilder.click(selectors.flowBuilderPagePO.BLOB_Helptext);
      //C107606- Verify the help text for drop-down in the HTTP Import when transferring files to the destination application.
      await io.assert.verifyElementContainsText(
        helpBubble,
        'Please specify the encoding type which you want to be used to transmit the file content in the binary format to the import application.'
      );
      await io.connectionPage.click(helptext_close);
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.click(blobFormat);
      await io.flowBuilder.loadingTime();
      await expect(page.locator(selectors.flowBuilderPagePO.ASCII)).toBeVisible();
      await io.flowBuilder.loadingTime();
      await io.homePage.addStep("ascii");
      await expect(page.locator(selectors.flowBuilderPagePO.BASE64)).toBeVisible();
      await io.flowBuilder.loadingTime();
      await io.homePage.addStep("base64");
      await expect(page.locator(selectors.flowBuilderPagePO.BINARY)).toBeVisible();
      await io.flowBuilder.loadingTime();
      await io.homePage.addStep("binary");
      await expect(page.locator(selectors.flowBuilderPagePO.HEX)).toBeVisible();
      await io.flowBuilder.loadingTime();
      await io.homePage.addStep("hex");
      await expect(page.locator(selectors.flowBuilderPagePO.UTF16E)).toBeVisible();
      await io.flowBuilder.loadingTime();
      await io.homePage.addStep("UTF16");
      await expect(page.locator(selectors.flowBuilderPagePO.UCS2)).toBeVisible();
      await io.flowBuilder.loadingTime();
      await io.homePage.addStep("ucs2");
      await expect(page.locator(selectors.flowBuilderPagePO.UTF8)).toBeVisible();
      await io.flowBuilder.loadingTime();
      await io.homePage.addStep("utf8");
  });
});
