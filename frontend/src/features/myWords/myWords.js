
import NavigateButton from "../../components/navigateButton"
import MyWordListLayout from "../../routes/layouts/myWordListLayout"


const MyWords=()=>{

return (<div>
    <header style={{display:"flex"}}>
        <NavigateButton navigation={'/user/my-words'} buttonText={'🔙'}/>
        <MyWordListLayout/>
    </header>
</div>)
}
export default MyWords