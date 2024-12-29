import {Link} from "react-router-dom";
import {useForm} from 'react-hook-form'
import ProjectForm from "@/components/projects/ProjectForm.tsx";
import {ProjectFormData} from "@/types/index";
import {createProject} from "@/api/ProjectApi";

export const CreateProjectView = () => {

    const initialValues : ProjectFormData = {
        projectName:"",
        clientName:"",
        description:""
    };

    const handleForm= (data: ProjectFormData) => {
        createProject(data);
    }

    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues});

    return (
        <>
            <div className={"max-w-3xl mx-auto"}>
            <h1 className={"text-5xl font-black"}>Create project</h1>
            <p className={"text-2xl font-light text-gray-500 mt-5"}>Fill out the form below to create a project</p>

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
                    value={"Create project"}
                    className={"bg-fuchsia-600 w-full p-3 " +
                        "hover:bg-fuchsia-500 px-10 py-3 " +
                        "text-white text-xl " +
                        "uppercase font-bold cursor-pointer transition-colors"}

                />

            </form>
            </div>
        </>
    );
};