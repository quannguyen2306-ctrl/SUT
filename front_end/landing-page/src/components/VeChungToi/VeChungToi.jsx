import React from "react";
import jow from "../../assets/joww.png";
import mike from "../../assets/mikeee.png";
import chun from "../../assets/VS033679 - Trần Anh Chương (1).jpg";
import an from "../../assets/an.png"
import danh from "../../assets/danh.png"
import dan from "../../assets/dan.png"
import rene from "../../assets/rene.png"
import nn from "../../assets/nn.png"
import styles from "./styles.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function VeChungToi() { // Access deviceType directly from props
    return (
        <div className={styles.section} id="aboutus">
            <div className={styles.middle}>
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    // autoPlay
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className={styles.crsl}
                    containerClass="container-with-dots"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={70}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 4,
                            partialVisibilityGutter: 40
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0
                            },
                            items: 1,
                            partialVisibilityGutter: 30
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: 3,
                            partialVisibilityGutter: 30
                        }
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    <div className={styles.card}>
                        <div className={styles.smaller}>
                            <img src={jow} alt="jow" />
                            <div className={styles.container}>
                                <h4>Nguyễn Hoàng Quân</h4>
                                <p>Software Developer</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.smaller}>
                            <img src={mike} alt="mike" />
                            <div className={styles.container}>
                                <h4>Trần Gia Khang</h4>
                                <p>Software Developer</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.smaller}>
                            <img src={chun} alt="chun" />
                            <div className={styles.container}>
                                <h4>Trần Anh Chương</h4>
                                <p>Software Developer</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.smaller}>
                            <img src={an} alt="an" />
                            <div className={styles.container}>
                                <h4>Nguyễn Phước An</h4>
                                <p>ER & Spokesperson</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.smaller}>
                            <img src={dan} alt="an" />
                            <div className={styles.container}>
                                <h4>Lê Thiên Bửu Đan</h4>
                                <p>Marketing</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.smaller}>
                            <img src={danh} alt="an" />
                            <div className={styles.container}>
                                <h4>Bùi Nguyễn Công Danh</h4>
                                <p>ER</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.smaller}>
                            <img src={rene} alt="an" />
                            <div className={styles.container}>
                                <h4>Mai Anh Thư</h4>
                                <p>Designer</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.smaller}>
                            <img src={nn} alt="an" />
                            <div className={styles.container}>
                                <h4>Nguyễn Nam Nguyên</h4>
                                <p>Finance & Accounting</p>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
    );
}

export default VeChungToi;
