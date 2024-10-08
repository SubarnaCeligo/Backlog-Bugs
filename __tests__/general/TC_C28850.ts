import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("C28850", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Navigate to Sign up Page ***",()=>{});
    await io.homePage.loadingTime()
  });
  test("@Zephyr-IO-T974 @Env-All C28850", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.connectorUrl + "signup");
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "Integrator IO"
    );
    await test.step("Entered value for Name",()=>{});

    await io.homePage.fill(
      selectors.loginPagePO.EMAIL,
      "abc@gmail.com"
    );
    await test.step("Entered value for Email",()=>{});
    await io.homePage.click(selectors.loginPagePO.SIGN_UP_BUTTON);
    await test.step("Clicken on Sign up",()=>{});
      var ErrorTest = (await io.homePage.isVisible("text='You must agree to the Terms of Service / Service Subscription Agreement and Privacy Policy to continue.'"))
       await io.assert.expectToBeTrue(ErrorTest, "");
    await test.step("*** Test passed as validation error -  You must agree to the Terms of Service, Privacy Policy and Service Subscription Agreement to continue. ***",()=>{});
    await test.step("Verified the error",()=>{});
  });
});
