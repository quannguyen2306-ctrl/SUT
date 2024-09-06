import styles from "./HeroSection.module.css";
import { ReactTyped } from "react-typed";

export default function HeroSection() {
    return (
        <div className={styles.section} id="hero">
            <div className={styles.middle}>
                <h1>
                    Tối ưu hóa trải nghiệm <br />
                    <span className={styles.special}>
                        <ReactTyped
                            strings={[
                                "chơi thể thao",
                                "đặt sân thể thao",
                                "ghép đấu",
                                "kết nối",
                                "quản lý sân",
                            ]}
                            typeSpeed={50}
                            loop
                            backSpeed={30}
                            showCursor={true}
                        />
                    </span>
                </h1>
                <p>
                    Sút là một ứng dụng giúp người dùng tìm sân thể thao, xem lịch trống,
                    đặt sân trực tuyến và kết nối với cộng đồng thể thao.
                    <br /> Đồng thời, cung cấp giao diện quản lý chuyên nghiệp để các chủ
                    sân thể thao vận hành sân một cách tối ưu nhất.
                </p>

                <div className={styles.buttons}>
                    <a href="#signme">Sign me up</a>
                    <a href="https://www.youtube.com/watch?v=VW6hfaDD7Ok" target="blank">Xem video</a>
                </div>
            </div>
        </div>
    );
}
