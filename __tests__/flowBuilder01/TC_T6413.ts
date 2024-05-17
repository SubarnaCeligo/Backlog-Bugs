import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("C112084 User should able to run the flow successfully", () => {
test("C113413 User should able to run the flow successfully", async ({io, page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
    await io.homePage.clickByText("Automation Flows")
    await io.homePage.waitForElementAttached("text='JWTDOCUSIGN_DND'")
    await io.homePage.clickByText("JWTDOCUSIGN_DND")
    await io.flowBuilder.loadingTime();
    const autoResolvedErrorCount = await io.flowBuilder.getText(selectors.flowBuilderPagePO.AUTORESOLVED)
    expect(autoResolvedErrorCount).toBe("1")
});
});