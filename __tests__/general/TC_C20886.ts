import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import GEN_001 from "@testData/GENERAL/TC_C20886.json";

test.describe("C20886", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
  });
  test("@Zephyr-IO-T2318 @Env-All  C20886", async ({io,page}, testInfo) => {
    console.log("Environment: ", process.env["ENV"]);
     await io.homePage.navigateTo(io.homePage + "abcd");
    var enumber = await io.homePage.getText(
      "div[id='root']>div>main>div>h1"
    );
    await test.step("Verified the error number on home screen",()=>{});
    expect(enumber).toBe("404");

    var text = await io.homePage.getText(
      "div[id='root']>div>main>div>h3"
    );
    await test.step("Verified the error message on home screen",()=>{});
    expect(text).toBe("This is not the page that you're looking for...");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
