export class ImportTestData {
  Sample_Import = {
    type: "import",
    qa__import: {
      name: "NS import",
      _connectionId: "NETSUITE CONNECTION",
      lookups: [
        {
          expression: '["itemid","is","{{{sublists.sublist[*].Item}}}"]',
          recordType: "item",
          name: "ec8dc4d9d3ba4798959b4e56d8a9da3c",
          qa__expression: [["itemid", "is", "sublists.sublist[*].Item"]],
          resultField: "itemid",
          allowFailures: false
        },
        {
          name: "5d38f54e79db43958aa076dc52587423",
          allowFailures: false,
          map: {
            Memo: "Memo imported"
          }
        }
      ],
      distributed: true,
      netsuite_da: {
        useSS2Restlets: false,
        lookups: [
          {
            expression: '["itemid","is","{{{sublists.sublist[*].Item}}}"]',
            recordType: "item",
            name: "ec8dc4d9d3ba4798959b4e56d8a9da3c",
            qa__expression: [["itemid", "is", "sublists.sublist[*].Item"]],
            resultField: "itemid",
            allowFailures: false
          },
          {
            name: "5d38f54e79db43958aa076dc52587423",
            allowFailures: false,
            map: {
              Memo: "Memo imported"
            }
          }
        ],
        mapping: {
          lists: [
            {
              fields: [
                {
                  internalId: false,
                  extract: "sublists.sublist[*].Item",
                  generate: "item",
                  lookupName: "ec8dc4d9d3ba4798959b4e56d8a9da3c"
                },
                {
                  internalId: false,
                  extract: "sublists.sublist[*].Quantity",
                  generate: "quantity"
                },
                {
                  internalId: false,
                  extract:
                    "{{#if $.sublists.sublist[*].Amount}} {{$.sublists.sublist[*].Amount}} {{else}} 500{{/if}}",
                  generate: "amount"
                }
              ],
              generate: "item"
            },
            {
              fields: [
                {
                  internalId: false,
                  extract:
                    "{{$.sublists.sublist[*].Title}}{{$.sublists.sublist[*].Memo}}",
                  generate: "title"
                },
                {
                  internalId: false,
                  extract: "sublists.sublist[*].Memo",
                  generate: "note",
                  lookupName: "5d38f54e79db43958aa076dc52587423"
                },
                {
                  internalId: false,
                  hardCodedValue: "Outgoing",
                  generate: "direction"
                }
              ],
              generate: "usernotes"
            }
          ],
          fields: [
            {
              internalId: false,
              extract: "Name",
              generate: "entity"
            },
            {
              internalId: false,
              extract: "CustomFieldTest",
              generate: "custbody21"
            }
          ]
        },
        recordType: "salesorder",
        operation: "add"
      },
      filter: {
        type: "expression",
        expression: {
          version: "1"
        },
        version: "1"
      },
      adaptorType: "NetSuiteDistributedImport"
    }
  };
}