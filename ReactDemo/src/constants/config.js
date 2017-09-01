var CONFIG = {
    uf: {
        host: '127.0.0.1:9099',
        version: 'v0.1'
    },
    app: {
        name: '个人管理系统',
        code: 'personal-manage'
    },
    undo_limit: 10,
    undo_debug: true,
    allow_template_selection: true,
    api_protocol: 'http',
    forward: {
        debug: true,                              //是否开启转发调试开关
        host: 'localhost:3030',                   //正在运行的域名
        version: 'v0.1',                         //版本号
        serviceHost: 'http://127.0.0.1:9088' //转发host,如果本地调试要测试ie8/ie9,此配置必填
    }
};

window.CONFIG = CONFIG;

if (window.CONFIG) {
    module.exports = window.CONFIG
} else {
    throw new Error('window.config not exist')
}
