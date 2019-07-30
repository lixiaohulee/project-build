const presets = [
    [
        "@babel/env",
        {
            targets: {},
            "corejs": "2",
            useBuiltIns: "usage"
        }
    ]
]
const plugins = [
    [
        "@babel/plugin-syntax-dynamic-import"
    ]
]

module.exports = {
    presets,
    plugins
}