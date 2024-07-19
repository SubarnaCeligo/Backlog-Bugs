import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '../../testData/inputData/FlowBuilder/T32338.json';

test.describe("@Author_MaheshNivruttiSutar Verify is able to create graphql blob import thorough create from scratch", () => {
    test("@Bug-IO-81590 @Env-All @Priority-P2 @Zephyr-IO-T32338", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "GRAPHQL");
        await io.flowBuilder.clickByText('GraphQL');
        await io.flowBuilder.clickByText("Look up additional files (per record)");
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.clickByText("GRAPHQL CONNECTION");
        await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD);
        await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);
        await io.connectionPage.addStep("HTTP method as POST");
        await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "GRAPHQL BLOB IMPORT");
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.GRAPHQLQUERY1, TC.query);
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.SAVEANDCLOSE);
        await io.flowBuilder.loadingTime();
        const flow = await io.flowBuilder.isVisible("text='DESTINATIONS & LOOKUPS'");
        await io.assert.expectToBeTrue(flow, "Import is not created");

    });
}
);
