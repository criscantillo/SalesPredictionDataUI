import axios from 'axios'

const baseURL = 'https://localhost:7048/api';

export default axios.create({
    baseURL
});