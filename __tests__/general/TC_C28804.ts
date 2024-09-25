import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import GEN_001 from "@testData/GENERAL/TC_C28850.json";
test.describe("C20804", () => {
  test("@Zephyr-IO-T2970 @Env-All  C20804", async ({io,page}, testInfo) => {
    test.step("*** Navigate to Sign up Page ***", async ()=>{});
    await io.homePage.navigateTo(io.connectorUrl + "signup");
    await io.homePage.isPageLoaded();
    await io.homePage.loadingTime();
   const text= await io.homePage.isVisible('text="Terms of Service / Service Subscription Agreement"'); 
   await expect(text).toBeTruthy();
 
  });
});
