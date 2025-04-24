import React, { useEffect, useRef } from "react";
import { useState } from "react";

function ExpenseDialog({ handleExpenseSubmit, setShowDialog, formData, setFormData }) {
  const [errors, setErrors] = useState({
    item: "",
    category: "",
    amount: "",
  });
  const [fact, setFact] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const hasFetched = useRef(false);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { item, category, amount } = formData;

    if (!item) {
      setErrors({ ...errors, item: "This field is required." });
      return;
    }

    if (!category) {
      setErrors({ ...errors, category: "This field is required." });
      return;
    }

    if (item.trim().length <= 3) {
      setErrors({ ...errors, item: "Item name must be more than 3 characters." });
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setErrors({ ...errors, amount: "Amount must be a number greater than 0." });
      return;
    }

    handleExpenseSubmit(formData);
    setFormData({ item: "", category: "", amount: "" });
    setShowDialog(false);
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    setIsLoading(true);
    fetch("https://catfact.ninja/fact")
      .then((response) => response.json())
      .then((data) => setFact(data.fact))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/4 p-4 sm:p-6 rounded shadow-lg relative">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer text-2xl sm:text-3xl lg:text-4xl"
            onClick={() => setShowDialog(false)}
          >
            &times;
          </button>
          <h2 className="text-center text-primary font-semibold text-base italic sm:text-lg pt-6 mb-4">
            {isLoading ? "Loading..." : fact}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 w-full items-center justify-between">
              <div className="flex flex-col gap-1 w-full">
                <input
                  value={formData.item}
                  onChange={handleOnChange}
                  type="text"
                  placeholder="Item"
                  name="item"
                  className="flex-grow p-2 border-2 w-full border-primary rounded rounded-br-none rounded-tr-none outline-none bg-secondary placeholder:text-gray-500"
                />
                {errors.item && <span className="text-xs italic text-left mt-0 text-red-500">{errors.item}</span>}
              </div>
              <div className="flex flex-col gap-1 w-full">
                <select
                  value={formData.category}
                  onChange={handleOnChange}
                  name="category"
                  className="flex-grow p-2 border-2 w-full border-primary rounded rounded-br-none rounded-tr-none outline-none bg-secondary placeholder:text-gray-500"
                >
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Accessory">Accessory</option>
                </select>
                {errors.category && <span className="text-xs italic text-left mt-0 text-red-500">{errors.category}</span>}
              </div>
              <div className="flex flex-col gap-1 w-full">
                <input
                  value={formData.amount}
                  onChange={handleOnChange}
                  type="text"
                  placeholder="Amount"
                  name="amount"
                  className="flex-grow p-2 border-2 w-full border-primary rounded rounded-br-none rounded-tr-none outline-none bg-secondary placeholder:text-gray-500"
                />
                {errors.amount && <span className="text-xs italic text-left mt-0 text-red-500">{errors.amount}</span>}
              </div>
              <button
                type="submit"
                className="bg-primary px-3 lg:px-4 py-2 text-white rounded-br rounded-sm w-2/3"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ExpenseDialog;
