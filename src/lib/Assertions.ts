import { expect, Page } from "@playwright/test";
import { WebActions } from "./WebActions";
import fs from "fs";

export class Assertions extends WebActions {
  constructor(page: Page) {
    super(page);
  }
  async verifyElementText(locator: string, text: string): Promise<void> {
    await this.waitForElementAttached(locator);
    const textValue = await this.page.textContent(locator);
    expect(textValue.trim()).toBe(text);
  }

  async verifyElementContainsText(locator: string, text: string): Promise<void> {
    await this.waitForElementAttached(locator);
    await expect(this.page.locator(locator)).toContainText(text);
  }

  async verifyJSElementValue(locator: string, text: string): Promise<void> {
    await this.waitForElementAttached(locator);
    const textValue = await this.page.$eval(
      locator,
      (element: HTMLInputElement) => element.value
    );
    expect(textValue.trim()).toBe(text);
  }

  async verifyElementAttribute(
    locator: string,
    attribute: string,
    value: string
  ): Promise<void> {
    await this.waitForElementAttached(locator);
    const textValue = await this.page.getAttribute(locator, attribute);
    expect(textValue.trim()).toBe(value);
  }

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

  async expectToBeTrue(status: boolean, errorMessage: string): Promise<void> {
    expect(status, `${errorMessage}`).toBe(true);
  }

  async expectToBeValue(
    expectedValue: string,
    actualValue: string,
    errorMessage: string
  ): Promise<void> {
    expect(expectedValue.trim(), `${errorMessage}`).toBe(actualValue);
  }

  async checkSnapshot(
    selector: string,
    expectedSnapshotPath: string
  ): Promise<void> {
    const element = await this.page.$(selector);
    if (!element) {
      throw new Error(`Element not found for selector "${selector}".`);
    }
    const actualSnapshot = await element.screenshot();
    // const expectedSnapshot = await fs.readFileSync(p);
    expect(actualSnapshot).toMatchSnapshot(expectedSnapshotPath);
  }
}
