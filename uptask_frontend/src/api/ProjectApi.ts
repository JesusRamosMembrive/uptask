import {ProjectFormData} from "@/types/index.ts";
import api from '@/lib/axios';

export async function createProject(formData: ProjectFormData){
    try {
        const {data} = await api.post('/projects', formData);
        // const response = await api.post('/projects', data);
        // return response.data;
        console.log(data);
    }
    catch (e) {
        console.error(e);
    }
}