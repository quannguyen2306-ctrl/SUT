import { memo } from "react";
import styles from "./navbar.module.css";
import logo from '../../assets/sut_logo.png';
import { Link } from "react-router-dom";


function Navbar() {
    return (
        <div className={styles.navbar}>
            <img className={styles.sut_logo} style={{ height: 100, width: 100, marginBottom: 30 }} src={logo} alt="sut_logo" />
            <Link to="/"
                style={window.location.pathname === '/' ? { backgroundColor: 'white', color: 'red' } : null}
            >
                Trang chủ
            </Link>
            <Link
                to="/booking"
                style={window.location.pathname === '/booking' ? { backgroundColor: 'white', color: 'red' } : null}
            >
                Đơn đặt
            </Link>
            <Link
                to="/calendar"
                style={window.location.pathname === '/calendar' ? { backgroundColor: 'white', color: 'red' } : null}
            >
                Lịch sân
            </Link>
            <Link
                to="/chat"
                style={window.location.pathname === '/chat' ? { backgroundColor: 'white', color: 'red' } : null}
            >
                Trao đổi
            </Link>

            <Link
                to="/court"
                style={window.location.pathname === '/court' ? { backgroundColor: 'white', color: 'red' } : null}
            >
                Sân của bạn
            </Link>
            {/* <Link
                to="/settings"
                style={window.location.pathname === '/settings' ? { backgroundColor: 'white', color: 'red' } : null}
            >
                Cài đặt
            </Link> */}
        </div>
    );
}

//   {/* <div
//        to="/analytics">
//        Analytics</div> */}
//             {/* <div
//        to="/services">
//        Sut's services</div> */}
export default memo(Navbar);
