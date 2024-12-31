import {Link, useNavigate} from "react-router-dom";
import ProjectForm from "@/components/projects/ProjectForm.tsx";
import {Project, ProjectFormData} from "@/types/index.ts";
import {useForm} from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {toast} from "react-toastify";
import {updateProject} from "@/api/ProjectApi.ts";

type EditProjectFormProps = {
    data: ProjectFormData
    projectId: Project['_id']
}

export default function EditProjectForm({data, projectId}: EditProjectFormProps){

    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
            projectName:data.projectName,
            clientName:data.clientName,
            description:data.description
        }});
    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['projects']});
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]});

            toast.success(data);
            navigate('/');
        }
    });

    const handleForm= (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId
        };
        mutate(data);
    };

    return (
        <>
            <div className={"max-w-3xl mx-auto"}>
                <h1 className={"text-5xl font-black"}>Edit project</h1>
                <p className={"text-2xl font-light text-gray-500 mt-5"}>Fill out the form below to edit a project</p>

                <nav className={"my-8"}>
                    <Link to={'/'}
                          className={"bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl" +
                              " font-bold cursor-pointer transition-colors"}>

                        Back to Dashboard
                    </Link>
                </nav>

                <form
                    className={"mt-10 bg-white shadow-lg p-10 rounded-lg"}
                    onSubmit={handleSubmit(handleForm)}
                    noValidate={true}
                >
                    <ProjectForm
                        register={register}
                        errors={errors}

                    ></ProjectForm>

                    <input
                        type={"submit"}
                        value={"Submit changes"}
                        className={"bg-fuchsia-600 w-full p-3 " +
                            "hover:bg-fuchsia-500 px-10 py-3 " +
                            "text-white text-xl " +
                            "uppercase font-bold cursor-pointer transition-colors"}

                    />
                </form>
            </div>
        </>
    );
}
