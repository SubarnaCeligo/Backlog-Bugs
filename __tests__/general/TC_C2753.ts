import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import GEN_001 from "@testData/GENERAL/TC_C28850.json";

test.describe("TC_C2753", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Sign up Page ***",()=>{});
  });
  test.afterEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T967 @Env-All TC_C2753", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo( process.env["IO_UI_CONNECTOR_URL"] + "signup")
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "Integrator IO"
    );
    await test.step("Entered value for Name",()=>{});
    await io.homePage.fill(
      selectors.loginPagePO.EMAIL,
      "abc@celigo.com"
    );

    await io.homePage.fill(
      selectors.homePagePO.COMPANY+" input",
      "abc"
    );
    await test.step("Entered value for Email",()=>{});
    await io.homePage.click(selectors.basePagePO.SIGNUP);
    await test.step("Clicken on Sign up",()=>{});

    await page.pause();

    const errorText = await io.homePage.isVisible("text='You must agree to the Terms of Service / Service Subscription Agreement and Privacy Policy to continue.'")
    await io.assert.expectToBeTrue(errorText, "");
    
await test.step(
      "*** Test passed as validation error -  You must agree to the Terms of Service, Privacy Policy and Service Subscription Agreement to continue. ***"
, async ()=>{});
await test.step(
      "Verified the error is showing and Must not allow to signup until 'terms & policy' is aggreed."
, async ()=>{});
  });
});
