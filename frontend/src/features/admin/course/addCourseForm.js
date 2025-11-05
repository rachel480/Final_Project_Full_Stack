import NavigateButton from "../../../components/navigateButton"

const AddCourseForm = () => {
    return (
        <div>
            <h1>add form</h1>
            <NavigateButton navigation={'/user/admin/courses'} buttonText={'🔙'}/>
        </div>
    )
}

export default AddCourseForm