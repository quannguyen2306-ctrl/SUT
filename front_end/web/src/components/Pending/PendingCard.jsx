import styles from './styles.module.css'
import { useRef } from 'react'
import { calculateGap } from '../../middlewares/calculateGap'

export default function PendingCard({ item, handleClick }) {
    const containerRef = useRef()

    function courtPlaying() {
        const timeNow = new Date()
        const obj = {
            start: new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate(), timeNow.getHours(), 0),
            end: new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate(), timeNow.getHours(), 30)
        }

        return calculateGap(obj)
    }

    const courtNumber = courtPlaying()

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.firstArea}>
                <div className={styles.box}>
                    <h2>S1</h2>
                </div>
                <div>
                    <h3>{item.userName}</h3>
                    <p>{item.userPhone}</p>
                </div>
            </div>
            <div className={styles.secondArea}>
                <p>{`${Number(item.amountDue).toLocaleString()} đ`}</p>
            </div>
            <div className={styles.thirdArea}>
                <button className={styles.check} onClick={() => {
                    handleClick(item)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
