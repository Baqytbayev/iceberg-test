import axios from "axios";
import {baseURL} from "./baseURL";


export const instances = axios.create({
	baseURL: baseURL
})