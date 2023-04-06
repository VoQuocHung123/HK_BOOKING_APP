import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.post("http://localhost:3001/api/auth/login", user);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const logout = createAsyncThunk("user/logout", async (thunkAPI) => {
  try {
    axios.defaults.withCredentials = true;
    await axios.post("http://localhost:3001/api/auth/logout");
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const register = createAsyncThunk(
  "user/register",
  async (newUser, thunkAPI) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        "http://localhost:3001/api/auth/register",
        newUser
      );
      return res.data.details;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
);
export const changepPassword = createAsyncThunk("user/changepassword", async (dataChange,thunkAPI)=>{
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.post(
      "http://localhost:3001/api/auth/changepassword",
      dataChange
    );
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
