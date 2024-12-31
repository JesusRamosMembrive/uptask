import api from "@/lib/axios";
import {Project, TaskFormData} from "@/types/index.ts";
import { isAxiosError} from "axios";

type TaskAPIProps = {
    formData: TaskFormData,
    projectId: Project['_id']
}

export async function createTask({formData, projectId} : TaskAPIProps) {
    try {
        const url = `/projects/${projectId}/tasks`;
        const {data} = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.error);
        }
    }
}