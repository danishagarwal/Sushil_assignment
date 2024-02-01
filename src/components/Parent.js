import React, { useState } from "react";
import Child from "./Child";

const Parent = () => {
  const [parent, setParent] = useState("Hello Danish");

  const handleDatafromChild = (newData) => {
    setParent(newData);
  };

  return (
    <div>
      <h3>Parent Data - {parent}</h3>
      <Child datafromParent={parent} onChangeData={handleDatafromChild} />
    </div>
  );
};

export default Parent;
