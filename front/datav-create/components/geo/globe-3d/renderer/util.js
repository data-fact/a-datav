/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/12.
 * Description:
 * Modified By:
 */
export function genOption(data,option,autoRotate,heightTexture,nightLayer,cloudsLayer,ambientLight,mainLight,globeRadius) {
    option = JSON.parse(JSON.stringify(option))

    option.globe.viewControl.autoRotate = autoRotate

    if(heightTexture)
        option.globe.heightTexture = ROOT_PATH + '/images/datav/bathymetry_bw_composite_4k.jpg'

    option.globe.layers = []
    if(nightLayer)
        option.globe.layers.push({
            type: 'blend',
            blendTo: 'emission',
            texture: ROOT_PATH + '/images/datav/night.jpg'
        })
    if(cloudsLayer)
        option.globe.layers.push({
            type: 'overlay',
            texture: ROOT_PATH + '/images/datav/clouds.png',
            shading: 'lambert',
            distance: 5
        })

    option.globe.light.ambient = { intensity: ambientLight }
    option.globe.light.main = { intensity: mainLight }
    option.globe.globeRadius = globeRadius

    return option
}