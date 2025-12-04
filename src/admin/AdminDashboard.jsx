import { Users, Building2, ClipboardList, BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect } from "react";
import StatCard from "./StatCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEstates } from "../reducers/estateReducer";
import { fetchAllUsers } from "../reducers/usersReducer";
import { getAllTourRequests } from "../reducers/tourReducer";

function AdminDashboard() {
  const dispatch = useDispatch();

  const { count } = useSelector((state) => state.estates);
  const { numberOfUsers } = useSelector((state) => state.users);
  const { tourNumber, allTours, pagination } = useSelector(
    (state) => state.tour
  );

  // =================== FETCH STATS ONCE ===================
  useEffect(() => {
    dispatch(fetchAllUsers({ page: 1 }));
    dispatch(fetchAllEstates({ page: 1 }));
    dispatch(getAllTourRequests({ status: "pending", page: 1 }));
  }, [dispatch]);

  // =================== PAGE CHANGE ===================
  const nextPage = () => {
    if (pagination?.hasNextPage) {
      dispatch(
        getAllTourRequests({
          status: "pending",
          page: pagination.currentPage + 1,
        })
      );
    }
  };

  const prevPage = () => {
    if (pagination?.hasPrevPage) {
      dispatch(
        getAllTourRequests({
          status: "pending",
          page: pagination.currentPage - 1,
        })
      );
    }
  };

  const chartData = [
    { name: "Jan", sales: 80 },
    { name: "Feb", sales: 35 },
    { name: "Mar", sales: 50 },
    { name: "Apr", sales: 70 },
    { name: "May", sales: 45 },
    { name: "Jun", sales: 60 },
  ];

  return (
    <div className="p-4 md:p-6 space-y-8 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Stats */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Users}
          title="Total Users"
          value={numberOfUsers}
          color="border-green-500"
        />
        <StatCard
          icon={Building2}
          title="Estates Created"
          value={count}
          color="border-blue-500"
        />
        <StatCard
          icon={ClipboardList}
          title="Pending Tour Requests"
          value={tourNumber}
          color="border-yellow-500"
        />
      </section>

      {/* Chart */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6 xl:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="text-green-700" size={20} />
            <h3 className="text-lg font-semibold text-green-900">
              Monthly Property Sales
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#166534" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Tours List */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-4">
          Pending Tour Requests
        </h3>

        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="p-3 text-left">S/N</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Time & Date</th>
              </tr>
            </thead>
            <tbody>
              {allTours?.map((order, i) => (
                <tr key={order._id} className="border-b hover:bg-green-50">
                  <td className="p-3 text-sm">
                    {(pagination.currentPage - 1) * pagination.limit + (i + 1)}
                  </td>
                  <td className="p-3">{order.name}</td>
                  <td className="p-3">{order.email}</td>
                  <td className="p-3">{order.phone}</td>
                  <td className="p-3">
                    {order.time} | {order.date.split("T")[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">
            Page {pagination?.currentPage} of {pagination?.totalPages}
          </p>

          <div className="flex gap-3">
            <button
              onClick={prevPage}
              disabled={!pagination?.hasPrevPage}
              className="btn"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={!pagination?.hasNextPage}
              className="btn"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
