import{useNavigate} from 'react-router-dom'
const BackButton=({navigation})=>{
    const navigate=useNavigate()
return (
    <button onClick={()=>navigate(navigation)}>🔙</button>
)
}
export default BackButton