import axios from "axios";

// axios.defaults.baseUrl = "https://pixabay.com/api/";
const baseURL = "https://pixabay.com/api/";
const API_KEY = "34526250-d4c92221e4f75204ff5bed4fd";
const SEARCH_OPTIONS = "image_type=photo&orientation=horizontal";
    
export const fetchImagesWithQuery = async (searchQuery, pageNumber = 1) => {
    return axios.get(`${baseURL}?q=${searchQuery}&page=${pageNumber}&key=${API_KEY}&${SEARCH_OPTIONS}&per_page=12`);
};

export default fetchImagesWithQuery;
