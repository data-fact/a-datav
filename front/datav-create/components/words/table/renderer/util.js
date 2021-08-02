/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/12.
 * Description:
 * Modified By:
 */
import React from 'react'

export function genColumns(columns,table) {

    let {
        headerAlign,headerFont,bodyFont,rowNumberShow,headerColor,bodyColors,
        borderBottom = {},headerBorderBottom = {}
    } = table

    columns = [...columns]
    let fixedType = 'left'
    if(rowNumberShow)
        columns.unshift({
            dataIndex: '_index',key: '_index',title: '行号',width: 50,_fixed: true,_show: true,
            render: (text, record, index) => '' + (index + 1)
        })
    let newColumns = columns.filter(column => column._show).map(column => {
        if(fixedType == 'left' && !column._fixed)
            fixedType = 'right'
        return {
            ...column,
            fixed: column._fixed ? fixedType : false,
            title: (
                <span
                    style={{
                        width: '100%',display: 'inline-block', textAlign: headerAlign,
                        fontSize: headerFont.fontSize, fontFamily: headerFont.fontFamily,
                        color: headerFont.color
                    }}
                >{column.title}</span>
            ),
            onHeaderCell: () => {
                return {
                    style: getHeaderStyle(headerColor,headerBorderBottom)
                }
            },
            onCell: (record, index) => {
                let bodyStyle = getBodyStyle(bodyFont,borderBottom)
                if(column._color)
                    bodyStyle.color = column._color
                bodyStyle['textAlign'] = column._align
                bodyStyle.background = index % 2 ? bodyColors[0] : bodyColors[1]
                return {
                    style: bodyStyle
                }
            },
        }
    })
    return newColumns
}
function getHeaderStyle(headerColor,headerBorderBottom) {
    let style = {background: headerColor}
    style.borderBottomWidth = headerBorderBottom.width
    style.borderBottomStyle = headerBorderBottom.type
    style.borderBottomColor = headerBorderBottom.color
    return style
}
function getBodyStyle(bodyFont,borderBottom) {
    let style = {
        // width: '100%',display: 'inline-block',
        overflow: 'hidden', "text-overflow": "ellipsis", "white-space": "nowrap",
        fontSize: bodyFont.fontSize, fontFamily: bodyFont.fontFamily,
        color: bodyFont.color
    }
    if(borderBottom.show){
        style.borderBottomWidth = borderBottom.width
        style.borderBottomStyle = borderBottom.type
        style.borderBottomColor = borderBottom.color
    }else
        style.borderBottomWidth = 0
    return style
}