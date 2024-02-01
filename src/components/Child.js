import React from "react";

const Child = ({ datafromParent, onChangeData }) => {
  const handleClick = () => {
    let newData = "Hello Bobby";
    onChangeData(newData);
  };

  return (
    <>
      <div>
        <p>
          Displaying data which is passed from Parent to child -{" "}
          {datafromParent}
        </p>
        <button onClick={handleClick}>Change Data</button>
      </div>
    </>
  );
};

export default Child;
