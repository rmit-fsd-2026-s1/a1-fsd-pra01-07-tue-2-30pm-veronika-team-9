import { useState, useEffect } from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Stack,
  Box,
  Center,
  Input,
  InputLeftElement,
  useToast,
} from '@chakra-ui/react'

interface LoginFormProps {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm=({loggedIn, setLoggedIn}: LoginFormProps)=> {

    //Setup usestate for when users change
    const [users, setUsers] = useState<Users[]>([]);
    //const [loggedIn, setLoggedIn] = useState(false);

    //Define interface for storing users
    interface Users {
        id: string,
        vendor: boolean,
        username: string,
        password: string,
    }

    interface FormInfo {
        username: string
        password: string
    }
    
    //check if logged in
    useEffect(() => {
        const user = localStorage.getItem("currentUser")
        if (user != "" && user != "0" && user != null) { //make sure user is not logged out
            setLoggedIn(true);
        }
    })

    //get saved users from localStorage 
    useEffect(() => {
        const savedUsers = localStorage.getItem("users");
        if (savedUsers) {
            setUsers(JSON.parse(savedUsers))
        }
    }, [])

    const [forminfo, setFormInfo] = useState<FormInfo>({
        username: "",
        password: ""
    });


    function handleUpdate(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormInfo(prev => ({ ...prev, [name]: value}))
    }

    const toast = useToast(); //setup toast
    const logInSuccessString = "Logged in successfully!";
    const logInFailString = "Login Failed! Incorrect username or password."

    const logInAttempt = (e: React.SubmitEvent<HTMLFormElement>) => { //waits for form submission
        e.preventDefault();
        console.log('triggered');

        var success = false;

        for (const user of users) { //loop through all users in localstorage
            if (user.username == forminfo.username) { //username match check
                if (user.password == forminfo.password) { //check password

                    success = true; //mark success

                    localStorage.setItem("currentUser", user.id); //set current user in storage to matching user id
                    setLoggedIn(true); //tell login form that login has occurred
                    toast({
                        title: user.username,
                        description: logInSuccessString,
                    })
                }
            }
        }

        if (!success) { //if no match found
            toast({
                title: "Fail",
                description: logInFailString,
            })
        }
    }

    var vendor = true;
    var username = "";
    var password = "";

    return <Center height="100vh"><Stack
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                spacing="100px"
                mb="2"            >

            <form onSubmit={logInAttempt}>

                <Stack
                    spacing={4}
                    p="1rem"
                    backgroundColor="white"
                    border="3px"
                    boxShadow="2x1"
                >
                    <FormControl isRequired>
                        <Input name="username" type="email" value={forminfo.username} onChange={handleUpdate} placeholder="Email"></Input>
                    </FormControl>

                    <FormControl isRequired isInvalid={password.length > 0 && password.length < 8}>
                        <Input name="password" type="password" value={forminfo.password} onChange={handleUpdate} placeholder="Password"></Input>
                        <FormErrorMessage>Password too short!</FormErrorMessage>
                    </FormControl>

                    <FormControl>
                        <Button width="full" colorScheme="cyan" type="submit">Login</Button>
                    </FormControl>
                </Stack>
            </form>

    </Stack>
    </Center>
}

export default LoginForm