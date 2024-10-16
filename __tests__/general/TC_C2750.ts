import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import GEN_001 from "@testData/GENERAL/TC_C28850.json";

test.describe("C2750", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Sign up Page ***",()=>{});
  });
  test.afterEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T966 @Env-All C2750", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo( process.env["IO_UI_CONNECTOR_URL"] + "signup")

    //gmail.com
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "Integrator IO"
    );
    await io.homePage.delay(2000);
    await test.step("Entered value for Name",()=>{});
    await io.homePage.fill(
      selectors.loginPagePO.EMAIL,
      "abc@gmail.com"
    );
    await io.homePage.delay(2000);
    await io.homePage.fill(
      selectors.homePagePO.COMPANY+" input",
      "abc"
    );
    await io.homePage.delay(2000);
    await test.step("Entered value for Email",()=>{});
    await io.homePage.click(
      selectors.loginPagePO.AGREE
    );
    await io.homePage.delay(2000);
    await test.step("Clicken on Check Box",()=>{});
    await io.homePage.click(selectors.basePagePO.SIGNUP);
    await test.step("Clicken on Sign up",()=>{});
    var msg = await io.homePage.getText(
      "//div[contains(text(),'Sign up failed.')]"
    );
    await test.step("*** Getting the error text ***",()=>{});
    await expect(msg).toContain(
      "Sign up failed. A user with the given email is already registered"
    );

    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    //googlemail
     await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "Integrator IO"
    );
    await io.homePage.delay(2000);
    await test.step("Entered value for Name",()=>{});
    await io.homePage.fill(
      selectors.loginPagePO.EMAIL,
      "abc@googlemail.com"
    );
    await io.homePage.delay(2000);
    await io.homePage.fill(
      selectors.homePagePO.COMPANY+" input",
      "abc"
    );
    await io.homePage.delay(2000);
    await test.step("Entered value for Email",()=>{});
    await io.homePage.click(
      selectors.loginPagePO.AGREE
    );
    await io.homePage.delay(2000);
    await test.step("Clicken on Check Box",()=>{});
    await io.homePage.click(selectors.basePagePO.SIGNUP);
    await io.homePage.delay(2000);
    await test.step("Clicken on Sign up",()=>{});
    var msg1 = await io.homePage.getText(
      "//div[contains(text(),'Sign up failed.')]"
    );
    await test.step("*** Getting the error text ***",()=>{});
    await expect(msg1).toContain(
      "Sign up failed. New accounts must be attached to a valid business email address."
    );

    await io.homePage.reloadPage();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    //google.com
     await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "Integrator IO"
    );
    await io.homePage.delay(2000);
    await test.step("Entered value for Name",()=>{});
    await io.homePage.fill(
      selectors.loginPagePO.EMAIL,
      "abc@google.com"
    );
    await io.homePage.fill(
      selectors.homePagePO.COMPANY+" input",
      "abc"
    );
    await io.homePage.delay(2000);
    await test.step("Entered value for Email",()=>{});
    await io.homePage.click(
     selectors.loginPagePO.AGREE
    );
    await io.homePage.delay(2000);
    await test.step("Clicken on Check Box",()=>{});
    await io.homePage.click(selectors.basePagePO.SIGNUP);
    await test.step("Clicken on Sign up",()=>{});
    var msg2 = await io.homePage.getText(
      "//div[contains(text(),'Sign up failed.')]"
    );
    await test.step("*** Getting the error text ***",()=>{});
    await expect(msg2).toContain(
      "Sign up failed. New accounts must be attached to a valid business email address."
    );

    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    //hotmail.com
     await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "Integrator IO"
    );
    await io.homePage.delay(2000);
    await test.step("Entered value for Name",()=>{});
    await io.homePage.fill(
      selectors.loginPagePO.EMAIL,
      "abc@hotmail.com"
    );
    await io.homePage.delay(2000);
    await io.homePage.fill(
      selectors.homePagePO.COMPANY+" input",
      "abc"
    );
    await io.homePage.delay(2000);
    await test.step("Entered value for Email",()=>{});
    await io.homePage.click(
     selectors.loginPagePO.AGREE
    );
    await io.homePage.delay(2000);
    await test.step("Clicken on Check Box",()=>{});
    await io.homePage.click(selectors.basePagePO.SIGNUP);
    await test.step("Clicken on Sign up",()=>{});
    var msg3 = await io.homePage.getText(
      "//div[contains(text(),'Sign up failed.')]"
    );
    await test.step("*** Getting the error text ***",()=>{});
    await expect(msg3).toContain(
      "Sign up failed. New accounts must be attached to a valid business email address."
    );
  });
});
