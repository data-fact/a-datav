/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/12.
 * Description:
 * Modified By:
 */
export function genOption(data,option) {
    option = {...option}
    option.data = data.map(v => v.value)

    return option
}