import React, { useState, useEffect } from "react";
import ExpenseDialog from "./ExpenseDialog";
import { v4 as uuidv4 } from "uuid";
import ExpenseRow from "./ExpenseRow";
import { Howl } from "howler";
import soundFile from "./success.mp3";

function CatExpenseWrapper() {
  const [expenses, setExpenses] = useState([]);
  const [isSoundOn] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    id: uuidv4(),
    item: "",
    category: "Food",
    amount: "",
  });

  useEffect(() => {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  }, [expenses]);

  const handleExpenseSubmit = (expense) => {
    const existingExpense = expenses.find((exp) => exp.id === expense.id);
    if (existingExpense) {
      setExpenses(expenses.map((exp) => exp.id === expense.id ? { ...exp, ...expense } : exp));
      console.log("Updated expense", expense);
    } else {
      setExpenses([...expenses, { id: uuidv4(), ...expense, completed: false }]);
      console.log("New expense", expense);
    }
  };

  const handleDelete = (id) => {
    setExpenses(
      expenses.filter((expense) => {
        return expense.id !== id;
      })
    );
  };

  const handleEdit = (id) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    console.log(expenseToEdit);
    setShowDialog(true);
    setFormData(expenseToEdit);
  };

  const playSound = () => {
    const sound = new Howl({
      src: [soundFile],
    });
    sound.play();
  };

  const toggleSelectAll = () => {
    const allSelected = expenses.every(expense => expense.selected);
    const updatedExpenses = expenses.map(expense => ({ ...expense, selected: !allSelected }));
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const toggleSelect = (id) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === id ? { ...expense, selected: !expense.selected } : expense
    );
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

    if (!isSoundOn && expenses.find((expense) => expense.id === id && !expense.selected)) {
      playSound();
    }
  };

  const handleItemsDelete = () => {
    const updatedExpenses = expenses.filter((expense) => !expense.selected);
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const incompleteExpenses = expenses.filter((expense) => !expense.completed);
  const completedExpenses = expenses.filter((expense) => expense.completed);

  const allExpenses = [...incompleteExpenses, ...completedExpenses];

  return (
    <>
      <div className="container my-0 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-0 mx-auto bg-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 relative top-28 rounded shadow-lg pb-8">
          <h2 className="text-primary text-center font-semibold text-xl sm:text-2xl pt-6 ">
            Cat Expense Web
          </h2>
          <h3 className="text-center text-gray-700 pb-5 font-medium text-base sm:text-lg">
            Home Assignment for EarnIn company
          </h3>
          <div className="flex w-full px-8 justify-between items-center mb-8">
            <div>
              <button
                className="bg-green-600 px-3 lg:px-4 py-2 text-white rounded-br rounded-sm"
                onClick={toggleSelectAll}
              >
                Select All
              </button>
            </div>
            <div className="flex gap-1">
              <button
                className="bg-red-600 px-3 lg:px-4 py-2 text-white rounded-br rounded-sm"
                onClick={handleItemsDelete}
              >
                Delete Expense
              </button>
              <button
                className="bg-primary px-3 lg:px-4 py-2 text-white rounded-br rounded-sm"
                onClick={() => setShowDialog(true)}
              >
                Add Expense
              </button>
            </div>
          </div>
          {showDialog && (
            <ExpenseDialog
              handleExpenseSubmit={handleExpenseSubmit}
              setShowDialog={setShowDialog}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {allExpenses.length > 0 ? allExpenses.map((expense, index) => (
            <ExpenseRow
              expense={expense}
              key={index}
              toggleSelect={toggleSelect}
              handleEdit={handleEdit}
            />
          )) : (
            <div className="text-center text-gray-700 pb-5 font-medium text-base sm:text-lg">
              No expenses yet
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CatExpenseWrapper;
