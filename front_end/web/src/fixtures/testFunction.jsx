import React, { useState } from "react";

function testFunction() {
  const [params, setParams] = useState({ start: 0, end: 5 });

  const updateParams = () => {
    setParams((prevParams) => ({
      start: prevParams.start + 5,
      end: prevParams.end + 5,
    }));
  };

  return <div>
    <p>{params.start}</p>
    <p>{params.end}</p>
    <button onClick={updateParams} >Add</button>
  </div>;
}

export default testFunction;
