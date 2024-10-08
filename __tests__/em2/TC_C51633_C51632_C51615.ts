
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C51633 from "@testData/EM2.0/TC_C51633.json";

test.describe("TC_C51633_C51632_C51615", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T19785 @Zephyr-IO-T19784 @Zephyr-IO-T19767 TC_C51633_C51632_C51615", async ({io,page}, testInfo) => {
    const flowName = "TC_C51633_C51632_C51615_DND";
    await io.homePage.clickByText(flowName);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("Error Table is opened", async ()=>{});
    await io.homePage.delay(10000);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    const text = (await io.homePage.getText(selectors.basePagePO.ACE_CONTENT)).toString();
    await io.homePage.click(selectors.flowBuilderPagePO.NEXT_ERROR_BUTTON);
    //51633 done
    const text2 =await (await io.homePage.getText(selectors.basePagePO.ACE_CONTENT)).toString();
    await io.assert.expectNotToBeValue(text2, text, "");
await test.step(
      "*** Clicked on next button and Verfied the contents of Errordetails text here is not same as first error ***"
, async ()=>{});
    await io.homePage.clickButtonByIndex("h4 button", 0);
    const firstTextAgain = (await io.homePage.getText(selectors.basePagePO.ACE_CONTENT)).toString();
    await io.assert.expectNotToBeValue(firstTextAgain, text, "");
await test.step(
      "*** Clicked on previous button and Verfied the contents of Errordetails text is same as first error ***"
, async ()=>{});
    //51632 done

    await io.homePage.click(selectors.flowBuilderPagePO.TOGGLE_VIEW);

    await io.homePage.clickButtonByIndex('[aria-labelledby="toggle-view-label"] li', 1);
    test.step("navigated to old view", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 2);

    const downloadError = selectors.flowBuilderPagePO.EM2DOT0PO.DOWNLOAD_ERRORS;

    await io.assert.verifyElementToBeClickable(downloadError);
    //51615 done
await test.step(
      "*** Verified download Error button is clickable ***"
, async ()=>{});
  });
});
