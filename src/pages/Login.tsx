import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
}
    from 'mdb-react-ui-kit';
import React from 'react';

interface LoginProps {
    pushLoginCreds: any
}

const styles = {
    marginBottom: '70px',
}
const Login: React.FunctionComponent<LoginProps> = ({ pushLoginCreds }) => {

    function checkUserCreds() {
        const mailId: any = document.getElementById("mail")
        const password: any = document.getElementById("password");
        const userName: any = document.getElementById("user");
        pushLoginCreds(userName.value, password.value)
    }
    return (<>
        <MDBContainer className="my-5">
            <MDBCard>
                <MDBRow className='g-0'>
                    <div className="text-center" style={styles} >
                        <MDBCol md='6' className='text-center' >
                            <MDBCardImage src='bhn_logo.png' alt='login form' className='rounded-start w-100' />
                        </MDBCol></div>

                    <MDBCol md='6'>
                        <MDBCardBody className='d-flex flex-column'>



                            {/* <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5> */}
                            <MDBInput wrapperClass='mb-4' label='user name' id='user' type='email' size="lg" />
                            {/* <MDBInput wrapperClass='mb-4' label='Email address' id='mail' type='email' size="lg" /> */}
                            <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' size="lg" />

                            <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={checkUserCreds}>Login</MDBBtn>
                            <a className="small text-muted" href="#!">Forgot password?</a>
                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <a href="#!" style={{ color: '#393f81' }}>Register here</a></p>

                            <div className='d-flex flex-row justify-content-start'>
                                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                                <a href="#!" className="small text-muted">Privacy policy</a>
                            </div>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        </MDBContainer>

    </>)

}
export default Login