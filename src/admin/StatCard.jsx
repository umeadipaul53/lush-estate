import React from "react";

export default function StatCard({ icon: Icon, title, value, color }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-5 flex items-center justify-between border-l-4 ${color}`}
    >
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800 mt-1">{value}</h2>
      </div>
      <div className="p-3 bg-gray-100 rounded-xl">
        <Icon className="text-gray-700" size={26} />
      </div>
    </div>
  );
}
