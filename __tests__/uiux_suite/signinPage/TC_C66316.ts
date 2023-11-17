import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C66316 Verify Sign up with Google is the first option and the sign up form is the second option on the page", () => {
  test("C66316 Verify Sign up with Google is the first option and the sign up form is the second option on the page", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
      await page.hover(selectors.basePagePO.ACCOUNT);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      await io.loginPage.clickByText('Sign up');
      await io.loginPage.waitForElementAttached('#root');
      const contentsDiv = page.locator(':nth-match(#root div div div div, 6)');
      const upperDiv = contentsDiv.locator('div div').nth(0);
      const upperDivText = await upperDiv.locator('button').innerText();
      await io.assert.expectToContainValue('Sign up with Google', upperDivText, 'Upper div does not contain sign up with google');
  });
});