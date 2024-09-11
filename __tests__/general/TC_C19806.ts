import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C19806", () => {
  // let io: IOV, flows;
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await test.step("*** Go to flows page ***",()=>{});
  });
  test("@Zephyr-IO-T2244 @Env-All TC_C19806 Verify the snackbar text is chnged from Your XXX has been copied to your clipboard to XXX copied to clipboard i.e. Token, URL, etc.", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.connectorUrl + "accesstokens");
    await test.step("***Navigated To API Tokens Page***",()=>{});
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.SHOW_TOKEN,
      0
    );
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.COPY_TOKEN)
    await test.step("***Token Is Displayed In Clear Text***",()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.COPY_TOKEN
    );
    await test.step("***Copied Token To ClipBoard***",()=>{});
    await io.homePage.waitForElementAttached('text="Token copied to clipboard."')
    const text = await io.homePage.isVisible('text="Token copied to clipboard."')
    await io.assert.expectToBeValue(text.toString(), 'true', "Value is found")
  });
});
