import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C108497_NS from '../../../testData/inputData/FlowDebugger/C108497_NS.json';
import C108497_SF_SOAP from '../../../testData/inputData/FlowDebugger/C108497_SF_SOAP.json';
import C108497_SF_REST from '../../../testData/inputData/FlowDebugger/C108497_SF_REST.json';
import C108497_SF_COMPOSITE from '../../../testData/inputData/FlowDebugger/C108497_SF_COMPOSITE.json';


test.describe("Verify that existing Netsuite/Salesforce imports have adaptor specific stub when Mock Output is repopulated.", () => {
    test("Verify that existing Netsuite import has adaptor specific stub when Mock Output is repopulated.", async ({io, page}) => {
  
        //Create a flow with Netsuite import
        await io.fillFormUI(C108497_NS, "FLOWS");

        //Go to Import page
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);


        //Expand the Mock Output section and click on Populate canonical stub
        await io.importsPage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
        await io.importsPage.click(selectors.importPagePO.POPULATE_CANONICAL_STUB);

       //Get the stub contents
       const stubContents = (await io.importsPage.getText(selectors.importPagePO.STUB_CONTENTS_CSS)).toString();
       const expectedStub = '[,  {,    "id": 478945,,    "statusCode": 200,,    "_json": {,      "id": 478945,    },,    "ignored": false,,    "errors": [],,    "dataURI": "",  },],';
       
       // Match with expected stub.
       const isExpected = (expectedStub.includes(stubContents));
       await io.assert.expectToBeTrue(isExpected, 'Invalid stub contents');
    });
    test("Verify that existing Salesforce SOAP import has adaptor specific stub when Mock Output is repopulated.", async ({io, page}) => {
       
        //Create a flow with Salesforce SOAP import 
        await io.fillFormUI(C108497_SF_SOAP, "FLOWS");

        //Go to Import page
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);

        //Expand the Mock Output section and click on Populate canonical stub
        await io.importsPage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
        await io.importsPage.click(selectors.importPagePO.POPULATE_CANONICAL_STUB);

         //Get Stub contents
         const stubContents = (await io.importsPage.getText(selectors.importPagePO.STUB_CONTENTS_CSS)).toString();
         const expectedStub = '[,  {,    "statusCode": 200,,    "id": "0010o000037gWmtAAE",,    "_json": {,      "id": "0010o000037gWmtAAE",,      "success": true,    },,    "errors": [],  },],';
         
         // //Match with expected stub.
         const isExpected = (expectedStub.includes(stubContents));
         await io.assert.expectToBeTrue(isExpected, 'Invalid stub contents');
         
    });
    test("Verify that existing Salesforce REST import has adaptor specific stub when Mock Output is repopulated.", async ({io, page}) => {
        
        //Create a flow with Salesforce REST import 
        await io.fillFormUI(C108497_SF_REST, "FLOWS");

        //Go to Import page
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);

        //Expand the Mock Output section and click on Populate canonical stub
        await io.importsPage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
        await io.importsPage.click(selectors.importPagePO.POPULATE_CANONICAL_STUB);

         //Get Stub contents
         const stubContents = (await io.importsPage.getText(selectors.importPagePO.STUB_CONTENTS_CSS)).toString();
         const expectedStub = '[,  {,    "statusCode": 200,,    "id": "0010o000037gWmyAAE",,    "_json": {,      "id": "0010o000037gWmyAAE",,      "success": true,,      "errors": [],    },,    "_headers": {,      "date": "Fri, 25 Aug 2023 11:50:41 GMT",,      "sforce-limit-info": "api-usage=10/15000",    },,    "errors": [],    },    ]'
         
         //Match with expected stub.
         const isExpected = (expectedStub.includes(stubContents));
         await io.assert.expectToBeTrue(isExpected, 'Invalid stub contents');

    });
    test("Verify that existing Salesforce COMPOSITE import has adaptor specific stub when Mock Output is repopulated.", async ({io, page}) => {
        
       //Create a flow with Salesforce COMPOSITE import 
       await io.fillFormUI(C108497_SF_COMPOSITE, "FLOWS");

       //Go to Import page
       await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
        
        //Expand the Mock Output section and click on Populate canonical stub
        await io.importsPage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
        await io.importsPage.click(selectors.importPagePO.POPULATE_CANONICAL_STUB);

        //Get Stub contents
        const stubContents = (await io.importsPage.getText(selectors.importPagePO.STUB_CONTENTS_CSS)).toString();
        const expectedStub ='[,  {,    "statusCode": 200,,    "id": "0010o000037gWjsAAE",,    "_json": [,      {,        "body": [,          {,            "id": "0010o000037gWjsAAE",,            "success": true,,            "errors": [],          },        ],,        "httpHeaders": {},,        "httpStatusCode": 200,,       "referenceId": "refAccount",       },       ],,       "errors": [],       },       ],'         

        // Match with expected stub.
        const expectedContainsActual = (expectedStub.includes(stubContents));
        await io.assert.expectToBeTrue(expectedContainsActual, 'Invalid stub contents');
    });

});