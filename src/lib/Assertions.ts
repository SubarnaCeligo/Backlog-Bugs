import { expect, Page, test } from "@playwright/test";
import { WebActions } from "./WebActions";
import fs from "fs";

export class Assertions extends WebActions {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Verifies that the text content of the element located by the given selector
   * matches the given expected text.
   *
   * @param locator - The CSS selector used to locate the element to verify.
   * @param text - The expected text content of the element.
   *
   * @throws This function will throw an error if the element is not found,
   * or if its text content does not match the expected text.
   */

  async verifyElementText(locator: string, text: string): Promise<void> {
    await this.waitForElementAttached(locator);
    const textValue = await this.page.textContent(locator);
    expect(textValue.trim()).toBe(text);
  }

  /**
   * Waits for an element specified by the given locator to be attached to the page, and then verifies that it contains the given text.
   *
   * @param locator - The locator string used to identify the element.
   * @param text - The text that the element should contain.
   * @returns A Promise that resolves when the verification is successful, or rejects with an error if the element is not found or does not contain the expected text.
   */

  async verifyElementContainsText(locator: string, text: string): Promise<void> {
    await this.waitForElementAttached(locator);
    await expect(this.page.locator(locator)).toContainText(text);
  }

  /**
   * Verify that the value of the input element located by the given CSS selector
   * matches the given text. Throws an error if the text does not match or if the
   * element is not found.
   *
   * @param locator - The CSS selector for the input element to verify.
   * @param text - The expected value of the input element.
   * @returns A Promise that resolves when the verification succeeds.
   * @throws An error if the text value does not match the input element value, or
   * if the element is not found.
   */
  async verifyJSElementValue(locator: string, text: string): Promise<void> {
    await this.waitForElementAttached(locator);
    const textValue = await this.page.$eval(
      locator,
      (element: HTMLInputElement) => element.value
    );
    expect(textValue.trim()).toBe(text);
  }

  /**
   * Verify that the attribute of an element matches the given value.
   *
   * @param {string} locator - CSS selector for the element to verify.
   * @param {string} attribute - Name of the attribute to verify.
   * @param {string} value - Expected value of the attribute.
   *
   * @throws {Error} If the element is not found or if the attribute value does not match.
   */

  async verifyElementAttribute(
    locator: string,
    attribute: string,
    value: string
  ): Promise<void> {
    await this.waitForElementAttached(locator);
    const textValue = await this.page.getAttribute(locator, attribute);
    expect(textValue.trim()).toBe(value);
  }

  /**
   * Verifies that an element with the given `locator` is displayed on the page.
   *
   * @param locator - The selector for the element to verify.
   * @param errorMessage - The error message to throw if the element is not displayed.
   * @throws An error with the given `errorMessage` if the element is not displayed within 10 seconds.
   */

  async verifyElementIsDisplayed(
    locator: string,
    errorMessage: string
  ): Promise<void> {
    await this.page
      .waitForSelector(locator, { state: `visible`, timeout: 10000 })
      .catch(() => {
        throw new Error(`${errorMessage}`);
      });
  }

  /**
   * Check if the given status is true, and throw an error with the given message
   * if it is not.
   *
   * @param status - The boolean status to check.
   * @param errorMessage - The error message to throw if the status is not true.
   *
   * @returns A Promise that resolves to void.
   */

  async expectToBeTrue(status: boolean, errorMessage: string): Promise<void> {
    expect(status, `${errorMessage}`).toBe(true);
  }

  /**
   * Asserts that the expected value is equal to the actual value,
   * trimming leading/trailing whitespace in the expected value.
   * Throws an error with the provided error message if the assertion fails.
   *
   * @param expectedValue - The expected value to compare against.
   * @param actualValue - The actual value being tested.
   * @param errorMessage - The error message to display if the assertion fails.
   * @returns A promise that resolves if the assertion succeeds, and rejects otherwise.
   */

  async expectToBeValue(
    expectedValue: string,
    actualValue: string,
    errorMessage: string
  ): Promise<void> {
    expect(expectedValue.trim(), `${errorMessage}`).toBe(actualValue);
  }

  /**
   * Asynchronously checks if the snapshot of an element matches the expected snapshot.
   *
   * @param selector The selector to locate the element to take a snapshot of.
   * @param expectedSnapshotPath The path to the expected snapshot file.
   * @throws An error if the element is not found for the given selector or if the actual snapshot
   *         does not match the expected snapshot.
   */
  async checkSnapshot(
    selector: string,
    expectedSnapshotPath: string,
    masklocator?: string
  ): Promise<void> {
    //await this.waitForPageNavigation("domcontentloaded");
    const element = await this.page.$(selector);
    if (!element) {
      throw new Error(`Element not found for selector "${selector}".`);
    }
    let actualSnapshot;
    //if (masklocator !== undefined) {
      actualSnapshot = await element.screenshot();
    // } else {
    //   actualSnapshot = await element.screenshot({
    //     mask: [await this.page.locator(masklocator)]
    //   });
    //}
    // const expectedSnapshot = await fs.readFileSync(p);
    expect(actualSnapshot).toMatchSnapshot(expectedSnapshotPath);
  }

  /**
   * Asynchronously checks if an element matches the expected text.
   *
   * @param selector The selector to locate the element to take a snapshot of.
   * @param value Expected data to be matched
   * @throws An error if the element is not found for the given selector or if the actual snapshot
   *         does not match the expected snapshot.
   */
  async textFromElement(locator: string, value: any) {
    await test.step("Matching text from element " + locator, async () => {
      expect(await this.page.locator(locator)).toMatchSnapshot(value);
    });
  }
}
