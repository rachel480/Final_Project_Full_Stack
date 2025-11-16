import {useNavigate} from 'react-router-dom'

const NavigateButton = ({navigation,buttonText}) => {
    const navigate = useNavigate()

    return (
        <button onClick={()=>navigate(navigation)}>{buttonText}</button>
    )
}

export default NavigateButton