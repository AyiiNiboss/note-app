import DetailNoteLayout from "../components/layouts/detailNoteLayout"
import NavbarLayout from "../components/layouts/navbarLayout"
import { useLogin } from "../hooks/useLogin"

const DetailNotePage = () => {
    useLogin()
    return (
        <>
            <NavbarLayout />
            <DetailNoteLayout />
        </>
    )
}

export default DetailNotePage