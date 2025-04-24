import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

function ExpenseRow({ expense, toggleSelect, handleEdit }) {
  return (
    <div>
      <div
        className={`flex ${expense.selected ? "bg-light" : "bg-primary"
          } mx-8 p-2 rounded-sm mb-2 text-white justify-between items-center`}
      >
        <div className="flex items-center">
          <div
            className="flex gap-2 items-center"
            onClick={() => toggleSelect(expense.id)}
          >
            <FontAwesomeIcon
              icon={expense.selected ? faCircleCheck : faCircle}
              className={`cursor-pointer border-2 border-white rounded-full ${expense.selected
                ? "text-white border-secondary"
                : "text-primary border-white"
                } hover:bg-white hover:text-primary hover:rounded-full mt-1`}

            />
            <p className="text-white">
              {expense.item}
            </p>
            <p className="text-gray-300 italic">
              {expense.category}
            </p>
            <p className="text-sm bg-green-600 px-2 rounded-sm">
              ${expense.amount}
            </p>
          </div>
        </div>
        <div>
          <ul className="flex">
            <li className="px-2">
              <FontAwesomeIcon
                icon={faEdit}
                className="cursor-pointer"
                onClick={() => handleEdit(expense.id)}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ExpenseRow;
