import BasePage from "./BasePage";
import { ILoginPage } from "@interface/ILoginPage";

export class LoginPage extends BasePage implements ILoginPage {
  SIGNIN_PAGE_URL = "/signin";

  async navigateToLoginPage(): Promise<void> {
    await this.navigateTo(this.SIGNIN_PAGE_URL);
  }

  async login() {
    await this.page.waitForLoadState();
    await this.fill(
      this.selectors.LoginPagePO.EMAIL,
      process.env["EMAIL"]
    );
    await this.fill(
      this.selectors.LoginPagePO.PASSWORD,
      process.env["PASSWORD"]
    );
    await this.click(this.selectors.LoginPagePO.SIGN_IN_BUTTON);
  }
}
