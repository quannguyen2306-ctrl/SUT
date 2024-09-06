import { useState } from 'react'
import styles from './SignMe.module.css'
import './blob.css'
import ReactLoading from 'react-loading';

export default function SignMe() {
    const [input, setInput] = useState('')
    const [input2, setInput2] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit() {
        const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (input.length > 0 && input2.length > 0 && input.length < 200 && input2.length < 200) {
            if (input2.match(isValidEmail)) {
                setLoading(true)
                try {
                    await fetch(`https://website-d2ogvmxflq-as.a.run.app/website/api/signMeUp?name=${input.trim()}&email=${input2.trim()}`, {
                        mode: 'no-cors'
                    })

                } catch (err) {
                    console.log(err)
                } finally {
                    setInput('')
                    setInput2('')
                    setLoading(false)
                    alert("Bạn đã đăng ký thành công! Kiểm tra email của bạn nhé!")
                }
            } else {
                alert('Bạn có thể nhập lại email được không?')
            }
        } else {
            alert('Xin hãy nhập cả hai ô')
        }
    }

    return (
        <div className={styles.section2} id='signme'>
            <div className={styles.center}>
                <h1 style={{ fontSize: 25, fontWeight: 600 }}>Trở thành những người đồng hành đầu tiên</h1>
                <br />
                <p>Tên bạn là gì?</p>
                <input value={input} onChange={e => setInput(e.target.value)} type="text" className={styles.signme} placeholder='Tên của bạn' />
                <br />
                <p>Địa chỉ email của bạn là gì?</p>
                <input value={input2} onChange={e => setInput2(e.target.value)} type="email" className={styles.signme} placeholder='Ví dụ: sut.app.contact@gmail.com' />
                <button onClick={handleSubmit}>
                    {loading === true ?
                        <ReactLoading type={"balls"} color={"#EB6666"} height={28} width={28} /> : 'Gửi'
                    }
                </button>


                <div className="red blob"></div>
                <div className="green blob"></div>
            </div>
        </div>
    )
}
