export interface IBasePage {
  loadMap(data: any, obj: any): void;
  delay(time: number): void;
  navigateTo(url: string): void;
  click(locator: string): void;
  isScrollable(locator: string): void;
  clickJS(locator: string): void;
  takeScreenShot(locator: string, path?: string): void;
  fill(locator: string, value: string): void;
  dragAndDrop(dragElementLocator: string, dropElementLocator: string): void;
  selectOption(locator: string, value: string): void;
  getText(locator: string): void;
  clickByText(text: string): void;
  getTitle(): void;
  waitForElementAttached(locator: string): void;
  waitForPageNavigation(event: string): void;
  isVisible(locator: string): void;
  determineControlType(locator): void;
  performActionWithControl(
    WebControlTemp: any,
    typeOfControl: string,
    value?: string
  ): void;
}
