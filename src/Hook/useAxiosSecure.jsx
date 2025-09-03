import axios from 'axios';

// Create an axios instance
const axiosSecure = axios.create({
  baseURL: 'https://serverside-code-manegment-code.vercel.app',  // Your server URL
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
