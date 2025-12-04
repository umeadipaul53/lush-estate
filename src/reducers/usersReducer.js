import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// ✅ fetch All users for admin
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await API.get("/admin/v1/fetch-all-users", {
        withCredentials: true,
        params: {
          page,
        },
      });
      const { pagination, data, count } = response.data;
      return { pagination, data, count }; // array of estates objects
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Estates";

      return rejectWithValue(message);
    }
  }
);

//--- DELETE USER ---
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        `/admin/v1/delete-user/${id}`,
        {},
        { withCredentials: true }
      );

      const { message, data } = response.data;
      return { message, data }; // { action: "added" | "removed", data: {...} }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

//--- CHANGE ADMIN PASSWORD ---
export const changeAdminPassword = createAsyncThunk(
  "users/changeAdminPassword",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.patch("/admin/v1/change-password", formData, {
        withCredentials: true,
      });

      const { message } = response.data;
      return { message }; //
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to change admin password"
      );
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [], // array of property objects
    loading: false,
    numberOfUsers: 0,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalResults: 0,
      limit: 10,
      hasNextPage: false,
      hasPrevPage: false,
    },
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- FETCH ALL USERS---
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.numberOfUsers = action.payload.count;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- DELETE USER---
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- CHANGE ADMIN PASSWORD ---
      .addCase(changeAdminPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeAdminPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(changeAdminPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
