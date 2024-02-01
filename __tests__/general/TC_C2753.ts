
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import GEN_001 from "@testData/GENERAL/TC_C28850.json";

test.describe("TC_C2753", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Sign up Page ***",()=>{});
  });
  test("TC_C2753", async ({io,page}, testInfo) => {
    if (
     process.env["ENVIRONMENT"].toLowerCase() == "qa" ||
     process.env["ENVIRONMENT"].toLowerCase() == "qaprod"
    ) {
      await io.homePage.navigateTo(GEN_001.qa);
    } else {
      await io.homePage.navigateTo(GEN_001.staging);
    }
    await io.homePage.fill(
      selectors.flowBuilderPagePO.NAME,
      "Integrator IO"
    );
    await test.step("Entered value for Name",()=>{});

    await io.homePage.fill(
      selectors.homePagePO.USERNAMEINPUT,
      "abc@celigo.com"
    );
    await io.homePage.fill(
      "[data-test='company'] input",
      "abc"
    );
    await test.step("Entered value for Email",()=>{});
    await io.homePage.click(selectors.basePagePO.SIGNUP);
    await test.step("Clicken on Sign up",()=>{});

    var ErrorTest = await io.homePage.getText("//div[contains(text(),'You must agree')]");
    await test.step("*** Getting the error text ***",()=>{});
    await expect(ErrorTest).toContain(
      "You must agree to the Terms of Service / Service Subscription Agreement and Privacy Policy to continue."
    );
await test.step(
      "*** Test passed as validation error -  You must agree to the Terms of Service, Privacy Policy and Service Subscription Agreement to continue. ***"
, async ()=>{});
await test.step(
      "Verified the error is showing and Must not allow to signup until 'terms & policy' is aggreed."
, async ()=>{});
  });
});
