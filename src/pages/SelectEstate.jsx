import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEstate, fetchEstateUser } from "../reducers/estateReducer";
import { useNavigate } from "react-router-dom";
import { useToast } from "../toastContext/useToast";

const SelectEstate = () => {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, items, error } = useSelector((state) => state.estates);

  const [estateId, setEstateId] = useState("");

  // Fetch estates on mount
  useEffect(() => {
    dispatch(fetchEstateUser());
  }, [dispatch]);

  // Handle estate selection
  const handleSelectEstate = async (e) => {
    e.preventDefault();

    if (!estateId) {
      showToast("Please select an estate", "error");
      return;
    }

    // ⬅️ Get full estate object based on estateId
    const selectedEstate = items.find((e) => e._id === estateId);

    try {
      await dispatch(selectEstate(estateId)).unwrap();

      // ⬅️ Use estateName in toast
      showToast(
        `You are diving into ${selectedEstate?.estateName} Platform`,
        "success"
      );

      setTimeout(() => {
        navigate("/get-started");
      }, 1000);
    } catch (err) {
      showToast(err?.message, "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-24">
      <form
        onSubmit={handleSelectEstate}
        className="bg-white shadow-xl rounded-3xl p-16 max-w-2xl mx-auto space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Get Started
        </h2>
        <p className="text-gray-500 text-center">
          Select your Preferred Estate
        </p>

        {/* Estate Dropdown */}
        <div className="relative">
          <select
            value={estateId}
            onChange={(e) => setEstateId(e.target.value)}
            required
            className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
          >
            <option value="">-- Select Estate --</option>

            {items?.length > 0 &&
              items.map((estate) => (
                <option key={estate._id} value={estate._id}>
                  {estate.estateName}
                </option>
              ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-gray-600 to-gray-300 hover:from-gray-500 hover:to-gray-300"
          }`}
        >
          {loading ? "Loading..." : "Select Estate"}
        </button>
      </form>

      {error && (
        <p className="text-red-500 mt-3 text-sm text-center">{error}</p>
      )}
    </div>
  );
};

export default SelectEstate;
