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
import Dialog from 'react-bootstrap-dialog';

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
const Overview: React.FunctionComponent<OverviewProps> = () => {
  const [optSmModal, setOptSmModal] = useState(false);
  const [scrollableModal, setScrollableModal] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState(false);
  const [allChallenges, setAllChallenges] = useState(null);
  const [userDetails, setUserDetails] = useState<any>(null)
  const [post, setPost] = useState<any>();
  const [error, setError] = React.useState(null);
  const [popStatus, setPopUpStatus] = useState<any>(false);
  const [joinChallengeStatus, setJoinChallengeStatus] = useState<any>(false)
  const navigate = useNavigate();
  const baseURL: any = "http://0.0.0.0:9001"

  function handleJoinChallenge(this: any, id: any) {
    console.log(id);
    if (userDetails.challenge_id) {
      // setJoinChallengeStatus(false)
      setOptSmModal(!optSmModal);
    }
    setJoinChallengeStatus(true)
    if (joinChallengeStatus) {
      const url = `${baseURL}/join_challenge?username=${sessionStorage.getItem("userName")}&challenge_id=${id}`
      axios
        .post(url, {
          title: "Hello World!",
          body: "This is a new post."
        })
        .then((response) => {
          setPost(response);
          setJoinChallengeStatus(false)
        });
    }
  }

  console.log(post);


  console.log(sessionStorage.getItem("userName"));

  useEffect(() => {
    axios.get(`${baseURL}/all_challenges`).then((response) => {
      setAllChallenges(response.data)
    });

    axios
      .post(`${baseURL}/user?username=${sessionStorage.getItem("userName")}`, {
        title: "Hello World!",
        body: "This is a new post."
      })
      .then((response) => {
        setUserDetails(response.data);
      });
  }, [joinChallengeStatus]);

  console.log(userDetails);



  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setOptSmModal(!optSmModal);
  const handleJoinChallengeStatus = () => {
    setJoinChallengeStatus(true)
    setOptSmModal(!optSmModal);

  }
  const toggleConfirmation = () => setConfirmStatus(!confirmStatus)
  return (<>
    <NavBar></NavBar>

    <MDBModal show={optSmModal} tabIndex='-1' setShow={setOptSmModal}>
      <MDBModalDialog size='sm'>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Small modal</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            {<p>you are already in challenge do you want to switch challenge..?</p>}
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color='secondary' onClick={toggleShow}>
              Close
            </MDBBtn>
            <MDBBtn onClick={handleJoinChallengeStatus}>switch</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>


    <MDBModal animationDirection='bottom' show={confirmStatus} tabIndex='-1' setShow={setConfirmStatus}>
      <MDBModalDialog position='bottom' frame>
        <MDBModalContent>
          <MDBModalBody className='py-1'>
            <div className='d-flex justify-content-center align-items-center my-3'>
              <p className='mb-0'>We use cookies to improve your website experience</p>
              <MDBBtn color='success' size='sm' className='ms-2' onClick={toggleShow}>
                Ok, thanks
              </MDBBtn>
              <MDBBtn size='sm' className='ms-2'>
                Learn more
              </MDBBtn>
            </div>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>

    <div className="text-center">
  <table>
    <thead>
      <tr>
        <th>User Details</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>UserName -</strong> {sessionStorage.getItem("userName")}</td>
      </tr>
      <tr>
        <td><strong>User Email Address -</strong> {sessionStorage.getItem("mail")}</td>
      </tr>
      <tr>
        <td><strong>Current Step Count - </strong></td>
      </tr>
    </tbody>
  </table>
</div>



    <div className="text-center">
      <table>
        <thead>
          <tr>
            <th>Challenge Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Challenge Name -</strong></td>
          </tr>
          <tr>
            <td><strong>Step Count -</strong></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="text-center">
      <table>
        <thead>
          <tr>
            <th>On Going Challenges</th>
          </tr>
        </thead>
      </table>
    </div>

    <div style={{ overflowY: 'scroll', height: '500px' }}>
  <MDBCard>
    <MDBCardBody>
      <MDBCardTitle>Join Challenge</MDBCardTitle>
      <MDBCardText>
        {allChallenges &&
          Object.values(allChallenges).map((elem: any) => (
            <div key={elem.id} className="d-flex justify-content-between">
              <p>{elem.name}</p>
              <div className="align-self-center">
                <MDBBtn rounded onClick={() => handleJoinChallenge(elem.id)}>
                  join Challenge
                </MDBBtn>
              </div>
            </div>
          ))}
      </MDBCardText>
    </MDBCardBody>
  </MDBCard>
</div>



  </>)
}
export default Overview;