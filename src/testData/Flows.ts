export class FlowsTestData {
  Sample_Flow = {
    skipRetries: false,
    _integrationId: "Automation Flows",
    name: "Automation Flows",
    disabled: false,
    qa__dataVerification: {
      expectedJSON: {
        name: "Edit_Flow58_sftp(tab-space)_To_Zendesk(updateignore_Delete)",
        disabled: false,
        _integrationId: "Automation Flows",
        skipRetries: false,
        pageProcessors: [
          {
            type: "import",
            responseMapping: {
              lists: [],
              fields: []
            }
          }
        ],
        pageGenerators: [
          {
            qa__ignore: true,
            skipRetries: false
          }
        ]
      },
      importJSON: {
        skipRetries: false,
        _integrationId: "Automation Flows",
        name: "Edit_Flow58_sftp(tab-space)_To_Zendesk(updateignore_Delete)",
        disabled: false,
        pageProcessors: [
          {
            type: "import",
            qa__import: {
              rest: {
                ignoreExtract: null,
                lookups: [
                  {
                    extract: "results[0].id",
                    method: "GET",
                    postBody: "",
                    name: "uitodelete",
                    relativeURI:
                      "search.json?query=type:organization notes:{{{Column1}}}"
                  }
                ],
                headers: [],
                method: ["PUT"],
                responseIdPath: ["null"],
                body: [],
                ignoreLookupName: "uitodelete",
                successPath: ["null"],
                relativeURI: ["organizations/{{{uitodelete}}}.json"]
              },
              mapping: {
                fields: [
                  {
                    extract: "Column0",
                    generate: "organization.name"
                  },
                  {
                    extract: "Column1",
                    generate: "organization.notes"
                  },
                  {
                    extract: "Column2",
                    generate: "Phone"
                  },
                  {
                    extract: "Column3",
                    generate: "Fax"
                  }
                ]
              },
              settings: {
                c: "d"
              },
              _connectionId: "HTTP ZENDESK CONNECTION",
              distributed: false,
              ignoreMissing: true
            }
          }
        ],
        pageGenerators: [
          {
            qa__export: {
              ftp: {
                directoryPath: "/IO_Automation_FTP_Exports_EditFlows",
                fileNameStartsWith:
                  "Edit_Flow58_sftp(tab-space)_To_Zendesk(updateignore_Delete)"
              },
              file: {
                skipDelete: true,
                csv: {
                  rowDelimiter: "\r\n",

                  columnDelimiter: "\t",
                  hasHeaderRow: false
                },
                encoding: "utf8",
                type: "csv"
              },
              asynchronous: true,
              _connectionId: "FTP CONNECTION"
            }
          }
        ]
      }
    },
    pageGenerators: [
      {
        qa__isEdit: true,
        qa__export: {
          name: "export1",
          adaptorType: "FTPExport",
          ftp: {},
          qa__path: "//FTP_uploads//35FTP to zendesk flow.txt",
          file: {
            csv: {
              columnDelimiter: " "
            },
            type: "csv"
          },
          settings: {
            a: "b"
          },
          asynchronous: true,
          _connectionId: "FTP CONNECTION",
          qa__export1: {
            ftp: {
              directoryPath: "/IO_Automation_FTP_Exports_EditFlows",
              fileNameStartsWith:
                "Edit_Flow58_sftp(tab-space)_To_Zendesk(updateignore_Delete)"
            },
            file: {
              output: "records",
              skipDelete: true,
              csv: {
                rowDelimiter: "\r\n",
                columnDelimiter: " ",
                hasHeaderRow: false,
                rowsToSkip: 0,
                trimSpaces: true
              },
              encoding: "utf8",
              type: "csv"
            },
            settings: {
              a: "b"
            },
            adaptorType: "FTPExport",
            asynchronous: true,
            _connectionId: "FTP CONNECTION"
          }
        }
      }
    ],
    pageProcessors: [
      {
        type: "import",
        qa__isEdit: true,
        qa__import: {
          name: "import1",
          adaptorType: "HTTPImport",
          rest: {
            method: ["DELETE"]
          },
          _connectionId: "HTTP ZENDESK CONNECTION",
          distributed: false,
          qa__import1: {
            rest: {
              ignoreExtract: null,
              lookups: [
                {
                  extract: "results[0].id",
                  method: "GET",
                  postBody: "",
                  name: "uitodelete",
                  relativeURI:
                    "search.json?query=type:organization notes:{{{Column1}}}"
                }
              ],
              method: ["PUT"],
              responseIdPath: ["null"],
              body: [],
              ignoreLookupName: "uitodelete",
              successPath: ["null"],
              relativeURI: ["organizations/{{{lookup.uitodelete}}}.json"]
            },
            http: {
              relativeURI: ["organizations/{{{lookup.uitodelete}}}.json"],
              method: ["PUT"],
              body: [],
              batchSize: 1,
              ignoreLookupName: "uitodelete",
              strictHandlebarEvaluation: true,
              sendPostMappedData: true,
              lookups: [
                {
                  extract: "results[0].id",
                  method: "GET",
                  name: "uitodelete",
                  relativeURI:
                    "search.json?query=type:organization notes:{{{Column1}}}",
                  body: "",
                  useImportHeaders: false
                }
              ],
              response: {
                resourceIdPath: ["null"]
              }
            },
            adaptorType: "RESTImport",
            mapping: {
              fields: [
                {
                  extract: "Column0",
                  generate: "organization.name"
                },
                {
                  extract: "Column1",
                  generate: "organization.notes"
                },
                {
                  extract: "Column2",
                  generate: "Phone"
                },
                {
                  extract: "Column3",
                  generate: "Fax"
                }
              ]
            },
            lookups: [
              {
                extract: "results[0].id",
                method: "GET",
                postBody: "",
                name: "uitodelete",
                relativeURI:
                  "search.json?query=type:organization notes:{{{Column1}}}"
              }
            ],
            settings: {
              c: "d"
            },
            _connectionId: "HTTP ZENDESK CONNECTION",
            distributed: false
          }
        }
      }
    ]
  };
  C51619 = {
    importJSON: {
      skipRetries: false,
      _integrationId: "Automation Flows",
      name: "C51619",
      disabled: false,
      pageProcessors: [
        {
          type: "export",
          qa__export: {
            name: "C51619 Import",
            _connectionId: "BIGCOMMERCE CONNECTION",
            asynchronous: true,
            isLookup: true,
            assistant: "bigcommerce",
            oneToMany: false,
            sandbox: false,
            assistantMetadata: {
              resource: "customers",
              version: "v2",
              operation: "get_acustomer"
            },
            http: {
              relativeURI: "/v2/customers/sample",
              method: "GET",
              headers: [],
              successMediaType: "json",
              errorMediaType: "json",
              formType: "assistant"
            },
            rest: {
              relativeURI: "/v2/customers/sample",
              method: "GET",
              headers: [],
              allowUndefinedResource: false
            },
            adaptorType: "RESTExport"
          }
        }
      ],
      pageGenerators: [
        {
          qa__export: {
            name: "C51619 Export",
            _connectionId: "BIGCOMMERCE CONNECTION",
            asynchronous: true,
            type: "test",
            assistant: "bigcommerce",
            oneToMany: false,
            sandbox: false,
            assistantMetadata: {
              resource: "customers",
              version: "v2",
              operation: "list_customers"
            },
            http: {
              relativeURI:
                '/v2/customers{{#compare export.http.paging.page "!=" "1"}}?page={{{export.http.paging.page}}}{{/compare}}',
              method: "GET",
              successMediaType: "json",
              errorMediaType: "json",
              formType: "assistant",
              paging: {
                method: "page",
                page: 1,
                relativeURI:
                  '/v2/customers{{#compare export.http.paging.page "!=" "1"}}?page={{{export.http.paging.page}}}{{/compare}}',
                lastPageStatusCode: 404
              }
            },
            rawData: "6459f72c0efd8768f4e3ec6d08e4cf48cdfe409e826f0129002be504",
            test: {
              limit: 1
            },
            rest: {
              relativeURI: "/v2/customers",
              method: "GET",
              pagingMethod: "pageargument",
              allowUndefinedResource: false,
              pageArgument: "page"
            },
            adaptorType: "RESTExport"
          }
        }
      ]
    },
    ATTRIBUTE: 'title',
    VALIDATION_TEXT: "Selected errors are added to a batch, on which you can perform bulk retry and resolve actions."
  };
}

export const flowsTestData = new FlowsTestData();
