import type { Page } from "@playwright/test";
import { test } from "@playwright/test";
import BasePage from "./BasePage";

export class HomePage extends BasePage{
  HOME_PAGE_URL = "/home";

  public get createFlowButton() {
    return this.page.locator('[data-test="createFlow"]');
  }
  public async open() {
    await this.page.goto(process.env["BASE_URL"], {
      waitUntil: "domcontentloaded"
    });
    this.page.on("console", msg => console.log(msg.text()));
  }

  public async navigateToHome() {
    await test.step("Navigating to Home Page", async () => {
      await this.navigateTo(this.HOME_PAGE_URL);
    });
  }

  public async goToIntegrationTile() {
    await this.page.getByText("Automation Flows", { exact: true }).click();
  }

  public async goToPage(pageName: string) {
    var list = [],
      ele;
    if (pageName.includes("->")) {
      list = pageName.split("->");
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
