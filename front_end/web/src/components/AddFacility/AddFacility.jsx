import React, { useState } from "react";
import styles from "./styles.module.css";

function AddFacility() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState("");

  const addService = () => {
    if (newService.trim() !== "") {
      setServices([...services, newService]);
      setNewService("");
    }
  };

  function removeService(index) {
    const updateService = services.filter(
      (service, serviceIndex) => serviceIndex !== index
    );
    setServices(updateService);
  }

  return (
    <div className="section">
      <input
        type="text"
        placeholder="add facility"
        value={newService}
        onChange={(e) => setNewService(e.target.value)}
        
      />
      <button onClick={addService} style={{ cursor: "pointer" }}>
        Add
      </button>

      <ul>
        {services.map((service, index) => (
          <li key={index}>
            {service}
            <button
              onClick={() => removeService(index)}
              style={{
                marginLeft: 3,
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddFacility;
