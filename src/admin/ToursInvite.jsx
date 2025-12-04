import { useState, useEffect } from "react";
import { Edit, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTourRequests, settleTourRequest } from "../reducers/tourReducer";
import { useToast } from "../toastContext/useToast";
import Swal from "sweetalert2";

export default function ToursInvite() {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const { allTours, pagination } = useSelector((state) => state.tour);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    dispatch(getAllTourRequests({ status: "pending", page }));
  }, [dispatch, page, reload]);

  const handleSettleRequest = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmation = await Swal.fire({
      title: "Settle Tour Request",
      text: "Note: Tours request can only be settled when tour has been carried out. Are you sure you want to settle this tour request?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Yes, Proceed",
      confirmButtonColor: "#228B22",
      cancelButtonColor: "#DC143C",
    });

    if (confirmation.isConfirmed) {
      try {
        const res = await dispatch(settleTourRequest(id)).unwrap();

        const message = res.message;

        showToast(message, "success");
        setReload((prev) => !prev); // 👈 trigger reload
      } catch (err) {
        showToast(err?.message || "Something went wrong", "error");
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold flex items-center gap-2 text-gray-800">
            <MapPin className="text-blue-600" /> Manage Tours Invite
          </h1>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-3 text-left">S/N</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone Number</th>
                <th className="p-3 text-left">Time & Date (Scheduled)</th>
                <th className="px-6 py-3 text-center whitespace-nowrap">
                  Approve
                </th>
              </tr>
            </thead>
            <tbody>
              {allTours.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No Tours invite found.
                  </td>
                </tr>
              ) : (
                allTours.map((request, i) => (
                  <tr
                    key={i}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 text-sm text-gray-700">
                      {(pagination.currentPage - 1) * pagination.limit +
                        (i + 1)}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {request.name}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {request.email}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {request.phone}
                    </td>

                    <td className="p-3 text-sm">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100">
                        <span className="text-red-600">{request.time}</span>{" "}
                        <span className="text-green-700">
                          {request.date.split("T")[0]}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-3 flex justify-center gap-2">
                      <button
                        className="p-1.5 hover:bg-yellow-100 text-yellow-600 rounded-md"
                        title="Settle Request"
                        onClick={(e) => handleSettleRequest(e, request._id)}
                      >
                        <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center px-6 py-3 border-t text-sm text-gray-500">
            <p>
              Page {pagination?.currentPage} of {pagination?.totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                className="p-1.5 border rounded-md hover:bg-gray-100"
                onClick={() => setPage((p) => p - 1)}
                disabled={!pagination?.hasPrevPage}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                className="p-1.5 border rounded-md hover:bg-gray-100"
                onClick={() => setPage((p) => p + 1)}
                disabled={!pagination?.hasNextPage}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Mobile & Tablet Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
          {allTours.length === 0 ? (
            <p className="text-center text-gray-500 py-6 col-span-full">
              No Tour request found.
            </p>
          ) : (
            allTours.map((request, i) => (
              <div
                key={i}
                className="bg-white p-3 rounded-lg shadow border flex flex-col justify-between h-auto"
              >
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-700">
                      {request.name}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100">
                      <span className="text-red-600">{request.time}</span>{" "}
                      <span className="text-green-700">
                        {request.date.split("T")[0]}
                      </span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Email:</span>{" "}
                    {request.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Phone Number:</span>{" "}
                    {request.phone}
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    className="p-1 hover:bg-yellow-100 text-yellow-600 rounded-md"
                    title="Settle Request"
                    onClick={(e) => handleSettleRequest(e, request._id)}
                  >
                    <Edit size={14} />
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Pagination for Mobile */}
          <div className="flex justify-between items-center px-2 py-3 text-xs text-gray-500 col-span-full">
            <p>
              Page {pagination?.currentPage} of {pagination?.totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                className="p-1 border rounded-md hover:bg-gray-100"
                onClick={() => setPage((p) => p - 1)}
                disabled={!pagination?.hasPrevPage}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                className="p-1 border rounded-md hover:bg-gray-100"
                onClick={() => setPage((p) => p + 1)}
                disabled={!pagination?.hasNextPage}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
