import CreateNoteLayout from "../components/layouts/createNoteLayout"
import NavbarLayout from "../components/layouts/navbarLayout"
import { useLogin } from "../hooks/useLogin"

const CreateNotePage = () => {
    useLogin()
    return (
        <>
            <NavbarLayout />
            <CreateNoteLayout />
        </>
    )
}

export default CreateNotePage