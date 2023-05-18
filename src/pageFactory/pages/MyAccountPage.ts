import { test, Page } from "@playwright/test";
import * as selectors from "@selectors/Selectors";
import BasePage from "./BasePage";
import { IMyAccountPage } from "@interface/IMyAccountPage";

export class MyAccountPage extends BasePage implements IMyAccountPage {
  /**
   * Retrieves the element specified by `ele` from the "myAccount" locator object.
   *
   * @param {string} ele - The key that corresponds to the desired element in the "myAccount" object.
   * @returns {Promise<ElementHandle>} - A promise that resolves to an ElementHandle representing the located element.
   */

  async getElement(ele) {
    //return await this.page.locator(myAccount[ele]);
  }

  /**
   * Navigates to the My Account page by calling the 'navigateTo' method of 'webActions'
   * with the '/myAccount/profile' URL. This function is asynchronous.
   *
   * @returns {Promise<void>} A Promise that resolves when the navigation is complete.
   */
  async navigateToMyAccount() {
    await test.step("Navigating to Account Page", async () => {
      await this.logger("Navigating to Account Page");
      //await this.navigateTo(this.MY_ACCOUNT_PAGE_URL);
    });
  }

  async changePassword(jsonData){
     await this.click(selectors.MyAccountPagePO.EDIT_PASSWORD);
     await this.isVisible(selectors.MyAccountPagePO.DIALOG_BOX);
     await this.fill(
       selectors.MyAccountPagePO.CURRENT_PASSWORD,
       jsonData.CURRENT_PASSWORD
     );
     await this.fill(
       selectors.MyAccountPagePO.NEW_PASSWORD,
       jsonData.NEW_PASSWORD
     );
     await this.click(selectors.MyAccountPagePO.CHANGE_PASSWORD);

  };
}
