import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C59938 To verify that the Forgot password work fine for EU domain", () => {
  test("@Env-All @Zephyr-IO-T1616 C59938 To verify that the Forgot password work fine for EU domain", async ({io}) => {
    await io.homePage.navigateTo("https://eu.integrator.io/");
    await io.homePage.loadingTime()
    await io.signInPage.click(selectors.loginPagePO.FORGOT_PASSWORD);
    await io.signInPage.fill(selectors.loginPagePO.EMAIL_ID, process.env["IO_UserName"]);
    await io.assert.verifyJSElementValue(selectors.loginPagePO.EMAIL_ID, process.env["IO_UserName"])
  });
});
