export class CONNECTIONS {
    TC_C57810 = {
        MAGENTO2_BASE_URI: process.env["MAGENTO2_BASE_URI"],
        MAGENTO2_USERNAME: process.env["MAGENTO2_USERNAME"],
        MAGENTO2_PASSWORD: process.env["MAGENTO2_PASSWORD"]
    }
}

export const connectionsData = new CONNECTIONS();