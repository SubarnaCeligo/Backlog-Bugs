import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C27953", () => {
    test("@Env-All TC_C27953 To verify field labels present in HTTP connection drawer is Changed as per new modification", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);

        await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);

        await io.flowBuilder.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.NONSTANDARD);
        await io.flowBuilder.click(selectors.connectionsPagePO.HOW_TO_TESTCONNECTION);

        const httpConfigObject = [
            {
                label: "Base URI *",
            },
            {
                label: "Media type *",
                helpText: "Specify the data format to use in the HTTP request body and HTTP response body."
            },
            {
                label: "Override media type for success responses",
                helpText: "Use this field to handle the use case where a successful HTTP response returns a different media type than the original HTTP request body sent."
            },
            {
                label: "Override media type for error responses",
                helpText: "Use this field to handle the use case where an unsuccessful HTTP response returns a different media type than the original HTTP request body sent."
            },
            {
                label: "Configure authentication",
            },
            {
                label: "Auth type *",
            },
            {
                label: "Path to auth error field in HTTP response body",
                helpText: "This field only needs to be set if the API returns a field in the HTTP response body to indicate auth errors. For example, if an API returns the field 'errorMessage' with the value 'Auth failed', then you would set this field to 'errorMessage'."
            },
            {
                label: "Auth error values",
                helpText: "Use this field to limit the exact values in the HTTP response body field that should be used to determine auth errors. To provide multiple values, use a comma-separated list."
            },
            {
                label: "Non-standard API rate limiter",
            },
            {
                label: "Override HTTP status code for rate-limit errors",
                helpText: "This field only needs to be set if the HTTP status code for rate-limit errors is not 429.  For example, an API could return a generic 400 status code instead, and then use a field in the HTTP response body to indicate rate-limit errors."
            },
            {
                label: "Path to rate-limit error field in HTTP response body",
                helpText: "This field only needs to be set if the API returns a field in the HTTP response body to indicate rate-limit errors. For example, if an API returns the field 'errorMessage' with the value 'Too many requests', then you would set this field to 'errorMessage'."
            },
            {
                label: "Rate-limit error values",
                helpText: "Use this field to limit the exact values in the HTTP response body field that should be used to determine rate-limit errors. To provide multiple values, use a comma-separated list."
            },
            {
                label: "Override retry-after HTTP response header name",
            },
            {
                label: "Relative URI",
            },
            {
                label: "HTTP method",
            },
            {
                label: "Path to success field in HTTP response body",
                helpText: "This field only needs to be set if the API always returns a successful HTTP status code, but then uses a field in the HTTP response body to indicate a successful request. For example, if the API always returns a 200 success HTTP status code, but then indicates success via a 'success' boolean field in the HTTP response body."
            },
            {
                label: "Success values",
                helpText: "Use this field to limit the exact values in the HTTP response body field that should be used to determine if the request succeeded. To provide multiple values, use a comma-separated list."
            },
            {
                label: "Path to error field in HTTP response body",
                helpText: "This field only needs to be set if the API always returns a successful HTTP status code, but then uses a field in the HTTP response body to indicate a failed request. For example, if the API always returns a 200 success HTTP status code, but then indicates errors via an 'error.message' field in the HTTP response body."
            },
            {
                label: "Error values",
            },
            {
                label: "Path to detailed error message field in HTTP response body",
                helpText: "This optional field is used to specify which field in the HTTP response body contains the detailed error message for the purpose of displaying the error on the error management dashboard.  If this field is not set, then the full HTTP response body will be used as the error message in the error management dashboard."
            }
        ]

        for(let i = 0; i < httpConfigObject.length; i++) {
            let label = httpConfigObject[i].label;
            let helpText = httpConfigObject[i].helpText;
            await io.assert.verifyElementDisplayedByText(label, `Element with label ${label} is not displayed`);
            if(helpText) {
                await io.connectionPage.click(`label:has-text("${label}") + button`);
                await io.assert.verifyElementDisplayedByText(helpText, `HelpText displayed for element ${label} is not correct`);
            }
        }
    });

});
