import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C29032 Auto-resolved feature will be counted in the auto-resolved column", () => {
test("@Env-All @Zephyr-IO-T6413 @Priority-P2 C29032 Auto-resolved feature will be counted in the auto-resolved column", async ({io, page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
    await io.homePage.clickByText("Automation Flows")
    await io.homePage.waitForElementAttached("text='Newflow_DND'")
    await io.homePage.clickByText("Newflow_DND")
    await io.flowBuilder.loadingTime();
    const autoResolvedErrorCount = await io.flowBuilder.getText(selectors.flowBuilderPagePO.AUTORESOLVED)
    expect(autoResolvedErrorCount).toBe("1")
});
});
