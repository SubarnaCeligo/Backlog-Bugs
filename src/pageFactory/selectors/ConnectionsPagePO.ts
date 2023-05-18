export enum ConnectionsPagePO {
  CREATE_CONNECTION = '[data-test="addNewResource"]',
  NAME = '[data-test="name"] input',
  APP_NAME_INPUT = '[data-test="application"] input[id*="react-select-"]',
  TEST_CONNECTION = '[data-test="test"]',
  ACTIONS_MENU_BUTTON = '[data-test="openActionsMenu"]',
  DELETE_CONNECTION = '[data-test="delete"]',
  MAGENTO2_BASE_URI = '[data-test="http.baseURI"] input',
  MAGENTO2_USERNAME = '[data-test="http.unencrypted.username"] input',
  MAGENTO2_PASSWORD = '[data-test="http.encrypted.password"] input',
  MAGENTO2_GENERATE_TOKEN = '[data-test="Generate token"]',
  FIRST_ROW_IN_CONNECTIONS_PAGE = "tbody"
}
