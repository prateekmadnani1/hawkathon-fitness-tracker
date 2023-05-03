import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalBody } from 'mdb-react-ui-kit';

interface ConfirmationModalProps {
    confirmationStatus: any
}
export const ConfirmationModal: React.FunctionComponent<ConfirmationModalProps> = ({ confirmationStatus }) => {
    const [bottomModal, setBottomModal] = useState(false);

    const toggleShow = () => setBottomModal(!bottomModal);
    console.log(confirmationStatus);

    return (
        <>
            {/* <MDBBtn onClick={toggleShow}>Launch frame modal</MDBBtn> */}

            <MDBModal animationDirection='bottom' show={bottomModal} tabIndex='-1' setShow={setBottomModal}>
                <MDBModalDialog position='bottom' frame>
                    <MDBModalContent>
                        <MDBModalBody className='py-1'>
                            <div className='d-flex justify-content-center align-items-center my-3'>
                                {confirmationStatus && <><p className='mb-0'>successfully joined Group</p><MDBBtn color='success' size='sm' className='ms-2' onClick={toggleShow}>
                                    Got It
                                </MDBBtn></>}

                                {!confirmationStatus && <><p className='mb-0'>Failed to Join Group</p><MDBBtn color='danger' size='sm' className='ms-2' onClick={toggleShow}>
                                    Got It
                                </MDBBtn></>}

                            </div>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}