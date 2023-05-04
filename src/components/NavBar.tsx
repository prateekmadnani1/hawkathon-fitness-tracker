import { MDBBtn, MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarLink } from "mdb-react-ui-kit"
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
    function logout(e: any) {
        navigate("/");
    }



    return (<>
        <MDBNavbar expand='lg' light bgColor='dark'>
            <MDBContainer fluid className="d-flex justify-content-end">
                <MDBNavbarBrand className='mx-auto text-center'>
                    <p className="text-white bg-dark"> <b>Hawk Fitness </b></p> </MDBNavbarBrand>
                <div className="align-self-center">
                    <MDBBtn rounded onClick={logout}>
                        Log out
                    </MDBBtn>
                </div>
            </MDBContainer>
        </MDBNavbar>





    </>)
}