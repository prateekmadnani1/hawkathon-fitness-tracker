import { MDBBtn, MDBContainer, MDBNavbar, MDBNavbarItem, MDBNavbarLink } from "mdb-react-ui-kit"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NavBarProps {

}
export const NavBar: React.FunctionComponent<NavBarProps> = () => {
    const [basicModal, setBasicModal] = useState(false);

    const navigate = useNavigate();
    function test(e: any) {
        navigate("/join");
    }
    const toggleShow = () => {
        navigate("/overview")
        // setBasicModal(!basicModal)
    }



    return (<>

        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
                {/* <MDBBtn rounded onClick={test}>Join Challenge</MDBBtn>
                <MDBBtn rounded onClick={toggleShow}>Home</MDBBtn> 
                <MDBBtn rounded onClick={test}>Log out</MDBBtn>*/}
            </MDBContainer>
        </MDBNavbar>


    </>)
}