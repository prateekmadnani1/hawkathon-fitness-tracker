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
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownToggle,
  MDBRow,
  MDBCol,
  MDBCollapse,
  MDBBadge,
} from 'mdb-react-ui-kit';

import { NavBar } from '../components/NavBar';
interface OverviewProps {
  userName: any;
}
const div = document.createElement("div");
const styles = {
  marginBottom: '70px',
}
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
  const [showFirstElement, setShowFirstElement] = useState(false);
  const [reedeemModalStatus, setReedeemModalStatus] = useState<any>();
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
      setCurrentChallenge(response.data)
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


  //------------redeem----------

  const toggleFirstElement = () => setShowFirstElement(!showFirstElement);

  const showReedemModal = () => setReedeemModalStatus(!reedeemModalStatus);


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
              <p><strong>{`${key} : ${elem}`} steps</strong></p>


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


    <MDBModal animationDirection='bottom' show={reedeemModalStatus} tabIndex='-1' setShow={setReedeemModalStatus}>
      <MDBModalDialog position='bottom' frame>
        <MDBModalContent>
          <MDBModalBody className='py-1'>
            <div className='d-flex justify-content-center align-items-center my-3'>
              <p className='mb-0'>Your Points are Reedeem</p>
              <MDBBtn color='success' size='sm' className='ms-2' onClick={showReedemModal}>
                got it
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
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>UserName  :   {sessionStorage.getItem("userName")}</strong></td>
          </tr>
          {/* <tr>
            <td><strong>User Email Address -</strong> {sessionStorage.getItem("mail")}</td>
          </tr> */}
          <tr>
            <td><strong>Height   :    {userDetails?.height} ft</strong></td>
          </tr>
          <tr>
            <td><strong>Weight   :    {userDetails?.weight} kg</strong></td>
          </tr>
          <tr>
            <td><strong>Rewards available to redeem  : {userDetails?.available_points} fit points</strong></td>
          </tr>
          <tr>
            <td><strong>Total Rewards Earned : {userDetails?.till_today_points
            } fit points</strong></td>
          </tr>
        </tbody>
      </table>
    </div>



    <div className="text-center" style={styles}>
      <table>
        <thead>
          <tr>
            <th>My Challenges</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>{`${currentChallenge?.name}  (Start Date : ${currentChallenge?.startDate}  End Date : ${currentChallenge?.endDate})`}</strong></td>
          </tr>
          <tr>
            <td><strong>Step Count : {stepCount?.steps}</strong></td>
          </tr>
          <tr>
            <td><strong>Rewards :  {currentChallenge?.reward} fit points</strong></td>
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
                  <p>
                    {userDetails?.challenge_id && elem.id !== userDetails?.challenge_id &&

                      <strong>
                        {`${elem.name} (Start Date : ${elem.startDate} End Date : ${elem.endDate})`}
                      </strong>

                    }
                  </p>
                  <div className="align-self-center" style={{ width: '500px' }}>
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
      {/* <div>
        <MDBDropdown group>
          <MDBDropdownToggle color='success'>Action</MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem link>Action</MDBDropdownItem>
            <MDBDropdownItem link>Another action</MDBDropdownItem>
            <MDBDropdownItem link>Something else here</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </div> */}
      <div>

        <MDBBtn onClick={toggleFirstElement}> Redeem      <MDBBadge className='ms-2' color='danger'>
          8
        </MDBBadge></MDBBtn>
        <MDBRow>
          <MDBCol>
            <MDBCollapse show={showFirstElement} className='mt-3'>
              <MDBCard>
                <MDBCardBody>
                  <MDBCardTitle>Card title</MDBCardTitle>
                  <MDBCardText>
                    <div>
                      <input type='text' maxLength={100} minLength={10} placeholder='value' />
                      <MDBBtn onClick={showReedemModal}> Redeem</MDBBtn>
                    </div>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCollapse>
          </MDBCol>
        </MDBRow>
      </div>
    </div>




  </>)
}
export default Overview;

