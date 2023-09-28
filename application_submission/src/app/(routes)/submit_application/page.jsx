import Form from "../../_components/form"
//import val from './api/submit_application';

export default function  Submit_application()  {

    

return  (
    //<form></form>
<>
    <div>
        <h2>Please fill the below form to submit your pdf.</h2>
        <Form actionRoute= "/api/routes/submit_app" />
    </div>
</>
)};

