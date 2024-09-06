import { useState } from 'react'
import styles from './Products.module.css'

function ReturnShit({ param }) {
    if (param === 'user') {
        return (
            <div className={styles.wrapper}>
                <div className={styles.wrapper2}>
                    <div className={styles.divider1}>
                        <h1>Đặt sân</h1>
                    </div>
                    <div className={styles.divider2}>
                        <div className={styles.singleCard}>
                            <h4>Tìm kiếm sân</h4>
                            <p>Với hơn 200 sân đối tác khắp khu vực và thuật toán tìm sân đầy mạnh mẽ, tìm kiếm sân phù hợp với bạn dễ dàng hơn bao giờ hết.</p>
                        </div>
                        <div className={styles.singleCard}>
                            <h4>Thời gian thực</h4>
                            <p>Tất cả giờ trống của sân đều được cập nhật theo thời gian thực, cho phép trải nghiệm đặt sân không độ trễ.</p>
                        </div>
                        <div className={styles.singleCard}>
                            <h4>Đặt sân</h4>
                            <p>Khi đã chọn được sân, khung giờ phù hợp và thanh toán, đơn đặt sẽ ngay lập tức được tiến hành.</p>
                        </div>
                    </div>
                </div>
                <div className={styles.line2}></div>
                <div className={styles.wrapper2}>
                    <div className={styles.divider1}>
                        <h1>Ghép đấu</h1>
                    </div>
                    <div className={styles.divider2}>
                        <div className={styles.singleCard}>
                            <h4>Phù hợp</h4>
                            <p>Ghép đấu với người chơi cùng trình độ, khu vực và thời gian trống.</p>
                        </div>
                        <div className={styles.singleCard}>
                            <h4>Chủ động</h4>
                            <p>Chủ động xem profile người được ghép, đồng ý hoặc từ chối đơn ghép, chọn những phòng ghép hoặc ghép đấu ngẫu nhiên.</p>
                        </div>
                    </div>
                </div>
                <div className={styles.line2}></div>
                <div className={styles.wrapper2}>
                    <div className={styles.divider1}>
                        <h1>Kết nối</h1>
                    </div>
                    <div className={styles.divider2}>
                        <div className={styles.singleCard}>
                            <h4>Mạng xã hội</h4>
                            <p>Đăng bài, chia sẻ những khoảnh khắc và thành tựu.</p>
                        </div>
                        <div className={styles.singleCard}>
                            <h4>Kết bạn</h4>
                            <p>Theo dõi và trò chuyện với người yêu thích thể thao khác.</p>
                        </div>
                    </div>
                </div>

                <div className={styles.line2}></div>
                <div className={styles.wrapper2}>
                    <div className={styles.divider1}>
                        <h1>Dịch vụ tài chính</h1>
                    </div>
                    <div className={styles.divider2}>
                        <div className={styles.singleCard}>
                            <h4>Thanh toán</h4>
                            <p>Thanh toán trực tiếp với ví điện tử VNPay hoặc các ngân hàng nội địa cũng như quốc tế.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (param === 'owner') {
        return (
            <div className={styles.wrapper}>
                <div className={styles.wrapper2}>
                    <div className={styles.divider1}>
                        <h1>Quản lý sân</h1>
                    </div>
                    <div className={styles.divider2}>
                        <div className={styles.singleCard}>
                            <h4>Tự động hóa</h4>
                            <p>Khi kết nối với ứng dụng đặt sân, tất cả đơn đặt sẽ được xử lí một cách tự động và không cần sự can thiệp của bạn.</p>
                        </div>
                        <div className={styles.singleCard}>
                            <h4>Chủ động</h4>
                            <p>Tùy chỉnh thông tin sân, lịch sân, chương trình khuyến mãi, dịch vụ đi kèm.</p>
                        </div>
                    </div>
                </div>
                <div className={styles.line2}></div>

                <div className={styles.wrapper2}>

                    <div className={styles.divider1}>
                        <h1>Báo cáo</h1>
                    </div>
                    <div className={styles.divider2}>
                        <div className={styles.singleCard}>
                            <h4>Đầy đủ & minh bạch</h4>
                            <p>Báo cáo về doanh thu, lịch đặt, độ hiệu quả và nhiều chỉ số khác cho sân của bạn.</p>
                        </div>
                    </div>
                </div>
                <div className={styles.line2}></div>
                <div className={styles.wrapper2}>
                    <div className={styles.divider1}>
                        <h1>Quảng cáo</h1>
                    </div>
                    <div className={styles.divider2}>
                        <div className={styles.singleCard}>
                            <h4>Hiệu quả</h4>
                            <p>Tiếp cận đúng tệp khách hàng với lượng truy cập cao. Cam kết cho những chiến dịch quảng bá hiệu quả cho bạn.</p>
                        </div>
                        <div className={styles.singleCard}>
                            <h4>Đánh giá</h4>
                            <p>Sử dụng trình quản lý quảng cáo để xem phân tích chỉ số hiệu quả quảng cáo của bạn bất kì lúc nào.</p>
                        </div>
                    </div>
                </div>
                <div className={styles.line2}></div>
                <div className={styles.wrapper2}>
                    <div className={styles.divider1}>
                        <h1>Dịch vụ tài chính</h1>
                    </div>
                    <div className={styles.divider2}>
                        <div className={styles.singleCard}>
                            <h4>Thanh toán</h4>
                            <p>Thanh toán các gói quảng cáo và nhận tiền trực tiếp từ hệ thống với ví điện tử VNPay hoặc các ngân hàng nội địa & quốc tế.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.wrapper}>
                <div className={styles.wrapper2}>
                    <div className={styles.divider1}>
                        <h1>Quảng cáo</h1>
                    </div>
                    <div className={styles.divider2}>
                        <div className={styles.singleCard}>
                            <h4>Hiệu quả</h4>
                            <p>Tiếp cận đúng tệp khách hàng với lượng truy cập cao. Cam kết cho những chiến dịch quảng bá hiệu quả cho bạn.</p>
                        </div>
                        <div className={styles.singleCard}>
                            <h4>Đánh giá</h4>
                            <p>Sử dụng trình quản lý quảng cáo để xem phân tích chỉ số hiệu quả quảng cáo của bạn bất kì lúc nào.</p>
                        </div>
                    </div>
                </div>
                <div className={styles.line2}></div>
                <div className={styles.wrapper2}>
                    <div className={styles.divider1}>
                        <h1>Dịch vụ tài chính</h1>
                    </div>
                    <div className={styles.divider2}>
                        <div className={styles.singleCard}>
                            <h4>Thanh toán</h4>
                            <p>Thanh toán các gói quảng cáo và nhận tiền trực tiếp từ hệ thống với ví điện tử VNPay hoặc các ngân hàng nội địa & quốc tế.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default function Products() {
    const [selecting, setSelecting] = useState('user')

    return (
        <div className={styles.section} id='sanpham'>
            <div className={styles.middle}>
                <h1 style={{ textAlign: 'center' }}>Sản phẩm & dịch vụ</h1>
                <div className={styles.target}>
                    <div style={selecting === 'user' ? { backgroundColor: "#F85772", color: "white" } : null} onClick={() => setSelecting('user')}>Người dùng</div>
                    <div style={selecting === 'owner' ? { backgroundColor: "#F85772", color: "white" } : null} onClick={() => setSelecting('owner')}>Chủ sân</div>
                    <div style={selecting === 'brand' ? { backgroundColor: "#F85772", color: "white" } : null} onClick={() => setSelecting('brand')}>Nhãn hàng</div>
                </div>
                <div className={styles.line}></div>
                <ReturnShit param={selecting} />
            </div >
        </div >
    )
}
