export class ExportsPagePO {
  ADD_NEW_RESOURCE = '[data-test="addNewResource"]';
  NAME = '[data-test="name"] input';
  APP_NAME_INPUT = '[data-test="application"] input[id*="react-select-"]';
  MOCK_OUTPUT_ARIA_EXPAND_BUTTON = '[data-test="Mock output"]';
  MOCK_OUTPUT_WINDOW = '[data-test="mockOutput"]';
  MOCK_OUTPUT_TEXTAREA = '#mockOutput > textarea';
  CONNECTIONS_DROPDOWN = '[id="connections-dropdown"]';
  QUERY_PARAMETERS_AREA = '[id="assistantMetadata.queryParams"]';
  QUERY_PARAMETERS_ROW = '[data-test="queryParameters"] ul li';
  QUERY_PARAMETERS_NAME_FIELD = '[id="name-';
  QUERY_PARAMETERS_VALUE_FIELD = '[id="value-';
  CONFIGURE_EXPORT_TYPE = '[data-test="Configure export type"]';
  MOCK_OUTPUT_DATA_SIZE_ERROR = '[class^="MuiFormHelperText-root jss"]';
  ASSISTANT_META_DATA_RESOURCE = '[data-test="assistantMetadata.resource"]';
  ASSISTANT_META_DATA_OPERATION = '[data-test="assistantMetadata.operation"]';
  ASSISTANT_META_DATA_VERSION = '[data-test="assistantMetadata.version"]';
  ASSISTANT_META_DATA_EXPORT_TYPE = '[data-test="assistantMetadata.exportType"]';
  ASSISTANT_META_DATA_PATH_PARAMS_ID = '[data-test="assistantMetadata.pathParams.id"] input';
  HTTP_METHOD = '[data-test="http.method"]';
  HTTP_RELATIVE_URI = '[data-test="http.relativeURI"] input';
  FILE_TYPE = '[data-test="file.type"]';
  FTP_DIRECTORY_PATH = '[data-test="ftp.directoryPath"] input';
}
