import { User, Lock, Bell, Palette, Save, Mail } from "lucide-react";
import { useState } from "react";
import { changeAdminPassword } from "../reducers/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useToast } from "../toastContext/useToast";

export default function Settings() {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.users);
  const [activeTab, setActiveTab] = useState("security");
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmation = await Swal.fire({
      title: "Change Password",
      text: "Are you sure you want to change password?",
      icon: "question", // 💡 adds a nice confirmation icon
      showCancelButton: true,
      confirmButtonText: "Yes, Proceed",
      confirmButtonColor: "#228B22",
      cancelButtonColor: "#DC143C",
    });

    if (!confirmation.isConfirmed) return; // 🚫 stop early if cancelled

    try {
      const res = await dispatch(changeAdminPassword(formData)).unwrap();
      showToast(res?.message || "Password changed successfully!", "success");
      setFormData({
        oldPassword: "",
        newPassword: "",
      });
    } catch (err) {
      showToast(
        err?.message || "Something went wrong changing password",
        "error"
      );
    }
  };

  const tabs = [
    { id: "security", icon: <Lock size={18} />, label: "Security" },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Admin Settings</h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        {activeTab === "security" && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-2">Change Password</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">
                  Current Password
                </label>
                <input
                  name="oldPassword"
                  type="password"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">New Password</label>
                <input
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={(e) => handleSave(e)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <Save size={18} />
            {loading ? "Changing Password..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
