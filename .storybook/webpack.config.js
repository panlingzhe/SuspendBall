module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        loader: "url-loader?limit=1024&name=images/[name].[ext]"
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=1024&name=fonts/[name].[ext]"
      }
    ]
  }
};
