import type { Page } from "playwright";

export class WebActions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Asynchronously waits for the given amount of time.
   * @param time The time to wait, in milliseconds.
   * @returns A Promise that resolves after `time` milliseconds.
   */

  async delay(time: number): Promise<void> {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  /**
   * Navigate to the given URL and wait until the DOM content is loaded.
   * @async
   * @param {string} url - The URL to navigate to.
   * @returns {Promise<void>} - A promise that resolves when the navigation is complete.
   */

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, {
      waitUntil: "domcontentloaded"
    });
  }

  /**
   * Clicks on an element with the given locator.
   *
   * @param locator - The locator of the element to click.
   * @returns A promise that resolves when the click action is complete.
   * @throws If no element is found with the given locator or if an error occurs while clicking on the element.
   */

  async click(locator: string): Promise<void> {
    await this.waitForElementAttached(locator);
    await this.page.click(locator);
  }

  /**
   * Clicks on the element specified by the given locator.
   * @param locator - The string representation of the locator for the element to be clicked.
   * @returns A Promise that resolves when the click action is complete.
   */

  async clickJS(locator: string): Promise<void> {
    await this.waitForElementAttached(locator);
    await this.page.$eval(locator, (element: HTMLElement) => element.click());
  }

  /**
   * Fills the input element identified by the given locator with the provided value.
   * Waits for the element to be attached to the DOM before filling it.
   *
   * @param locator - The element locator, as a string.
   * @param value - The value to fill the input with, as a string.
   * @returns A Promise that resolves when the element is filled.
   * @throws If the element cannot be found or filled.
   */

  async fill(locator: string, value: string): Promise<void> {
    await this.waitForElementAttached(locator);
    await this.page.fill(locator, value);
  }

  /**
   * Drags an element specified by `dragElementLocator` and drops it onto an element
   * specified by `dropElementLocator` using Puppeteer's `dragAndDrop` method.
   *
   * @param dragElementLocator - A string representing a locator for the element to drag.
   * @param dropElementLocator - A string representing a locator for the element to drop onto.
   * @returns A promise that resolves when the drag and drop operation is complete.
   */

  async dragAndDrop(
    dragElementLocator: string,
    dropElementLocator: string
  ): Promise<void> {
    await this.waitForElementAttached(dragElementLocator);
    await this.waitForElementAttached(dropElementLocator);
    await this.page.dragAndDrop(dragElementLocator, dropElementLocator);
  }

  /**
   * Selects an option with the given value from a select element identified by the locator.
   * @param locator - The locator for the select element.
   * @param value - The value of the option to select.
   * @returns A Promise that resolves when the option is successfully selected.
   */
  async selectOption(locator: string, value: string): Promise<void> {
    await this.page.selectOption(locator, value);
  }

  /**
   * Returns the text content of an element matching the provided locator.
   * @param locator - The locator string used to find the element on the page.
   * @returns A Promise that resolves to the text content of the found element.
   */

  async getText(locator: string): Promise<string> {
    return await this.page.textContent(locator);
  }

  /** Clicks on an element with the given text.
   *
   * @param text - The exact text to search for.
   * @returns A promise that resolves when the click action is done.
   * @throws An error if no element with the given text is found.
   */

  async clickByText(text: string): Promise<void> {
    await this.page.getByText(text, { exact: true }).click();
  }
  /**
   * Returns the title of the current page.
   *
   * @returns {Promise<string>} A promise that resolves with the title of the page.
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }
  /**
   * Wait for the specified element to be attached to the page.
   *
   * @param locator - The selector for the element to wait for.
   * @returns A Promise that resolves when the element is attached.
   * @throws If the element is not found after a certain amount of time.
   */

  async waitForElementAttached(locator: string): Promise<void> {
    await this.page.waitForSelector(locator);
  }
  /**
   * Wait for a page navigation event to occur.
   * @param event - The type of event to wait for.
   * @returns A Promise that resolves when the navigation event is complete.
   * @throws If the navigation event times out.
   */
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

  /**
   * Waits for the selector to be visible on the page within the given timeout.
   *
   * @param locator The CSS selector to wait for.
   * @returns A promise that resolves to `true` if the selector is visible, or `false` otherwise.
   */
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
