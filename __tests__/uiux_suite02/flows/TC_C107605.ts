import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testMode from "@testData/Flows/C107605.json";

test.describe("C107605", () => {
  test("@Priority-P2 @Zephyr-IO-T1659 @Env-All C107605", async ({io, page}) => {
      await io.createResourceFromAPI(testMode, "FLOWS");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
      await io.flowBuilder.loadingTime();
      // await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
      const helpBubble =selectors.myAccountPagePO.HELP_BUBBLE;
      const helptext_close = selectors.connectionsPagePO.HELPTEXT_CLOSE;
      const blobFormat = selectors.flowBuilderPagePO.BLOB_FORMAT;
      await io.assert.verifyElementIsDisplayed(
        blobFormat,
        "Encoding format is not displayed"
      );
      await io.assert.verifyElementDisplayedByText(
        "Character encoding",
        "Character encoding text is not displayed"
      );
      await io.flowBuilder.click(selectors.flowBuilderPagePO.BLOB_HELPTEXT);
      //C107606- Verify the help text for drop-down in the HTTP Import when transferring files to the destination application.
      await io.assert.verifyElementContainsText(
        helpBubble,
        'Please specify the encoding type which you want to be used to transmit the file content in the binary format to the import application.'
      );
      await io.connectionPage.click(helptext_close);
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.click(blobFormat);
      await io.flowBuilder.loadingTime();
      await io.assert.verifyElementIsDisplayed(
        selectors.flowBuilderPagePO.ASCII,
        "Encoding ASCII format is not displayed"
      );
      await io.flowBuilder.loadingTime();
      await io.homePage.addStep("ascii");
      await io.assert.verifyElementIsDisplayed(
        selectors.flowBuilderPagePO.BASE64,
        "Encoding BASE64 format is not displayed"
      );
      await io.flowBuilder.loadingTime();
      await io.homePage.addStep("base64");
      await io.assert.verifyElementIsDisplayed(
        selectors.flowBuilderPagePO.BINARY,
        "Encoding BINARY format is not displayed"
      );
      await io.flowBuilder.loadingTime();
      await io.homePage.addStep("binary");
      await io.flowBuilder.loadingTime();
      await io.assert.verifyElementIsDisplayed(
        selectors.flowBuilderPagePO.UTF16E,
        "Encoding UTF16E format is not displayed"
      );
      await io.flowBuilder.loadingTime();
      await io.homePage.addStep("UTF16");
      await io.assert.verifyElementIsDisplayed(
        selectors.flowBuilderPagePO.UCS2,
        "Encoding UCS2 format is not displayed"
      );
      await io.flowBuilder.loadingTime();
      await io.homePage.addStep("ucs2");
      await io.assert.verifyElementIsDisplayed(
        selectors.flowBuilderPagePO.UTF8,
        "Encoding UTF8 format is not displayed"
      );
      await io.flowBuilder.loadingTime();
      await io.homePage.addStep("utf8");
  });
});
