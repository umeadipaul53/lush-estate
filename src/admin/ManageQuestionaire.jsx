import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEstates } from "../reducers/estateReducer";
import { fetchQuestionsAdmin } from "../reducers/questionaireReducer";

function ManageQuestionaire() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pagination, items } = useSelector((state) => state.estates);
  const { counts } = useSelector((state) => state.questionaire); // [{ estateId, estateName, totalQuestions }]

  const [page, setPage] = useState(1);

  const startIndex = (pagination?.currentPage - 1) * pagination?.limit + 1;
  const endIndex = Math.min(
    pagination?.currentPage * pagination?.limit,
    pagination?.totalResults
  );

  // Fetch estates + question counts whenever page changes
  useEffect(() => {
    dispatch(fetchAllEstates({ page }));
    dispatch(fetchQuestionsAdmin());
  }, [dispatch, page]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
        <div>
          <h2 className="text-3xl font-bold text-green-950">
            Estates{" "}
            <span className="text-gray-400 text-base">({items?.length})</span>
          </h2>
          <p className="text-gray-500 text-sm">
            View estates with number of questions
          </p>
        </div>
      </div>

      {/* Estates Table/Card */}
      <div className="bg-white shadow rounded-xl overflow-hidden border border-gray-100">
        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-12 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
          <div className="col-span-6">Estate Name</div>
          <div className="col-span-4 text-center">No of Questions</div>
          <div className="col-span-2 text-center">Action</div>
        </div>

        {items?.map((estate) => {
          const questionCount =
            counts?.find((c) => c.estateId === estate._id)?.totalQuestions ?? 0;

          return (
            <article
              key={estate._id}
              className="border-b border-gray-100 last:border-none"
            >
              {/* Mobile Layout */}
              <div className="md:hidden flex flex-col gap-2 p-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">
                    {estate.estateName}
                  </span>
                  <span className="text-sm font-bold text-green-700">
                    {questionCount} Qs
                  </span>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      navigate(`/admin/add-questionaire/${estate._id}`)
                    }
                    className="flex items-center gap-1 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg text-xs text-green-700"
                  >
                    <Plus size={14} /> Add New Question
                  </button>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid grid-cols-12 items-center px-6 py-4">
                <div className="col-span-6 font-semibold text-gray-800">
                  {estate.estateName}
                </div>
                <div className="col-span-4 text-center">
                  <span className="text-sm font-bold text-green-700">
                    {questionCount}
                  </span>
                </div>
                <div className="col-span-2 flex justify-center">
                  <button
                    onClick={() =>
                      navigate(`/admin/add-questionaire/${estate._id}`)
                    }
                    className="flex items-center gap-1 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg text-xs text-green-700"
                  >
                    <Plus size={14} /> Add New Question
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
        <p className="text-sm text-gray-600">
          Showing {startIndex} - {endIndex} of {pagination?.totalResults}
        </p>

        {pagination?.totalPages > 1 && (
          <div className="flex items-center gap-3">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => setPage((p) => p - 1)}
              disabled={!pagination?.hasPrevPage}
            >
              Prev
            </button>
            <span className="text-sm font-medium">
              Page {pagination?.currentPage} of {pagination?.totalPages}
            </span>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => setPage((p) => p + 1)}
              disabled={!pagination?.hasNextPage}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ManageQuestionaire;
