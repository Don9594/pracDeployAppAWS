import Form from "../../_components/form"
import styles from './styles.module.css';
//import val from './api/submit_application';

export default function  Submit_application()  {

    

return  (
    //<form></form>
<>
    <div className={styles.pageWrapper}>
        <Form actionRoute= "/api/routes/submit_app" />
    </div>
</>
)};

