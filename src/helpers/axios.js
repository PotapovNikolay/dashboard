import Axios from "axios";

const languageOfQuery = () => {
    return `${localStorage.language === "en" ? "/" + localStorage.language : ""}`;
};

let axiosInstance = Axios.create({
    baseURL: "/api" + languageOfQuery(),

    /*onUploadProgress: function(progressEvent) {

        console.log(progressEvent);

        console.log(1);

        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

        let progressBar = document.getElementById('progress_bar');

        console.log(percentCompleted);

        if (percentCompleted !== 100) {

            progressBar.style.visibility = 'visible';

            console.log(2);

            progressBar.style.width = percentCompleted + '%';
        }
        else {

            progressBar.style.visibility = 'hidden';
        }
    },

    onDownloadProgress: function (progressEvent) {

    },*/
});

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        confirm('Что-то пошло не так')
        //alert("Возникла проблема с сервером, некоторый функционал может работать некорректно. Пожалуйста, перезагрузите страницу");

        //throw new Error("500 error", error);
    }
);

axiosInstance.interceptors.request.use(function (config) {
    const token = document.querySelector('[name="csrf-token"]').content;

    if (config.data instanceof FormData) {
        config.data.append("_token", token);
    } else if (config.data instanceof Object && !config.data._token) {
        config.data._token = token;
    }

    return config;
});

export default axiosInstance;
