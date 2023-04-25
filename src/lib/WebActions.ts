import type { Page } from "playwright";

export class WebActions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async delay(time: number): Promise<void> {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async click(locator: string): Promise<void> {
    await this.waitForElementAttached(locator);
    await this.page.click(locator);
  }

  async clickJS(locator: string): Promise<void> {
    await this.waitForElementAttached(locator);
    await this.page.$eval(locator, (element: HTMLElement) => element.click());
  }

  async fill(locator: string, value: string): Promise<void> {
    await this.waitForElementAttached(locator);
    await this.page.fill(locator, value);
  }

  async dragAndDrop(
    dragElementLocator: string,
    dropElementLocator: string
  ): Promise<void> {
    await this.waitForElementAttached(dragElementLocator);
    await this.waitForElementAttached(dropElementLocator);
    await this.page.dragAndDrop(dragElementLocator, dropElementLocator);
  }

  async selectOption(locator: string, value: string): Promise<void> {
    await this.page.selectOption(locator, value);
  }

  async getText(locator: string): Promise<string> {
    return await this.page.textContent(locator);
  }

  async clickByText(text: string): Promise<void> {
    await this.page.getByText(text, { exact: true }).click();
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForElementAttached(locator: string): Promise<void> {
    await this.page.waitForSelector(locator);
  }

  async waitForPageNavigation(event: string): Promise<void> {
    switch (event.toLowerCase()) {
      case `networkidle`:
        await this.page.waitForNavigation({
          waitUntil: `networkidle`,
          timeout: 30000
        });
        break;
      case `load`:
        await this.page.waitForNavigation({
          waitUntil: `load`,
          timeout: 30000
        });
        break;
      case `domcontentloaded`:
        await this.page.waitForNavigation({
          waitUntil: `domcontentloaded`,
          timeout: 30000
        });
    }
  }

  async isVisible(locator: string): Promise<boolean> {
    try {
      await this.page.waitForSelector(locator, {
        state: "visible",
        timeout: 3000
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async selectTextfromDropDown(page: Page, value) {
    var dropdownList = await page.$$(".MuiMenu-paper li");
    const style = await page.locator(".MuiMenu-paper div div");
    var h = await style.getAttribute("style");
    var k = parseInt(h.split(";")[0].split(":")[1]);
    var j = k / 48;
    let x = 0,
      actualValue,
      bool = false;
    await page.evaluate(
      "document.querylocator('.MuiMenu-paper div').scrollTo(0,0);"
    );
    //For every li
    for (let i = 0; i < j; i++) {
      if (bool) {
        break;
      }
      const divHeight = 300;
      const visibleList = Math.round(divHeight / 48);
      dropdownList = await page.$$(".MuiMenu-paper li");
      var c = await dropdownList.length;
      for (let l = 0; l < dropdownList.length; l++) {
        //await browser.pause(100);
        actualValue = await dropdownList[l].getAttribute("data-value");
        // console.log("actual value is", actualValue, value);
        if (actualValue === value) {
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
              "document.querylocator('.MuiMenu-paper div').scrollTop=" + x
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
}
