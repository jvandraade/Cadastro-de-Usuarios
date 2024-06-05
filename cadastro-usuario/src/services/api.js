import axios from "axios";

const api = axios.create({
    baseURL:
        "/" /* Não tenho um servidor backend, mas se tivesse colocaria o link dele dentro das "" Ex: "https://localhost/3000" */,
});

export default api;
