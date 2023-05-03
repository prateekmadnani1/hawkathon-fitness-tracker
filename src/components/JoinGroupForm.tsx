
import { Controller, useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { Label, Placeholder } from 'reactstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from "axios";

interface JoinGroupProps {
    getAllGroups: any,
    close: any,
    confirmationStatus: any
}


export const JoinGroupForm: React.FunctionComponent<JoinGroupProps> = ({ getAllGroups, close, confirmationStatus }) => {
    const [height, setHeight] = useState(0);
    const [groupOptions, setGroupOptions] = useState<any>([{ value: "", label: "" }]);
    const [groupName, setGroupName] = useState<any>()
    const [groupId, setGroupId] = useState<any>();
    const [switchStatus, setSwitchStatus] = useState<any>();
    const [isSet, setIsSet] = useState<any>(false);
    const [post, setPost] = useState<any>();
    const [error, setError] = React.useState(null);
    const adjustTextBox = (e: any) => {
        const element = e.target;
        setHeight(element.scrollHeight);
    };
    const defaultValues: any = {
        description: '',
    };
    const methods = useForm({ defaultValues });
    // properties to manage form state
    const {
        handleSubmit,
        register,
        control,
        setValue,
        getValues,
        formState: { errors },
    } = methods;

    const switchGroups = [{ value: "True", label: 'True' },
    { value: "False", label: 'False' }]


    useEffect(() => {
        prepareDataForDropDown()
    }, [getAllGroups])


    function prepareDataForDropDown() {
        const groups: any = [];
        Object.entries(getAllGroups).map(([key, value]: any) => {
            const groupObj: any = { value: "", label: "" };
            groupObj.value = key;
            groupObj.label = value.group_name;
            groups.push(groupObj)
        })
        setGroupOptions(groups);
    }

    function setGroupFields(e: any) {

        setGroupId(e.value);
        setGroupName(e.label)
    }

    function setSwitchFieldStatus(e: any) {
        setSwitchStatus(e.value)
    }



    function pushValues() {
        const userName = getValues("userName")

        const baseURL = `http://0.0.0.0:9001/groups?username=${userName}&group_id=${groupId}&group_name=${groupName}&switch_group=${switchStatus}`
        axios
            .post(baseURL, {
                title: "join group",
                body: "This is a new post."
            })
            .then((response) => {
                setPost(response.data)
            }).catch(error => {
                setError(error);
            });
        if (post) {
            confirmationStatus(post)
        }
        else if (error) {
            confirmationStatus(error);
        }
        close(true);

    }

    return (<>

        <Form onSubmit={handleSubmit(pushValues)}>
            <div className='row'>
                <div className='repo_name'>
                    <Label className=''>user Name</Label>
                    <input
                        {...register('userName', {
                            required: {
                                value: true,
                                message: 'this field is required',
                            },
                        })}
                        className='form-control'
                    />
                </div>

                <div className='py-1 '>
                    <Dropdown options={groupOptions} menuClassName='myMenuClassName' onChange={setGroupFields} placeholder="Select an option" />
                </div>

                <div className='py-1 '>
                    <Dropdown options={switchGroups} menuClassName='myMenuClassName' onChange={setSwitchFieldStatus} placeholder="Select an option" />
                </div>

                <Button className='submit' variant='primary' type='submit'>
                    Join
                </Button>

            </div>
        </Form>


    </>)
}