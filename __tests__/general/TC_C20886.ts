
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import GEN_001 from "@testData/GENERAL/TC_C20886.json";

test.describe("C20886", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
  });
  test("C20886", async ({io,page}, testInfo) => {
    if (process.env["NODE_ENV"] == "qa") {
      await io.homePage.navigateTo(GEN_001.qa);
    } else if (process.env["NODE_ENV"] == "qaprod") {
      await io.homePage.navigateTo(GEN_001.qaprod);
    } else if (process.env["NODE_ENV"] == "iaqa") {
      await io.homePage.navigateTo(GEN_001.iaqa);
    } else if (process.env["NODE_ENV"] == "platformone") {
      await io.homePage.navigateTo(GEN_001.platformone);
    } else {
      await io.homePage.navigateTo(GEN_001.staging);
    }

    var enumber = await io.homePage.getText(
      "//h1[text()='404']"
    );
    await test.step("Verified the error number on home screen",()=>{});
    expect(enumber).toBe("404");

    var text = await io.homePage.getText(
      "//h3[contains(text(),'This is not the page that')]"
    );
    await test.step("Verified the error message on home screen",()=>{});
    expect(text).toBe("This is not the page that you're looking for...");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
