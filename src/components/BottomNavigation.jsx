import React, { useState } from "react";
import { BsBarChart } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { GoHomeFill } from "react-icons/go";
import { PiUserLight, PiWalletLight } from "react-icons/pi";

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: "",
    category: "",
  });
  const [errors, setErrors] = useState({});
//tab change (only colour)
  const handleTabClick = (tab) => {
    if (tab === "add") {
      setShowForm(!showForm);
    } else {
      setActiveTab(tab);
      setShowForm(false);
    }
  };
//form validation
  const validate = () => {
    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.amount) newErrors.amount = "Amount is required";
    else if (Number(formData.amount) <= 0)
      newErrors.amount = "Amount must be greater than 0";
    if (!formData.date) newErrors.date = "Date is required";
    else if (formData.date > today)
      newErrors.date = "Date cannot be in the future";
    if (!formData.category.trim()) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("New Expense:", formData);
      setFormData({ name: "", amount: "", date: "", category: "" });
      setShowForm(false);
    }
  };

  const iconColor = (tab) =>
    tab === activeTab ? "text-teal-600" : "text-gray-400";

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg h-16 flex items-center justify-around px-4 border-t-white">
        <button
          onClick={() => handleTabClick("home")}
          className={`flex items-center ${iconColor("home")}`}
        >
          <GoHomeFill size={30} />
        </button>

        <button
          onClick={() => handleTabClick("chart")}
          className={`flex items-center ${iconColor("chart")}`}
        >
          <BsBarChart size={30} />
        </button>

        <div className="relative -top-8 bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
          <button
            className="text-white text-3xl"
            onClick={() => handleTabClick("add")}
          >
            <CiCirclePlus size={80} />
          </button>
        </div>

        <button
          onClick={() => handleTabClick("wallet")}
          className={`${iconColor("wallet")}`}
        >
          <PiWalletLight size={36} />
        </button>

        <button
          onClick={() => handleTabClick("profile")}
          className={`${iconColor("profile")}`}
        >
          <PiUserLight size={36} />
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md space-y-4"
          >
            <h2 className="text-xl font-semibold">Add Expense</h2>

            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full border px-3 py-2 rounded"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                className="w-full border px-3 py-2 rounded"
                value={formData.amount}
                onChange={handleChange}
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </div>

            <div>
              <input
                type="date"
                name="date"
                className="w-full border px-3 py-2 rounded"
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="category"
                placeholder="Category"
                className="w-full border px-3 py-2 rounded"
                value={formData.category}
                onChange={handleChange}
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setErrors({});
                  setActiveTab("home");
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default BottomNavigation;
