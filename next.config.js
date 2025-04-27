const securityHeaders = [
  {
    key: "Referrer-Policy",
    // Needed to support Google Auth in localhost dev settings.
    // https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#get_your_google_api_client_id
    value: "no-referrer-when-downgrade",
  },
];

module.exports = {
  env: {
    API_SERVER: process.env.API_SERVER,
    USER_TOKEN: process.env.USER_TOKEN,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  transpilePackages: ["react-hotjar"],
};
