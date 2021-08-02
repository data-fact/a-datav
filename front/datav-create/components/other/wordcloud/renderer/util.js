export function genOption(data, option, color) {
    option = { ...option }
    option.series[0].data = data.map((d,i) => ({...d,_index:i}))
    color = [...color]
    color.splice(0, option._color.length, ...option._color)
    option.series[0].textStyle.color = (e) => {
        return color[e.dataIndex % color.length]
    }
    return option
}