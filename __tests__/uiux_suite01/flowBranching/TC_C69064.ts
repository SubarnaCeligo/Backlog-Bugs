import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C69064 To Verify that the long branching name is displaying properly in flow branching flow", () => {
  test("@Env-All @Zephyr-IO-T24318 C69064 To Verify that the long branching name is displaying properly in flow branching flow", async ({io, page}) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
      await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.PLUS_BUTTONS, 0);
      await page.getByRole('menuitem', { name: 'Add branching' }).click();
      await io.flowBuilder.fill(selectors.flowBuilderPagePO.NAME, 'lllllllllllllllllllllllllooooooooooooooooooooooooonnnnnnnnnnnnnnnnnnnnnnnnggggggggggggggggggggggggg');
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.loadingTime()
      var actual= await io.flowBuilder.getText("//span[contains(text(),'llllllllllllllllllllllllloooooooooooooooooooo')]")
      await io.assert.expectToBeValue('llllllllllllllllllllllllloooooooooooooooooooo...',actual.toString(),'The name is not displayed as expected');
     
    });
});
