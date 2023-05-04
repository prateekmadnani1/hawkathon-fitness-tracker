import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Table.css';
import axios from "axios";
import {
  MDBContainer,
  MDBNavbar,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from 'mdb-react-ui-kit';

import { JoinGroupForm } from '../components/JoinGroupForm';
import { ConfirmationModal } from '../components/Modals/ConfirmationModal';
import Popup from '../components/Modals/Popup';
import { JoinChallengePage } from './JoinChallengePage';
import { NavBar } from '../components/NavBar';
interface OverviewProps {
  userName: any;
}
const div = document.createElement("div");
div.style.fontWeight = "bold";
const Overview: React.FunctionComponent<OverviewProps> = ({ userName }) => {
  const [scrollableModal, setScrollableModal] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState();
  const [allChallenges, setAllChallenges] = React.useState({});
  const [post, setPost] = useState<any>();
  const [error, setError] = React.useState(null);
  const [popStatus, setPopUpStatus] = useState<any>(false);
  const navigate = useNavigate();
  const baseURL: any = "http://0.0.0.0:9001"

  function test(e: any) {
    setScrollableModal(!scrollableModal)
  }

  function setConfirmationStatus(e: any) {
    setConfirmStatus(e);
  }
  function viewGroups() {
    navigate('/groups')
  }

  function logout() {
    navigate('/')
  }

  // function joinGroup(elem: any, groupId: any) {
  //   setPopUpStatus(true)
  //   console.log(elem, groupId);
  //   const groupName = elem


  // const baseURL = `http://0.0.0.0:9001/groups?username=${userName}&group_id=${groupId}&group_name=${groupName}&switch_group=${switchStatus}`
  // axios
  //     .post(baseURL, {
  //         title: "join group",
  //         body: "This is a new post."
  //     })
  //     .then((response) => {
  //         setPost(response.data)
  //     }).catch(error => {
  //         setError(error);
  //     });
  // if (post) {
  //     setConfirmStatus(post)
  // }
  // else if (error) {
  //     setConfirmStatus(error);
  // }
  //}
  const handleClosePopup = () => {
    setPopUpStatus(false);
  };

  console.log(sessionStorage.getItem("userName"));

  const handleOK = () => {
    console.log('OK button clicked');
    setPopUpStatus(false);
  };

  const handleCancel = () => {
    console.log('Cancel button clicked');
    setPopUpStatus(false);
  };

  useEffect(() => {
    axios.get(`${baseURL}/all_challenges`).then((response) => {
      setAllChallenges(response.data);
    });
  }, [allChallenges]);



  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);
  return (<>
    <NavBar></NavBar>

    {/* <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Modal title</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <JoinGroupForm getAllGroups={allgroup} close={toggleShow} confirmationStatus={setConfirmationStatus}></JoinGroupForm>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal> */}


    {/* <MDBModal show={scrollableModal} setShow={setScrollableModal} tabIndex='-1'>
      <MDBModalDialog scrollable>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Modal title</MDBModalTitle>
            <MDBBtn
              className='btn-close'
              color='none'
              onClick={() => setScrollableModal(!scrollableModal)}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>

            <p> {allgroup && Object.entries(allgroup).map(([key, elem]: any) => (
              <div>
                {elem.group_name}
                {elem.members.map((member: any) => (
                  <div>{member}</div>
                ))}
                <div><MDBBtn rounded onClick={() => joinGroup(elem, key)}>Join Groups</MDBBtn>
                </div>
              </div>

            ))}</p>

          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color='secondary' onClick={() => setScrollableModal(!setScrollableModal)}>
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal> */}




    {/* {confirmStatus && <ConfirmationModal confirmationStatus={confirmStatus}></ConfirmationModal>
    } */}

    {/* {popStatus && (
      <Popup
        message="Are you sure you want to do this?"
        onOK={handleOK}
        onCancel={handleCancel}
      />
    )} */}


    {/* -------------------------------------------------------------------------------------- */}
    {/* <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
                <MDBBtn rounded onClick={logout}>Log out</MDBBtn>

            </MDBContainer>
        </MDBNavbar> */}
    <div>
      <table>
        <thead>
          <tr>
            <th>User Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>UserName - {sessionStorage.getItem("userName")}</td>
          </tr>
          <tr>
            <td>User Email Address - {sessionStorage.getItem("mail")}</td>
          </tr>
          <tr>
            <td>current Step count - </td>
          </tr>
        </tbody>
      </table>
    </div>


    <div>
      <table>
        <thead>
          <tr>
            <th>Participation</th>
          </tr>
        </thead>
      </table>
    </div>

    <div>
      <table>
        <thead>
          <tr>
            <th>Challenge Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Steps</td>
          </tr>
          <tr>
            <td>Step Count</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <table>
        <thead>
          <tr>
            <th>On Going Challenges</th>
          </tr>
        </thead>
      </table>
    </div>

    <div>
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>Join Challenge</MDBCardTitle>
          <MDBCardText>


          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </div>

  </>)
}
export default Overview;