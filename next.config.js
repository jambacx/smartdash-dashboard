module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://wvxi4jax35.execute-api.ap-northeast-1.amazonaws.com/api/:path*",
      },
    ];
  },
};
