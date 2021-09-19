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

export function genConfig(columns,table,data){
    columns = columns.filter(c => c._show)
    data = [...data]
    let {rowNum,waitTime,headerColor,bodyColors,headerHeight,headerShow,hoverPause,carousel,headerFont,bodyFont,autoWidth} = table
    let align = columns.map(c => c._align)
    let config = {
        data: genData(data,columns,bodyFont),
        rowNum: rowNum,
        waitTime: waitTime * 1000,
        headerBGC: headerColor,
        oddRowBGC: bodyColors[0],
        evenRowBGC: bodyColors[1],
        headerHeight, hoverPause, carousel, align
    }
    if(headerShow)
        config.header = genHeader(columns,headerFont)
    if(!autoWidth)
        config.columnWidth = columns.map(c => c.width)
    return config
}

function genHeader(columns,headerFont){
    return columns.map(c => {
        let {color,fontSize,fontFamily} = headerFont
        return `<span style="${color ? 'color:' + color : ''};font-size: ${fontSize}px;font-family: ${fontFamily};">${c.title}</span>`
    })
}
function genData(data,columns,bodyFont){
    return data.map(row => {
        let rows = []
        columns.forEach(c => {
            let color = c._color || bodyFont.color
            let {fontSize,fontFamily} = bodyFont
            rows.push(`<span style="${color ? 'color:' + color : ''};font-size: ${fontSize}px;font-family: ${fontFamily};">${row[c.key]}</span>`)
        })
        return rows
    })
}