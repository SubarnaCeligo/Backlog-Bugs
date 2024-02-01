
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C19806", () => {
  // let io: IOV, flows;
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await test.step("*** Go to flows page ***",()=>{});
  });
  test("TC_C19806", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.connectorUrl + "accesstokens");
    await test.step("***Navigated To API Tokens Page***",()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.SHOW_TOKEN
    );
    await test.step("***Token Is Displayed In Clear Text***",()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.COPY_TOKEN
    );
    await test.step("***Copied Token To ClipBoard***",()=>{});
    const text = await io.homePage.getText(
      "[id='notistack-snackbar']"
    );
    await expect(text).toContain("Token copied to clipboard.");
  });
});
