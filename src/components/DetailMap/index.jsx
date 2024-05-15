import React, {useEffect, useState} from 'react';
import AMapLoader from "@amap/amap-jsapi-loader";
import {GDKEY} from "@/utils/config.js";
import styles from './style.module.less'

let iconfont = new URL("../../assets/locationIcon.png",import.meta.url);

const DetailMap = ({lng=104.06,lat=30.67}) => {
    let map = null;
    let mark

    useEffect(() => {

        window._AMapSecurityConfig = {
            securityJsCode: "8d3dc2951055462c50eb90f10801e0eb"
        };
        AMapLoader.load({
            key: GDKEY, // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        })
            .then((AMap) => {
                map = new AMap.Map("container", {
                    // 设置地图容器id
                    viewMode: "2D", // 是否为3D地图模式
                    zoom: 15, // 初始化地图级别
                    center: [lng, lat], // 初始化地图中心点位置
                    resizeEnable:true
                });

                mark = new AMap.Marker({
                    draggable:false,
                    clickable:false,
                    position:new AMap.LngLat(lng,lat),
                    icon: new AMap.Icon({
                        image:iconfont,
                        imageSize:new AMap.Size(40,50)
                    }),
                    anchor: 'bottom-center',
                })
                map.add(mark)

                map.on('complete', function(){
                    //地图图块加载完成后触发

                });

            })
            .catch((e) => {
                console.log(e);
            });
        return () => {
            map?.destroy();
        };
    }, []);
    return (
        <div id="container" className={styles.map}>
        </div>
    );
};

export default DetailMap;
