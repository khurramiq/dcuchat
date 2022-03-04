import axios from "axios";
// export const fbaseUrl = "http://localhost:3000";
export const fbaseUrl = "https://dcuchat.netlify.app";
// export const baseUrl = "http://localhost:5000";
export const baseUrl = "https://dcuchat.herokuapp.com";
export default axios.create({
  baseURL: `${baseUrl}/api`,
});
