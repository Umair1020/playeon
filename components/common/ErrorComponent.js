import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faCircleXmark, faE, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ErrorComponent = ({errorMsg}) => {
    return (
        <div className='errorMessage'>
        <FontAwesomeIcon icon={faExclamationTriangle} style={{marginRight: '5px'}}/>
        {errorMsg}
        </div>
    )
}

export default ErrorComponent;