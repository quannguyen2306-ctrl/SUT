import styles from './Navbar.module.css'
import logo from "../../assets/sut_logo.png"

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <a href='#hero'>
                <img src={logo} className={styles.logo} alt="" />
            </a>
            <div className={styles.flex}>
                <a href='#sumenh'>Sứ mệnh</a>
                <a href='#sanpham'>Sản phẩm</a>
                <a href='#aboutus'>Về chúng tôi</a>
                <a href='#lienlac'>Liên lạc</a>
                <a className={styles.special} href='#signme'>Sign me up</a>
            </div>
        </div>
    )
}
