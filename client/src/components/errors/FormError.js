import React from "react";

const FormError = ({ errors, campo }) => {
  return (
    <div>
      {errors.length > 0 && (
        <ul className="error-list">
          {errors
            .filter((error) => error.param === campo)
            .map((error, key) => {
              return (
                <li key={key} className="error-msg">
                  {error.msg}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default FormError;
