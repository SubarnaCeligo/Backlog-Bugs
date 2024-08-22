import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("@Author-Sudhanshukumar T27437 Verify the Knowledge bot icon is Visible on All Screens.", () => {
    test.beforeEach(async ({ io}) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime();
    });
    test("C27437 Verify the Knowledge bot icon is Visible on All Screens. @Epic-IO-69807 @Priority-P2 @Zephyr-IO-T27437 @Zephyr-IO-T27438 @Zephyr-IO-T27439 @Zephyr-IO-T27440 @Zephyr-IO-T27441 @Zephyr-IO-T27442 @Zephyr-IO-T27443 @Zephyr-IO-T27444 @Zephyr-IO-T27445 @Zephyr-IO-T27446 @Zephyr-IO-T27447 @Zephyr-IO-T27448 @Zephyr-IO-T27449 @Zephyr-IO-T27450 @Env-All", async ({ io, page, context }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.exportsPage.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_ICON, "Knowledge bot icon is not displayed");
        await io.flowBuilder.hover(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_ICON);
        //IO-T27439
        await io.assert.verifyElementDisplayedByText('Celigo AI', 'Celigo AI is not displayed"');
        //IO-T27438
        await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_ICON);
        await io.exportsPage.loadingTime();
        await expect(page.getByText("Welcome to Celigo AI")).toBeVisible();
        await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT);
        await io.homePage.click(selectors.basePagePO.CHAT_BOT);
        await io.homePage.clickByText("Support");
        await expect(page.getByText("Welcome to Celigo AI")).not.toBeVisible();
        await io.assert.verifyElementDisplayedByText('Submit a ticket', 'Submit a ticket is not displayed"');
        await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_ICON);
        await expect(page.getByText("Submit a ticket")).not.toBeVisible();
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_COLLAPSE, "Knowledge bot collapse icon is not displayed");
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_CLOSE, "Knowledge bot close icon is not displayed");
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_INPUT, "Knowledge bot input is not displayed");
        await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_INPUT, "placeholder", "What would you like to learn about our features?");
        await io.assert.expectToBeTrue(await (await page.$(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_SEND)).isDisabled(), "Send is not disabled");
        await io.importsPage.fill(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_INPUT, "What is Transformation, Mapping, Filter, Javascript,Hooks, Aliases, Audit log, Response mapping,Output Filter");
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_SEND, "Knowledge bot send button is not displayed");
        await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_SEND);
        //IO-T27445
        await io.assert.verifyElementDisplayedByText('Thinking', 'Thinking is not displayed"');

        //IO-T32815 Verify that during streaming, responses start within 3-4 seconds, and the timeout is adjusted to 10 seconds to ensure timely response
        await page.waitForTimeout(4000);
        await expect(page.getByText("Thinking")).not.toBeVisible();
        
        await io.exportsPage.loadingTime();
        
        await expect(page.getByText("Oh no! Timeout error")).not.toBeVisible();
        await io.homePage.reloadPage();
        await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_ICON);

        //user can provide feedback thumbs up IO-T27448
        await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_YES);
        await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_YES)).toHaveAttribute('color', '#5CB85C');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_NO);
        await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_NO)).toHaveAttribute('color', '#FF3C3C');
        await io.assert.verifyElementDisplayedByText('Anything else Celigo AI can help with?', 'Answer displayed is not completed');

        //IO-T32816 Ensure there are no timeout errors, or only very rare occurrences, when a user requests an answer during streaming.
        await io.importsPage.fill(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_INPUT, "I'm evaluating Celigo Integrator IO for my company's integration needs. Can you provide me with an overview of its key features and supported integrations? Additionally, how does Celigo Integrator IO handle error handling and what customization options are available? Lastly, can you explain how Celigo ensures data security within Integrator IO and where I can find resources for getting started with the platform?");
        await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_SEND);
        await io.assert.verifyElementDisplayedByText('Thinking', 'Thinking is not displayed"');
        //IO-T32817 Verify that while streaming is active, users cannot initiate a new question request until the current streaming is complete.
        await page.waitForSelector( 'text="Thinking"' , { state: 'hidden', timeout: 5000 });
        await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_INPUT, "class", "Mui-disabled");

        //IO-T32818 Verify that during streaming, users can scroll up and view previous answers without interruptions to the ongoing stream.
        const scrollContent = await page.locator(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_SCROLL_CONTENT).first();

        await scrollContent.evaluate((el) => {
            el.scrollTop = 0
        });
        
        await page.waitForTimeout(10000);
        let scrollPosition = await scrollContent.evaluate(el => el.scrollTop);
        expect(scrollPosition).toBeLessThan(10);
        await expect(page.getByText("Oh no! Timeout error")).not.toBeVisible();

        await io.importsPage.fill(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_INPUT, "I'm facing issues with updating the export schema via API in Celigo Integrator IO. Can you guide me on how to update the export schema programmatically? Additionally, I encountered an error stating 'Element value exceeds the fixed length of 30'. How is it possible that records are imported successfully when the Success status is marked as N/A?Furthermore, in Microsoft Dynamics 365 Business Central, I'm encountering the error message Activity was deadlocked with another user. What steps should I take to resolve this deadlock issue? In another integration scenario involving Salesforce real-time exports, I'm encountering the error Integrator Distributed Adaptor package not installed. How can I fix this error and ensure smooth real-time data exports from Salesforce?Moreover, I'm encountering JavaScript errors in a filter or hook within Celigo Integrator IO. What are the common causes of such errors, and how can they be resolved effectively?Lastly, while working with handlebars templates, I encountered a parse err");
        //IO-T27446 1024 Char
        await io.assert.verifyElementDisplayedByText('You have reached the maximum of 1024 characters', '1024 Error message is not displayed"');

        //IO-T32819 Verify that during streaming, auto-scroll moves to the latest streamed words. Auto-scroll should stop if the user scrolls up and should resume if the user scrolls back to the bottom where streaming is taking place.
        await scrollContent.evaluate((el) => {
            el.scrollTop = 0
        });
        await io.importsPage.fill(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_INPUT, "what is imports?");
        await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_SEND);
        await io.exportsPage.loadingTime();
        scrollPosition = await scrollContent.evaluate(el => el.scrollTop);
        expect(scrollPosition).toBeGreaterThan(100);
        await page.waitForTimeout(1000);
        await scrollContent.evaluate((el) => {
            el.scrollTop = 0
        });
        await page.waitForTimeout(1000);
        scrollPosition = await scrollContent.evaluate(el => el.scrollTop);
        expect(scrollPosition).toBeLessThan(10);
        await scrollContent.evaluate((el) => {
            el.scrollTop = el.scrollHeight
        });
        scrollPosition = await scrollContent.evaluate(el => el.scrollTop);
        await page.waitForTimeout(1000);
        const scrollPositionAfterDelay = await scrollContent.evaluate(el => el.scrollTop);
        expect(scrollPositionAfterDelay).toBeGreaterThan(scrollPosition);

        //IO-T32820 Check that if the user refreshes the page during streaming, the streaming stops, and the user can ask another question immediately afterward.
        await io.importsPage.fill(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_INPUT, "what is exports?");
        await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_SEND);
        await io.exportsPage.loadingTime();
        await page.waitForTimeout(4000);
        await io.homePage.reloadPage();
        await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_ICON);
        await io.assert.verifyElementDisplayedByText('Anything else Celigo AI can help with?', 'Answer displayed is not completed');
        const knowledgeBotInput = await page.$$(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_INPUT);
        expect(await knowledgeBotInput[0].getAttribute('class')).not.toContain('Mui-disabled');

        await io.importsPage.fill(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_INPUT, "What is Flow in IO");
        await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_SEND);
        await io.exportsPage.loadingTime();
        await page.getByText("Key features").nth(0).waitFor({state: "visible", timeout: 150000});
        const exportFunction = page.getByText('Anything else Celigo AI can help with?').nth(0);
        while (!(await exportFunction.isVisible())) {
            await page.mouse.wheel(0, 800);
        }
        await io.exportsPage.loadingTime();
        // IO-T27449
        await io.flowBuilder.clickByText("Key features");
        await io.homePage.loadingTime()
        const allPages = context.pages();
        await allPages[1].bringToFront();
        await allPages[1].waitForLoadState();
        const currentUrl = await allPages[1].url();
        const expectedUrl = 'Key-features';
        const func = currentUrl.toString().includes(expectedUrl)
        await io.assert.expectToBeTrue(func, "urls doesn't match")
        await allPages[0].bringToFront();
        await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_CLOSE);
        // Imports in Resources
        await io.homePage.goToMenu("Resources", "Imports");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_ICON, "Knowledge bot icon is not displayed");
        // Exports in Resources
        await io.homePage.goToMenu("Resources", "Exports");
        await io.exportsPage.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_ICON, "Knowledge bot icon is not displayed");
    });
});



