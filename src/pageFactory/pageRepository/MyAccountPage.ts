import { test, Page } from "@playwright/test";
import { WebActions } from "@lib/WebActions";
import { MyAccountPagePO } from "@objects/MyAccountPagePO";
let webActions: WebActions, myAccount: MyAccountPagePO;

export class MyAccountPage {
  private page: Page;
  MY_ACCOUNT_PAGE_URL = "/myAccount/profile";

  constructor(page: Page) {
    this.page = page;
    webActions = new WebActions(this.page);
    myAccount = new MyAccountPagePO();
  }

  /**
   * Retrieves the element specified by `ele` from the "myAccount" locator object.
   *
   * @param {string} ele - The key that corresponds to the desired element in the "myAccount" object.
   * @returns {Promise<ElementHandle>} - A promise that resolves to an ElementHandle representing the located element.
   */

  async getElement(ele) {
    return await this.page.locator(myAccount[ele]);
  }

  /**
   * Navigates to the My Account page by calling the 'navigateTo' method of 'webActions'
   * with the '/myAccount/profile' URL. This function is asynchronous.
   *
   * @returns {Promise<void>} A Promise that resolves when the navigation is complete.
   */
  async navigateToMyAccount() {
    await test.step("Navigating to Account Page", async () => {
      await webActions.logger("Navigating to Account Page");
      await webActions.navigateTo("/myAccount/profile");
    });
  }
}
