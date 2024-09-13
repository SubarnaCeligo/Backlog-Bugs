
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C1659", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1056 @Zephyr-IO-T958  TC_C1659", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    test.step("*** Clicking on Profile Menu ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    test.step("*** Clicking on Sign Out ***", async ()=>{});

    await io.homePage.click(selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking on Sign UP ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.signUpPagePO.NAME, "TC C1659");
    test.step("*** Writing on Name ***", async ()=>{});

    console.log("After entering name");

    await io.homePage.fill(selectors.myAccountPagePO.INVITE_EMAIL, "jkaxjkahsbsxkasasnxjksclasjksnascjksjcbascakaasbckacchjscjhsacascas;cjasihdashduyweftyetyrfiwudsndmvgsvgdscnskdiohfuygfjsdvhgjdskd,as xmla;skdqwjduqwdhbwfkemfewfguwshjdiipkslqswbdxysxoaisdywduwjekdsbxcaiskalksmdkasjdhqwiwqopdwgyewfbs,mc.smxaksodiwoiduwihduwhdjsndbchdqwusipqwksdkwhduiwhdjsdlkapsda[kdqwpdoiwnduwehfdowd@gmail.com");
    test.step("*** Writing on Email ***", async ()=>{});

    console.log("After entering email");

    await io.homePage.fillWebPage(selectors.signUpPagePO.COMPANY, "Celigo");
    test.step("*** Writing on Company ***", async ()=>{});

    console.log("After entering company");

    await io.homePage.click(selectors.signUpPagePO.AGREETOSANDPP);
    test.step("*** Clicking on Agree Checkbox ***", async ()=>{});

    var errEl = page.getByText("Please enter a valid email address");
    await expect(errEl).toBeVisible();

    test.step("*** After clicking on Signup, test shows error as Please enter a valid email address.  ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
