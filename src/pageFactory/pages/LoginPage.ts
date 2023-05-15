import  BasePage  from "@pages/BasePage";

export class LoginPage extends BasePage {
  SIGNIN_PAGE_URL = "/signin";


  async navigateToLoginPage(): Promise<void> {
    await this.navigateTo(this.SIGNIN_PAGE_URL);
  }

  async login(): Promise<void> {
    await this.fill(this.selectors.LoginPagePO.EMAIL, process.env["EMAIL"]);
    await this.fill(this.selectors.LoginPagePO.PASSWORD, process.env["PASSWORD"]);
    await this.click(this.selectors.LoginPagePO.SIGN_IN_BUTTON);
  }
}
