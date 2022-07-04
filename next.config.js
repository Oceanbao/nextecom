// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  // Styled Component upgrade to SWC compiler
  // ssr and displayName are configured by default
  styledComponents: true,
  swcMiniy: true,
}

module.exports = nextConfig
