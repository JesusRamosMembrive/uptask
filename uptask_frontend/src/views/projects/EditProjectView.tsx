import {useParams} from 'react-router-dom';

export default function EditProjectView(){

    const params = useParams();
    const projectId = params.projectId!;

    return (
        <div>
        <h1>Edit Project</h1>
        </div>
    )
}
