import styles from "./availability.module.css"
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";


import { courtData } from "../../fixtures/fixtures";
import { calculateGap } from "../../middlewares/calculateGap";
import reverseGap from '../../middlewares/reverseGap'
import calculateTops from "../../middlewares/calculateTops";
import getNextDay from "../../middlewares/getNextDay";


import useWindowDimensions from '../../hooks/useWindowDimensions'


const workingHours = calculateGap(courtData.singleCourt.workingHours)

const reversedWorkingHours = workingHours.map((gap) => reverseGap(gap))


const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const today = new Date()
const days = getNextDay()


export default function AvailabilityCalendar() {
    const { width } = useWindowDimensions();
    const [data, setData] = useState([])

    const dataArray = data.length > 0 ? data.map((item) => calculateTops(item.availability, workingHours[0], courtData.singleCourt.workingHours)) : []


    //-----SSE Availability-----
    const params = {
        _courtId: "b22f1d7b-e7e2-4f51-aa03-5096005b4850",
        day: parseInt(today.getDate()),
        month: parseInt(today.getMonth() + 1),
        year: parseInt(today.getFullYear())
    }
    useEffect(() => {
        const url = `https://api-d2ogvmxflq-as.a.run.app/api/v1/rest/availability/?_courtId=${params._courtId}&day=${params.day}&month=${params.month}&year=${params.year}`

        const source = new EventSource(url)

        source.addEventListener("open", () => {
            console.log("SSE opened!");
        })
        source.addEventListener("message", (e) => {
            // console.log("Event", e.data);
            const res = JSON.parse(e.data);
            console.log(res);
            const a = res[0]
            const b = new Date(a.date)
            console.log("a", a)
            console.log("b", b.toLocaleString())
            setData(res);
        })
        source.addEventListener("error", (e) => {
            console.log(e)
        })


        return () => {
            source.close()
        }
    }, [])


    if (width > 650) {
        return (
            <div>
                <Navbar />
                <div className={styles.container}>
                    <div className={styles.vertical}>
                        <div className={styles.verticalContainer}>
                            <p>Tháng {today.getMonth() + 1}</p>
                            {
                                days.map((day, index) => (
                                    <div key={index} className={styles.displayDate}>
                                        <p>{daysOfWeek[day.getDay()]}</p>
                                        <div className={styles.circle} style={day.getDate() === today.getDate() ? { backgroundColor: "#FF4F6D" } : null}>
                                            <h3 style={day.getDate() === today.getDate() ? { color: "white" } : null}>{day.getDate()}</h3>
                                            <p style={day.getDate() === today.getDate() ? { color: "white" } : null}>{`/${day.getMonth() + 1}`}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>


                    <div className={styles.gapContainer}>
                        <p style={{ opacity: 0 }}>Tháng {today.getMonth() + 1}</p>


                        {
                            dataArray.map((item, index) => (
                                <div key={index} className={styles.displayGap}>
                                    {
                                        item.map((top, index) => (
                                            <div key={index} className={styles.gap} style={{ top: top }}></div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>






                    <div className={styles.horizontal}>
                        {
                            reversedWorkingHours.map((time, index) => (
                                <div key={index} className={styles.hoursContainer}>
                                    {time.startMinute === 0 ?
                                        <>
                                            <div className={styles.textContainer}>
                                                <p>
                                                    {
                                                        `${time.startHour}:${String(time.startMinute).padStart(2, "0")}`
                                                    }
                                                </p>
                                            </div>
                                            <div className={styles.line}></div>
                                        </>
                                        : null
                                    }
                                </div>
                            ))
                        }
                    </div>








                </div>
            </div>
        )
    } else {
        return (
            <h1>Please rotate your phone</h1>
        )
    }
}



