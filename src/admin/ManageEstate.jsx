import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, Eye, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEstates } from "../reducers/estateReducer";

import Swal from "sweetalert2";
import { useToast } from "../toastContext/useToast";

function ManageEstate() {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const { pagination, items, loading, count } = useSelector(
    (state) => state.estates
  );
  const [page, setPage] = useState(1);
  const [showImage, setShowImage] = useState(false);
  const [reload, setReload] = useState(false);

  const startIndex = (pagination?.currentPage - 1) * pagination?.limit + 1;
  const endIndex = Math.min(
    pagination?.currentPage * pagination?.limit,
    pagination?.totalResults
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllEstates({ page }));
  }, [dispatch, page, reload]);

  //   const handleDeleteEstate = async (e, id) => {
  //     e.preventDefault();
  //     e.stopPropagation();

  //     const confirmation = await Swal.fire({
  //       title: "Delete Estate",
  //       text: "Are you sure you want to delete this estate?",
  //       showDenyButton: false,
  //       showCancelButton: true,
  //       confirmButtonText: "Yes, Proceed",
  //       confirmButtonColor: "#228B22",
  //       cancelButtonColor: "#DC143C",
  //     });

  //     if (confirmation.isConfirmed) {
  //       try {
  //         const res = await dispatch(deleteEstate(id)).unwrap();

  //         const message = res.message;

  //         showToast(message, "success");
  //         setReload((prev) => !prev); // 👈 trigger reload
  //       } catch (err) {
  //         showToast(err?.message || "Something went wrong", "error");
  //       }
  //     }
  //   };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-green-950">
            Estates{" "}
            <span className="text-gray-400 text-base">({items?.length})</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            View all available estates.
          </p>
        </div>
      </div>

      {/* Container */}
      <div className="bg-white shadow rounded-xl overflow-hidden border border-gray-100">
        {/* Table header for md+ */}
        <div className="hidden md:grid grid-cols-12 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
          <div className="col-span-6">Estate Name</div>
          <div className="col-span-6">Number of Steps</div>
          {/* <div className="col-span-2 text-center">Action</div> */}
        </div>

        {/* Items: card style on mobile, table row on md+ */}
        {items?.map((p) => (
          <article
            key={p?._id}
            className="border-b border-gray-100 last:border-0"
            role="article"
          >
            {/* Mobile layout */}
            <div className="md:hidden flex gap-3 items-start p-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-md bg-green-50 text-green-700`}
                      >
                        {p?.estateName}
                      </span>
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {p?.steps.length} Steps
                      </h3>
                    </div>
                  </div>
                </div>

                {/* <div className="flex items-center justify-between mt-3 gap-3">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{p?.steps.length}</span>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Desktop/table row layout */}
            <div className="hidden md:grid grid-cols-12 items-center px-6 py-4 hover:bg-gray-50 transition">
              {/* Title (col-span-5) */}
              <div className="col-span-6 flex items-center gap-4">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {p?.estateName}
                  </h3>
                </div>
              </div>

              {/* Status */}
              <div className="col-span-6">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700`}
                >
                  {p?.steps.length}
                </span>
              </div>

              {/* Actions */}
              {/* <div className="col-span-2 flex justify-center gap-3">
                <button
                  aria-label={`View ${p?.name}`}
                  onClick={() => setShowImage(true)}
                  className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg text-xs mt-2"
                >
                  <Eye size={14} />
                </button>
                <button
                  aria-label="Delete"
                  onClick={(e) => handleDeleteEstate(e, p?._id)}
                  className="p-2 rounded-full bg-gray-50 hover:bg-red-50 text-red-700 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div> */}
            </div>
          </article>
        ))}
      </div>

      {/* Pagination + summary */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5">
        <p className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-800">{startIndex}</span> -
          <span className="font-semibold text-gray-800"> {endIndex}</span> of{" "}
          <span className="font-semibold text-gray-800">
            {pagination?.totalResults}
          </span>
        </p>

        {pagination?.totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => setPage((p) => p - 1)}
              disabled={!pagination.hasPrevPage}
            >
              Prev
            </button>
            <span className="text-sm font-medium">
              Page {pagination?.currentPage} of {pagination?.totalPages}
            </span>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => setPage((p) => p + 1)}
              disabled={!pagination.hasNextPage}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/admin/create-estate")}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-md transition"
        >
          <Plus size={18} />
          Create Estate
        </button>
      </div>
    </section>
  );
}

export default ManageEstate;
