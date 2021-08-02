export function genOption(data, option, color) {
    option = { ...option }
    option.series[0].data = data
    color = [...color]
    color.splice(0, option._color.length, ...option._color)
    option.series[0].color = color
    return option
}