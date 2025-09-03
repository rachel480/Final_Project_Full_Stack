
import BackButton from "../../components/backButton"
import MyWordListLayout from "../../routes/layouts/myWordListLayout"


const MyWords=()=>{

return (<div>
    <header style={{display:"flex"}}>
        <BackButton navigation={'/user/my-words'} />
        <MyWordListLayout/>
    </header>
</div>)
}
export default MyWords