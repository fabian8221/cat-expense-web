import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ExpenseReset({ resetExpense }) {
  return (
    <div className="flex">
      <button
        className="mx-auto mt-3 text-white bg-red-600 py-2 px-8 rounded-sm"
        onClick={resetExpense}
      >
        <FontAwesomeIcon icon={faTrash} className="mr-2" />
        Delete All
      </button>
    </div>
  );
}

export default ExpenseReset;
