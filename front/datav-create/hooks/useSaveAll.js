/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/29.
 * Description:
 * Modified By:
 */
import React from 'react'
import useSaveDatav from "./useSaveDatav";
import {serializeComponent} from "../utils/util";
import useSaveComponentsAll from "./useSaveComponentsAll";

export default function useSaveAll(){

    let saveDatav = useSaveDatav()
    let saveComponentsAll = useSaveComponentsAll()

    function saveAll(canvas) {
        let components = []
        Object.keys(canvas.components).forEach(id => {
            components.push(serializeComponent(canvas.components[id],canvas.id))
        })
        saveDatav(canvas)
        saveComponentsAll(canvas.id,components)
    }
    return saveAll
}