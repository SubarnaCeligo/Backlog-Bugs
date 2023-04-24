import { test, expect, Page } from '@playwright/test';

export async function selectTextfromDropDown(page: Page, value) {
    var dropdownList = await page.$$(".MuiMenu-paper li");
    const style = await page.locator(".MuiMenu-paper div div");
    var h = await style.getAttribute("style");
    var k = parseInt(h.split(";")[0].split(":")[1]);
    var j = k / 48;
    let x = 0,
      actualValue,
      bool = false;
    await page.evaluate(
      "document.querySelector('.MuiMenu-paper div').scrollTo(0,0);"
    );
    //For every li
    for (let i = 0; i < j; i++) {
      if (bool) {
        break;
      }
      const divHeight = 300;
      const visibleList = Math.round(divHeight / 48);
      dropdownList = await page.$$(".MuiMenu-paper li");
      var c = await dropdownList.length
      for (let l = 0; l < dropdownList.length; l++) {
        //await browser.pause(100);
        actualValue = await dropdownList[l].getAttribute('data-value');
        // console.log("actual value is", actualValue, value);
        if (actualValue === value) {
            // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        //   await page.evaluate(
        //     "arguments[0].scrollIntoView(true);",
        //     dropdownList[l]
        //   );
          try {
            //await dropdownList[l].moveTo();
            await page.waitForTimeout(100);
            //await this.click(dropdownList[l]);
            await dropdownList[l].click();
            bool = true;
            break;
          } catch (error) {
            console.log("Error while clicking >>", error);
          }
        } else {
          x = x + 48;
          try {
            await page.evaluate(
              "document.querySelector('.MuiMenu-paper div').scrollTop=" + x
            );
            await page.waitForTimeout(100);
          } catch (error) {
            console.log("Scrolling Error >>", error);
          }
        }
      }
    }
    return bool;
  }