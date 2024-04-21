import React from "react";

const Alert = (props) => {
  console.log("Alert was triggered");
  const capFirst = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    const upper = word.charAt(0).toUpperCase();
    const new_word = upper + lower.slice(1);
    return new_word;
  };
  return (
    <div style={{ height: "50px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capFirst(props.alert.type)}!</strong>: {props.alert.msg}.
        </div>
      )}
    </div>
  );
};

export default Alert;
