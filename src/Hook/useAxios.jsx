import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://serverside-code-manegment-code.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;