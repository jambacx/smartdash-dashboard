module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://ntqunnzggk.execute-api.ap-northeast-1.amazonaws.com/api/:path*",
      },
    ];
  },
};
