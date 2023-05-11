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
}