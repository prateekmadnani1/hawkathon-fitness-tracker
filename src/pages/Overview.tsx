import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Table.css';
import axios from "axios";
import {
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
} from 'mdb-react-ui-kit';

import { NavBar } from '../components/NavBar';
interface OverviewProps {
  userName: any;
}
const div = document.createElement("div");
div.style.fontWeight = "bold";
const Overview: React.FunctionComponent<OverviewProps> = () => {
  const [optSmModal, setOptSmModal] = useState(false);
  const [leaderBoardStatus, setleaderBoardStatus] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState(false);
  const [allChallenges, setAllChallenges] = useState(null);
  const [userDetails, setUserDetails] = useState<any>(null)
  const [currentChallenge, setCurrentChallenge] = useState<any>();
  const [post, setPost] = useState<any>();

  const [error, setError] = React.useState(null);
  const [stepCount, setStepCount] = useState<any>();
  const [joinChallengeStatus, setJoinChallengeStatus] = useState<any>()
  const [userChlId, setUserChlId] = useState();
  const [challengeId, setChallengeId] = useState();
  const [leaderBoardData, setLeaderBoardData] = useState<any>();

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

  useEffect(() => {

    axios.get(`${baseURL}/my_active_challenge?username=${sessionStorage.getItem("userName")}`).then((response) => {
      setCurrentChallenge(response.data.name)
    });

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


  function leaderBoard(challengeId: any) {

    axios.get(`${baseURL}/challenge_by_id?challenge_id=${challengeId}`).then((response) => {
      setLeaderBoardData(response.data)
    });




    setChallengeId(challengeId);
    setleaderBoardStatus(true)

  }
  const toggleShowLeaderBoard = () => setleaderBoardStatus(!leaderBoard);

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
              <MDBBtn color='success' size='sm' className='ms-2' onClick={toggleConfirmation}>
                Ok, thanks
              </MDBBtn>
            </div>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>


    {leaderBoardData && <MDBModal tabIndex='-1' show={leaderBoardStatus} setShow={setleaderBoardStatus}>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>{leaderBoardData.name}</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={toggleShowLeaderBoard}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>

            {Object.entries(leaderBoardData?.participation_score).map(([key, elem]: any) => (
              <p><strong>{`${key} --> ${elem}`}</strong></p>


            ))}

            {Object.keys(leaderBoardData?.participation_score).length === 0 && <p>no participents</p>}

          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color='secondary' onClick={toggleShowLeaderBoard}>
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>}






    <div className="text-center">
      <table>
        <thead>
          <tr>
            <th>User Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>UserName - {sessionStorage.getItem("userName")}</strong></td>
          </tr>
          {/* <tr>
            <td><strong>User Email Address -</strong> {sessionStorage.getItem("mail")}</td>
          </tr> */}
          <tr>
            <td><strong>Current Step Count - {stepCount?.steps}</strong></td>
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
            <td><strong>Challenge Name -{currentChallenge}</strong></td>
          </tr>
          <tr>
            <td><strong>Step Count -{stepCount?.steps}</strong></td>
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
                  <p>{userDetails?.challenge_id && elem.id != userDetails?.challenge_id && <strong> `${elem.name}  (${elem.startDate} - ${elem.endDate})`</strong>}</p>
                  <div className="align-self-center">
                    {userDetails?.challenge_id && elem.id != userDetails?.challenge_id && <MDBBtn rounded onClick={() => handleJoinChallenge(elem.id)}>
                      join Challenge
                    </MDBBtn>}
                  </div>

                  <div className="align-self-center">
                    {userDetails?.challenge_id && elem.id != userDetails?.challenge_id && <MDBBtn rounded onClick={() => leaderBoard(elem.id)}>
                      Leader Board
                    </MDBBtn>}
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

