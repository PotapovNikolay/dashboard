import axiosInstance from "../helpers/axios";
import useContextMenu from "./useContextMenu";

import useInitView from "./useInitView";
import useImage from "./useImage";
import useHelpers from "./useHelpers";
import useFilter from "./useFilter";
import useInitList from "./useInitList";


export default function (app) {
    app.provide("useAxios", axiosInstance);
    app.provide("useHelpers", useHelpers);
    app.provide("useContextMenu", useContextMenu);
    app.provide("useInitView", useInitView);
    app.provide("useInitList", useInitList);
    app.provide("useImage", useImage);
    app.provide("useFilter", useFilter);
    
}
