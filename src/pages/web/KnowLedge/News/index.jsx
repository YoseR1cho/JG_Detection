import { useEffect, useState } from "react";
import styles from "./style.module.less";

import Carousel from "./Carousel.jsx";
import Card from "./Card.jsx";
import { Spin } from "antd";

import { observer } from "mobx-react";
import { useStores } from "@/store/index.js";
const App = () => {
    const { News } = useStores();
    const { news, loadNews, loading, dataList, handlerForward, handlerBack } =
        News;

    const [page, setPage] = useState(1);
    const forward = () => {
        handlerForward(page);
        setPage((prevState) => prevState + 1);
    };
    const back = () => {
        handlerBack(page - 1);
        setPage((prevState) => prevState - 1);
    };

    useEffect(() => {
        loadNews();
    }, []);
    console.log(news);
    console.log(dataList);

    return (
        <Spin spinning={loading}>
            <div className={styles.overall}>
                <h2 className={styles.title}>新闻速递</h2>
                <div className={styles.Caiousel}>
                    <Carousel />
                </div>
                <div className={styles.newsList}>
                    <div className={styles.left}>
                        {dataList &&
                            dataList.map((item, index) => {
                                return (
                                    <div
                                        className={styles.news1}
                                        key={item.pId}
                                    >
                                        <Card
                                            data={{
                                                title: item.title,
                                                description: item.description,
                                                coverUrl: item.coverUrl,
                                                href: item.href,
                                            }}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div>
                    <button
                        onClick={back}
                        className={styles.btn1}
                        disabled={page === 1}
                    >
                        上一页
                    </button>
                    <button
                        onClick={forward}
                        className={styles.btn2}
                        disabled={page === news.length / 8}
                    >
                        下一页
                    </button>
                </div>
            </div>
        </Spin>
    );
};
export default observer(App);
