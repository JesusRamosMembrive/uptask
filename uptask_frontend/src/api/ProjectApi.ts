import {dashboardProjectSchema, ProjectFormData} from "@/types/index.ts";
import api from '@/lib/axios';
import {isAxiosError} from "axios";

export async function createProject(formData: ProjectFormData){
    try {
        const {data} = await api.post('/projects', formData);
        return data;
    }
    catch (e) {
        if(isAxiosError(e) && e.response){
            console.error(e);
            throw e.response.data.error;
        }
    }
}

export async function getProjects(){
    try {
        const {data} = await api('/projects');
        const response = dashboardProjectSchema.safeParse(data);
        if(response.success) {
            return response.data
        }
    }
    catch (e) {
        if(isAxiosError(e) && e.response){
            console.error(e);
            throw e.response.data.error;
        }
    }
}