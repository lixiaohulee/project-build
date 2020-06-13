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
        "@babel/plugin-syntax-dynamic-import",
    ],
    [
        "import", {
            "libraryName": "view-design",
            "libraryDirectory": "src/components"
        }
    ]
]

module.exports = {
    presets,
    plugins
}