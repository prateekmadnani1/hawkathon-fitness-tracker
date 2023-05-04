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
  const [stepCount, setStepCount] = useState<any>();
  const [joinChallengeStatus, setJoinChallengeStatus] = useState<any>()
  const [userChlId, setUserChlId] = useState();
  const navigate = useNavigate();
  const baseURL: any = "http://0.0.0.0:9001"

  function checkForSwitch() {
    setOptSmModal(!optSmModal);

  }
  function handleJoinChallenge(id: any) {
    setUserChlId(id);
    if (userDetails.challenge_id) {
      setJoinChallengeStatus(false)
      checkForSwitch();
    }
    else {
      assignToChallenge(id);
    }
  }
  function assignToChallenge(id: any) {
    const url = `${baseURL}/join_challenge?username=${sessionStorage.getItem("userName")}&challenge_id=${id}`
    axios
      .post(url, {
        title: "Hello World!",
        body: "This is a new post."
      })
      .then((response) => {
        setPost(response);
        if (response.status === 200) {
          setConfirmStatus(true)
        }
      });
  }

  console.log(post);
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

    axios
      .post(`${baseURL}/todays_steps?username=${sessionStorage.getItem("userName")}`, {
        title: "Hello World!",
        body: "This is a new post."
      })
      .then((response) => {
        setStepCount(response.data);
      });

  }, [confirmStatus]);

  console.log(userDetails);



  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setOptSmModal(!optSmModal);
  const handleJoinChallengeStatus = () => {
    setOptSmModal(!optSmModal);
    assignToChallenge(userChlId);


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
              <p className='mb-0'>added to new challenge</p>
              <MDBBtn color='success' size='sm' className='ms-2' onClick={toggleShow}>
                Ok, thanks
              </MDBBtn>
            </div>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>

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
            <td>Current Step Count - {stepCount?.steps}</td>
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
            {allChallenges && Object.values(allChallenges).map((elem: any) => (
              <div key={elem.id}>
                <p>{userDetails?.challenge_id && elem.id != userDetails?.challenge_id && `${elem.name}  (${elem.startDate} - ${elem.endDate})`}</p>
                <div>
                  {userDetails?.challenge_id && elem.id != userDetails?.challenge_id && <MDBBtn rounded onClick={() => handleJoinChallenge(elem.id)}>join Challenge</MDBBtn>}
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