import axios from 'axios';

// Create an axios instance
const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000',  // Your server URL
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
