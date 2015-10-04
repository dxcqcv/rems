{
    appDir: '../public',
    mainConfigFile: '../public/js/common.js',
    dir: '../public-built',
    optimizeCss: 'standard',
    map: {
        '*': {
           'css':'css.min' 
        }
    },
    modules: [
        {
            name: '../common',
            include: [
                'app/roy'
            ]
        }
        ,
        {
            name: 'app/index',
            exclude: ['../common']
        }
        ,
        {
            name: 'app/login',
            exclude: ['../common']
        }
        ,
        {
            name: 'app/nxfx',
            exclude: ['../common']
        }
        ,
        {
            name: 'app/nxjc',
            exclude: ['../common']
        }
        ,
        {
            name: 'app/sjjc',
            exclude: ['../common']
        }
        ,
        {
            name: 'app/xmgl',
            exclude: ['../common']
        }
    ]
}

