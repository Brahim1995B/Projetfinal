import axios from "axios";
import {
  GET_MY_POSTS,
  GET_ONE_POST,
  GET_POSTS,
  GET_SEARCH_CARS,
} from "../ActionTypes/PostTypes";
const baseurl = process.env.REACT_APP_BASEURL;

export const getAllCars = () => async (dispatch) => {
  try {
    const res = await axios.get(baseurl + "/api/cars/getAll/");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addCar = (newPost, navigate) => async (dispatch) => {
  try {
    await axios.post(baseurl + "/api/cars/addCars", newPost);
    dispatch(getAllCars());
    navigate("/Profile");
  } catch (error) {
    console.log(error);
  }
};

export const getSearchCar =(data)=> async (dispatch)=>{
  try {
    const res = await axios.post(baseurl + "/api/cars/getSearchCars",data);
    dispatch({
      type: GET_SEARCH_CARS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
  };

export const getOneCar = (id) => async (dispatch) => {
  try {
    const res = await axios.get(baseurl + "/api/cars/getById/" + id);
    console.log(res);
    dispatch({ type: GET_ONE_POST, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const updateCar = (upPost, id, navigate) => async (dispatch) => {
  await axios.put(baseurl + '/api/cars/updateCar/'+id, upPost);
  try {
    navigate('/car/'+id);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCar = (id, navigate,navigateTo) => async (dispatch) => {
  try {
    await axios.delete(baseurl + '/api/cars/deleteCar/'+id);

    dispatch(getAllCars());
    window.location.reload(false)
  } catch (error) {
    console.log(error);
  }
};

export const getMyCars = (id) => async (dispatch) => {
  console.log(id);
  try {
    const res = await axios.get(baseurl + "/api/cars/getMyCars/" + id);
    dispatch({ type: GET_MY_POSTS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const updateValid = (upPost, id, location, userID) => async (
  dispatch
) => {
  try {
    await axios.put(baseurl + `/api/post/updatePost/${id}`, upPost);
    if (location.pathname === "/ListPost") {
      dispatch(getAllCars());
    } else {
      dispatch(getAllCars(userID));
    }
  } catch (error) {
    console.log(error);
  }
};
