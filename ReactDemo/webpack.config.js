var webpack = require('webpack');//����Webpackģ�鹩���ǵ��ã�����ֻ��ʹ��ES5�﷨��ʹ��ES6�﷨�ᱨ��

//__dirname��node.js�е�һ��ȫ�ֱ�������ָ��ǰִ�нű����ڵ�Ŀ¼
module.exports = {//ע��������exports����export
    devtool: 'eval-source-map',//��������Source Maps��ѡ����ʵ�ѡ��
    entry: {
        app: [__dirname + "/src/main.js"//Ψһ����ļ�������Java�е�main����
        ],
        reactlibs: ['react', 'react-dom', 'react-redux', 'redux',
            'react-router', 'redux-router', 'redux-thunk', 'redux-saga'],
    },
    output: {//���Ŀ¼
        path: __dirname + "/build",//������js�ļ���ŵĵط�
        filename: "bundle.js"//������js�ļ���
    },

    module: {
        //loaders������
        loaders: [
            {
                test: /\.(js|jsx)$/,//һ��ƥ��loaders��������ļ�����չ����������ʽ����������ƥ��js��jsx�ļ������룩
                exclude: /node_modules/,//���β���Ҫ������ļ����ļ��У�����ѡ��
                loader: 'babel-loader',//loader�����ƣ����룩
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: ['transform-runtime', ['import', {
                        libraryName: 'antd',
                        style: 'css'
                    }]]
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.sass/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.styl/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
                test: /\.(png|jpg|gif|woff|woff2)$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            },
            {
                test: /\.(mp4|ogg|svg)$/,
                loader: 'file-loader'
            },
            {test: /\.(eot|woff|ttf)$/, loader: "file-loader"}
        ]
    },

    plugins: [
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery",
        //     "window.jQuery": "jquery"
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['reactlibs'],
            filename: '[name].bundle.js',
            minChunks: Infinity
        }),//��ȡ��������
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),// ����ѹ��
        new webpack.HotModuleReplacementPlugin()//�ȼ��ز��
    ],

    //webpack-dev-server����
    devServer: {
        contentBase: './build',//Ĭ��webpack-dev-server��Ϊ���ļ����ṩ���ط������������Ϊ����һ��Ŀ¼�µ��ļ��ṩ���ط�������Ӧ������������������Ŀ¼���������õ�"build"Ŀ¼��
        //colors: true,//��cmd�ն��������ɫ��־
        historyApiFallback: true,//�ڿ�����ҳӦ��ʱ�ǳ����ã���������HTML5 history API���������Ϊtrue�����е���ת��ָ��index.html
        inline: true,//����Ϊtrue����Դ�ļ��ı�ʱ���Զ�ˢ��ҳ��
        port: 8080,//����Ĭ�ϼ����˿ڣ����ʡ�ԣ�Ĭ��Ϊ"8080"
        //process: true,//��ʾ�ϲ��������
    }
};
