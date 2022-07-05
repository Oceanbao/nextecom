// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  env: {
    COMMERCE_CART_ENABLED: 'true',
    COMMERCE_SEARCH_ENABLED: 'true',
    COMMERCE_WISHLIST_ENABLED: 'true',
    COMMERCE_CUSTOMERAUTH_ENABLED: 'true',
    COMMERCE_CUSTOMCHECKOUT_ENABLED: 'true',
  },
  reactStrictMode: true,
  // Styled Component upgrade to SWC compiler
  // ssr and displayName are configured by default
  styledComponents: true,
  swcMiniy: true,
}

module.exports = nextConfig
