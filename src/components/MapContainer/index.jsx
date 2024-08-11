import React, { useState, useEffect } from "react";
import styles from "./style.module.less";
import AMapLoader from "@amap/amap-jsapi-loader";
import Button from "@/components/Button";
import { GDKEY } from "@/utils/config.js";
import Search from "@/components/MapContainer/search.jsx";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useStores } from "@/store/index.js";

window._AMapSecurityConfig = {
    securityJsCode: "8d3dc2951055462c50eb90f10801e0eb",
};

let iconfont = new URL("../../assets/locationIcon.png", import.meta.url);

const MapContainer = () => {
    let map = null;
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("");
    const { Image } = useStores();
    const navigate = useNavigate();
    let mark;
    const { setPos } = Image;

    useEffect(() => {
        AMapLoader.load({
            key: GDKEY, // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: [
                "AMap.AutoComplete",
                "AMap.PlaceSearch",
                "AMap.ElasticMarker",
                "AMap.Geocoder",
            ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        })
            .then((AMap) => {
                map = new AMap.Map("container", {
                    // 设置地图容器id
                    viewMode: "2D", // 是否为3D地图模式
                    zoom: 11, // 初始化地图级别
                    center: [104.06, 30.67], // 初始化地图中心点位置
                    resizeEnable: true,
                });
                const geocoder = new AMap.Geocoder();
                map.plugin(["AMap.Geolocation"], function () {
                    let geolocation = new AMap.Geolocation({
                        convert: true,
                        timeout: 5000,
                    });
                    map.addControl(geolocation); //定位当前位置插件； 用来获取和展示用户主机所在的经纬度位置；
                    geolocation.getCurrentPosition((status, res) => {
                        const pos = res.position;
                        if (res.position) {
                            setPos(pos.lng, pos.lat);
                            map.setCenter(pos);
                        }
                        mark = new AMap.Marker({
                            map: map,
                            draggable: true,
                            clickable: true,
                            position: pos,
                            icon: new AMap.Icon({
                                image: iconfont,
                                imageSize: new AMap.Size(40, 50),
                            }),
                            anchor: "bottom-center",
                        });
                        map.add(mark);
                        mark.on("dragend", () => {
                            const nowPos = mark.getPosition(); //获取点击位置的经纬度
                            const lng = nowPos.lng;
                            const lat = nowPos.lat;
                            setPos(lng, lat);

                            geocoder.getAddress([lng, lat], (status, res) => {
                                setValue(res.regeocode.formattedAddress);
                            });
                        });
                    });
                });

                map.on("click", (e) => {
                    const { lng, lat } = e.lnglat;
                    mark.setPosition(e.lnglat);
                    setPos(lng, lat);
                    geocoder.getAddress([lng, lat], (status, res) => {
                        setValue(res.regeocode.formattedAddress);
                    });
                });

                map.on("complete", function () {
                    const autoOptions = {
                        input: "tip-input",
                    };
                    const auto = new AMap.AutoComplete(autoOptions);
                    const placeSearch = new AMap.PlaceSearch({ map: map }); //构造地点查询类

                    auto.on("select", (e) => {
                        placeSearch.setCity(e.poi.adcode);
                        placeSearch.search(e.poi.name); //关键字查询查询
                    });
                });
            })
            .catch((e) => {
                console.log(e);
            });

        return () => {
            Image.uploadImage()
                .then((res) => {
                    console.log(res);
                })
                .catch((e) => {
                    console.log(e);
                    navigate("/login");
                });
            map?.destroy();
        };
    }, []);

    return (
        <div className={styles.mask}>
            <div className={styles.modal}>
                <Search />
                <div
                    id="container"
                    className={styles.container}
                    style={{ height: "800px" }}
                ></div>
                <Input
                    addonBefore="地点"
                    size={"large"}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button loading={loading} mark={mark} value={value}>
                    确定
                </Button>
            </div>
        </div>
    );
};

export default MapContainer;
