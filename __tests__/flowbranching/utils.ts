export async function increaseDrawer(io, page, selectors, requiredHeight = 200){
    let height = await page.locator('.MuiDrawer-paperAnchorBottom.MuiDrawer-paperAnchorDockedBottom').nth(0).evaluate(element => {
        return window.getComputedStyle(element).height;
    });
    while(parseFloat(height) < requiredHeight){
        const element = await page.locator(selectors.flowBranchingPO.PENDO_ICON_BTN);
        if (await element.count() > 0) {
            await element.evaluate(node => node.remove());
        }
        await io.homePage.click(selectors.flowBranchingPO.FLOW_BUILDER_BOTTOM_DRAWER_UP, 1);
        height = await page.locator('.MuiDrawer-paperAnchorBottom.MuiDrawer-paperAnchorDockedBottom').nth(0).evaluate(element => {
            return window.getComputedStyle(element).height;
        });
    }
}

export async  function decreaseDrawer(io, page, selectors) {
    let height = await page.locator('.MuiDrawer-paperAnchorBottom.MuiDrawer-paperAnchorDockedBottom').nth(0).evaluate(element => {
        return window.getComputedStyle(element).height;
    });
    while(parseFloat(height) > 50){
        const element = await page.locator(selectors.flowBranchingPO.PENDO_ICON_BTN);
        if (await element.count() > 0) {
            await element.evaluate(node => node.remove());
        }
        await io.homePage.click(selectors.flowBranchingPO.FLOW_BUILDER_BOTTOM_DRAWER_DOWN, 1);
        height = await page.locator('.MuiDrawer-paperAnchorBottom.MuiDrawer-paperAnchorDockedBottom').nth(0).evaluate(element => {
            return window.getComputedStyle(element).height;
        });
    }
}
