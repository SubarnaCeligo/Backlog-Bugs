import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C24273_C24274", () => {
  test("TC_C24268IO_C24269", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON)
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FTP);
    await io.assert.verifyElementDisplayedByText(
      "Or choose from below",
      "Line is present"
    );
    // await page.pause()
  

    await io.myAccountPage.click(selectors.flowBuilderPagePO.ACCOUNT_RESOURCE_SHOWMORE);
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.ACCOUNT_RESOURCE_SHOWMORE,
      "Show more is not present"
    );
    
    let no=page.$$(selectors.flowBuilderPagePO.EXISTING_ACCOUNT_RESOURCE)
    console.log("no", no)
    let checkGreaterThen25=false

      if((await page.$$( selectors.flowBuilderPagePO.EXISTING_ACCOUNT_RESOURCE)).length==25)
      {
        checkGreaterThen25=true
      }
    expect(checkGreaterThen25).toBe(true);
  });
});
