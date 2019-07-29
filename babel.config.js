const presets = [
    [
        "@babel/env",
        {
            useBuiltIns: "usage"
        }
    ]
]
const plugins = [
    ["@babel/plugin-syntax-dynamic-import"]
]

module.exports = {
    presets,
    plugins
}