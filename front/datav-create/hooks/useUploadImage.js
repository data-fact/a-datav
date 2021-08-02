/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/14.
 * Description:
 * Modified By:
 */
import React from 'react'
import fetch from "../../common/fetch";
import exception from "../../common/exception";
import useCanvasReducer from "../reducers/useCanvasReducer";

export default function useUploadImage(){

    let [,canvasDispatch] = useCanvasReducer()

    function uploadImage(id,image) {

        let formData = new FormData();
        formData.append('image', image);
        fetch(`../upload/image/${id}`,{
            method:'POST',
            body: formData
        })
            .then(res => {
                if(res.ok)
                    return res.text()
                else
                    return exception(res)
            })
            .then(image => {
                canvasDispatch({type: 'CHANGE_COVER_IMAGE',image})
            })
            .catch(err => {
                console.error(err)
            })
    }

    return uploadImage
}