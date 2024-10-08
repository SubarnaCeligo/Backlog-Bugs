import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C22999", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5983 @Env-All  TC_C22999", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Templates");
    await test.step("Clicked templates button",()=>{});
    await io.homePage.loadingTime();

    var templateVerification = await io.homePage.getCurrentUrl();
    await expect(templateVerification).toContain("/templates")

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
