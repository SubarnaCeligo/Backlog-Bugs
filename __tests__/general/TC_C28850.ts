
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import GEN_001 from "@testData/GENERAL/TC_C28850.json";
test.describe("C208850", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Sign up Page ***",()=>{});
  });
  test("C20850", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.connectorUrl + "signup");
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.NAME, "Integrator IO");
    await test.step("Entered value for Name",()=>{});

    await io.homePage.fillWebPage(selectors.basePagePO.EMAIL, "abc@celigo.com");
    await test.step("Entered value for Email",()=>{});
    await io.homePage.click(selectors.loginPagePO.SIGN_UP_BUTTON);
    await test.step("Clicken on Sign up",()=>{});
    if(process.env["NODE_ENV"] == "qa" || process.env["NODE_ENV"] == "qaprod") {
      var ErrorTest = "//div[contains(text(),'You must agree')]"
    } else {
      ErrorTest = "//div[@id='agreeTOSAndPP']/div/div/div"
    }
    await test.step("*** Getting the error text ***",()=>{});
    if(process.env["NODE_ENV"] == "staging") {
      await await io.assert.expectToContainValue(ErrorTest, "You must agree to the Terms of Service / Service Subscription Agreement and Privacy Policy to continue.", "");
    } else if(process.env["NODE_ENV"] == "qaprod") {
      await await io.assert.expectToContainValue(ErrorTest, "You must agree to the Terms of Service / Service Subscription Agreement and Privacy Policy to continue.", "");
    }
    await test.step("*** Test passed as validation error -  You must agree to the Terms of Service, Privacy Policy and Service Subscription Agreement to continue. ***",()=>{});
    await test.step("Verified the error",()=>{});
  });
});
