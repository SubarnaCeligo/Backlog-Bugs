import { LoginPagePO } from "@objects/LoginPagePO";
import { WebActions } from "@lib/WebActions";
import type { Page } from "playwright";

let webActions: WebActions;

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    webActions = new WebActions(this.page);
  }

  loginPageObjects = new LoginPagePO();

  async navigateToLoginPage(): Promise<void> {
    await webActions.navigateTo("/signin");
  }

  async login(username: string, password: string): Promise<void> {
    await webActions.fill(this.loginPageObjects.EMAIL, username);
    await webActions.fill(this.loginPageObjects.PASSWORD, password);
    await webActions.click(this.loginPageObjects.SIGN_IN_BUTTON);
  }
}
