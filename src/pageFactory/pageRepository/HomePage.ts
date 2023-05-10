import type { Page } from "@playwright/test";
import { WebActions } from "@lib/WebActions";
let webActions: WebActions;
export class HomePage {
  private page: Page;
  HOME_PAGE_URL = "/home";

  constructor(page: Page) {
    this.page = page;
    webActions = new WebActions(this.page);
  }

  public get createFlowButton() {
    return this.page.locator('[data-test="createFlow"]');
  }
  public async open() {
    await this.page.goto("https://staging.integrator.io", {
      waitUntil: "domcontentloaded"
    });
    this.page.on("console", msg => console.log(msg.text()));
  }

  public async navigateToHome(){
     await webActions.navigateTo("/home");
  }

  public async goToIntegrationTile() {
    await this.page.getByText("Automation Flows", { exact: true }).click();
  }

  public async goToPage(pageName: string) {
    var list = [], ele;
    if(pageName.includes('->')) {
      list = pageName.split('->');
      ele = await this.page.locator('[data-test="' + list[1] + '"]');
      if (await this.page.isVisible('[data-test="' + list[1] + '"]')) {
        await ele.click();
      } else {
        await this.page.locator('[data-test="' + list[0] + '"]').click();
        await this.page.locator('[data-test="' + list[1] + '"]').click();
      }
    } else {
      await this.page.locator('[data-test="' + pageName + '"]').click();
    }
    await this.page.waitForTimeout(5000);
    await this.page.waitForLoadState();
  }

  
}
