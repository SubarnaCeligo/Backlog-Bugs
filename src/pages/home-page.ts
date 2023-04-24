import type { Page } from  '@playwright/test';

export class HomePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public get createFlowButton() {
        return this.page.locator('[data-test="createFlow"]')
    }
    public async open() {
          await this.page.goto('https://staging.integrator.io', { waitUntil: "domcontentloaded" });
          this.page.on('console', msg => console.log(msg.text()))
    }

    public async goToIntegrationTile() {
        await this.page.getByText('Automation Flows', { exact: true }).click();
    }
}