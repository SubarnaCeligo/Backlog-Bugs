
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C51635 from "@testData/EM2.0/TC_C51635.json";

test.describe("TC_C51635_C51663", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T19787 @Zephyr-IO-T19815 TC_C51635_C51663", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickByText("Mysql to mysql flow_DND");
    test.step("Clicked on the flow", async ()=>{});


    test.step("***Clicked On Flow Which Has Errors***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.delay(10000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    test.step("Error Table is opened", async ()=>{});

    await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
    await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.ERROR_CHECKBOX, 4);
    await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.ERROR_CHECKBOX, 3);
    //one previous an next
    await io.homePage.clickButtonByIndex("h4 button", 0);
    await io.homePage.clickButtonByIndex("h4 button", 1);
    const elements = await page.$$(selectors.myAccountPagePO.ERROR_CHECKBOX);

    const firstElement = elements[3];
    const scondElement = elements[4];
    const classOfFirst = await firstElement.getAttribute("class");
    const classOfSecond = await scondElement.getAttribute("class");

    expect(classOfFirst.indexOf("Mui-checked")).toBeGreaterThan(-1);
    expect(classOfSecond.indexOf("Mui-checked")).toBeGreaterThan(-1);
await test.step(
      "*** Verfied the selection is not changed test.afterEach pressing next and previous ***"
, async ()=>{});

    //C51635 done

    var settext = await page.locator(".ace_text-input").nth(0);
    await settext.clear();
    await settext.fill('\t"new": "value"\n}');

    await io.homePage.clickButtonBasedOnLabelName(".MuiButton-label", "Save, retry & next");
await test.step(
      "*** Verified the Save, retry & next is visble and clickable ***"
, async ()=>{});
    // 51663 done
  });
});
