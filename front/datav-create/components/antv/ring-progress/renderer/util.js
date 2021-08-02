/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/12.
 * Description:
 * Modified By:
 */
export function genOption(data,option,title,content) {
    option = {...option}
    let percent = data && data[0] && data[0].value ? data[0].value : 0
    option.percent = percent

    option.statistic = {
        content: {
            style: {
                color: content.color,
                fontSize: content.fontSize,
                fontFamily: content.fontFamily
            }
        }
    }
    if(content.show){
        option.statistic.content = {
            style: {
                color: content.color,
                fontSize: content.fontSize,
                fontFamily: content.fontFamily
            },
            formatter: e => e.percent * 100 + '%'
        }
    }else{
        option.statistic.content = null
    }
    if(title.text){
        option.statistic.title = {
            style: {
                color: title.color,
                fontSize: title.fontSize,
                fontFamily: title.fontFamily
            },
            formatter: () => title.text
        }
    }else{
        option.statistic.title = null
    }
    return option
}