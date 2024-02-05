
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import GEN_001 from "@testData/GENERAL/TC_C28850.json";
test.describe("C20804", () => {
  test("C20804", async ({io,page}, testInfo) => {
    test.step("*** Navigate to Sign up Page ***", async ()=>{});
    await io.homePage.navigateTo(io.connectorUrl + "signup");
    await io.homePage.isPageLoaded();
    await io.homePage.isVisible(selectors.basePagePO.AGREE_TEXT);
    var agreeText = "//span[contains(text(),'I agree')]"
    await io.assert.expectToContainValue(agreeText, "I agree to the Terms of Service, Privacy Policy and the Service Subscription Agreement.", "");
    var test1 = await io.homePage.getTextFromElement(selectors.basePagePO.AGREE_TEXT, "I agree to the Terms of Service, Privacy Policy. and the Service Subscription Agreement.");

    await expect(test1).toBeFalsy();
    await expect(test).not.toBe(test1);
    test.step("*** Verified the full stop should not be shown test.afterEach the privacy policy on the IO signup page ***", async ()=>{});
  });
});
