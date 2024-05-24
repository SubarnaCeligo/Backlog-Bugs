import { test, expect } from "@celigo/ui-core-automation";

test.describe("C102890 Verify 'Frequently selected' and 'All Application A->Z' filter content is scrollable inside the container", () => {
  test("@Zephyr-IO-T23719 @Env-All C102890 Verify 'Frequently selected' and 'All Application A->Z' filter content is scrollable inside the container ", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "marketplace");
    await io.flowBuilder.loadingTime();
    const frequentlySelectedApps = page.getByText("BigCommerce").nth(0);
    while (!(await frequentlySelectedApps.isVisible())) {
      await page.mouse.wheel(0, 800);
    }
    await frequentlySelectedApps.waitFor({ state: "visible", timeout: 40000 });
    expect(await frequentlySelectedApps.isVisible()).toBe(true);
    const aToZApplications = page.getByText("Zoho Mail").nth(0);
    while (!(await aToZApplications.isVisible())) {
        await page.mouse.wheel(0, 800);
    }
    await aToZApplications.waitFor({ state: "visible", timeout: 40000 });
    expect(await aToZApplications.isVisible()).toBe(true);
});
});
