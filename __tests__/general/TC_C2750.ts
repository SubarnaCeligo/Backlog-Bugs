
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import GEN_001 from "@testData/GENERAL/TC_C28850.json";

test.describe("C2750", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Sign up Page ***",()=>{});
  });
  test("C2750", async ({io,page}, testInfo) => {
    if (process.env["ENVIRONMENT"].toLowerCase() == "qa") {
      await io.homePage.navigateTo(GEN_001.qa);
    } else if (process.env["ENVIRONMENT"].toLowerCase() == "qaprod") {
      await io.homePage.navigateTo(GEN_001.qaprod);
    } else if (process.env["ENVIRONMENT"].toLowerCase() == "staging") {
      await io.homePage.navigateTo(GEN_001.staging);
    } else {
      await io.homePage.navigateTo(GEN_001.platform1dev);
    }

    //gmail.com
    await io.homePage.fill(
      selectors.flowBuilderPagePO.NAME,
      "Integrator IO"
    );
    await test.step("Entered value for Name",()=>{});
    await io.homePage.fill(
      selectors.homePagePO.USERNAMEINPUT,
      "abc@gmail.com"
    );
    await io.homePage.fill(
      "[data-test='company'] input",
      "abc"
    );
    await test.step("Entered value for Email",()=>{});
    await io.homePage.click(
      "[data-test='agreeTOSAndPP']"
    );
    await test.step("Clicken on Check Box",()=>{});
    await io.homePage.click(selectors.basePagePO.SIGNUP);
    await test.step("Clicken on Sign up",()=>{});
    var msg = await io.homePage.getText(
      "//div[contains(text(),'Sign up failed.')]"
    );
    await test.step("*** Getting the error text ***",()=>{});
    await expect(msg).toContain(
      "Sign up failed. New accounts must be attached to a valid business email address."
    );

    await io.homePage.reloadPage();
    await io.homePage.isPageReady();
    //googlemail
    await io.homePage.fill(
      selectors.flowBuilderPagePO.NAME,
      "Integrator IO"
    );
    await test.step("Entered value for Name",()=>{});
    await io.homePage.fill(
      selectors.homePagePO.USERNAMEINPUT,
      "abc@googlemail.com"
    );
    await io.homePage.fill(
      "[data-test='company'] input",
      "abc"
    );
    await test.step("Entered value for Email",()=>{});
    await io.homePage.click(
      "[data-test='agreeTOSAndPP']"
    );
    await test.step("Clicken on Check Box",()=>{});
    await io.homePage.click(selectors.basePagePO.SIGNUP);
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
    //google.com
    await io.homePage.fill(
      selectors.flowBuilderPagePO.NAME,
      "Integrator IO"
    );
    await test.step("Entered value for Name",()=>{});
    await io.homePage.fill(
      selectors.homePagePO.USERNAMEINPUT,
      "abc@google.com"
    );
    await io.homePage.fill(
      "[data-test='company'] input",
      "abc"
    );
    await test.step("Entered value for Email",()=>{});
    await io.homePage.click(
     "[data-test='agreeTOSAndPP']"
    );
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
    await io.homePage.isPageReady();
    //hotmail.com
    await io.homePage.fill(
      selectors.flowBuilderPagePO.NAME,
      "Integrator IO"
    );
    await test.step("Entered value for Name",()=>{});
    await io.homePage.fill(
      selectors.homePagePO.USERNAMEINPUT,
      "abc@hotmail.com"
    );
    await io.homePage.fill(
      "[data-test='company'] input",
      "abc"
    );
    await test.step("Entered value for Email",()=>{});
    await io.homePage.click(
     "[data-test='agreeTOSAndPP']"
    );
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
