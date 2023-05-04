import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './Table.css';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn
} from 'mdb-react-ui-kit';
import { MDBInput } from 'mdb-react-ui-kit';
interface JoinChallengePageProps {
    info: any
}

export const JoinChallengePage: React.FunctionComponent<JoinChallengePageProps> = ({ info }) => {

    const [allgroup, setAllgroup] = useState({});

    const baseURL: any = "http://0.0.0.0:9001/GetAllGroups"

    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setAllgroup(response.data);
        });
    }, []);

    if (allgroup) {
        console.log(allgroup);
    }


    function joinChallenge() {
        const challengeId = document.getElementById("challengeId");
        const userName = document.getElementById("userName");

    }
    return (<>

        <MDBCard>
            <MDBCardBody>
                <MDBCardTitle>Join Group</MDBCardTitle>
                <MDBCardText>
                    <MDBInput label='Example label' id='challengeId' type='text' />
                    <MDBInput label='Example label' id='userName' type='text' />

                </MDBCardText>
                <MDBBtn onClick={joinChallenge}>Button</MDBBtn>
            </MDBCardBody>
        </MDBCard>

        {/* <div style={myStyle}>
            <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered table-secondary border-primary">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Lorem</th>
                            <th scope="col">Ipsum</th>
                            <th scope="col">Dolor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Sit</td>
                            <td>Amet</td>
                            <td>Consectetur</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Adipisicing</td>
                            <td>Elit</td>
                            <td>Sint</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Hic</td>
                            <td>Fugiat</td>
                            <td>Temporibus</td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div> */}
    </>)
}