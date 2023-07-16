const endpoint = {
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  assets: import.meta.env.VITE_API_BASE_URL,
  currency_config: {
    currency: import.meta.env.CURRENCY,
    symbol: import.meta.env.SYMBOL,
  },
  sms_config: {},
  email_config: {},
}

export default endpoint
