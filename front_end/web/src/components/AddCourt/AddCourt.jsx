import React, { useState } from "react";
import styles from "./styles.module.css";

const courtData = {
  singleCourt: {
    _id: "658ea3cf9a092c8da06dfae5",
    _courtId: "429cc781-0993-46da-9b26-0e98bee89b5c",
    courtName: "san cau long nguyen van nghi",
    categories: ["cau long", "bong ro"],
    address: "208, Nguyen Huu Canh, P3, Go Vap",
    description: "Day la mot san cau long rat dang cap",
    utility: ["Free wifi", "Free tra da"],
    location: {
      latitude: "0.2391049",
      longitude: "0.28329232",
    },
    pricePerHour: 300000,
    variableCost: 0,
    workingHours: {
      start: new Date(2023, 2, 2, 6, 0),
      end: "2023-03-02T13:00:00.000Z",
    },
    rating: {
      totalRating: 1,
      sumRating: 3,
    },
    image: [
      "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTV8fHxlbnwwfHx8fHw%3D",
      "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTV8fHxlbnwwfHx8fHw%3D",
    ],
  },
};

function AddCourt() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className={styles.single_court}>
        <h2>{courtData.singleCourt.courtName}</h2>
        <img
          src={courtData.singleCourt.image[0]}
          alt={courtData.singleCourt.image[0]}
        />
        <button className={styles.details} onClick={() => setIsModalOpen(true)}>More info</button>
      </div>
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.more_info}>
            <button className={styles.close_btn} onClick={() => setIsModalOpen(false)}>X</button>
            <p>{courtData.singleCourt.address}</p>
            <p>{courtData.singleCourt.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCourt;
