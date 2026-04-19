import { useState, useEffect, HTMLInputTypeAttribute } from "react";




import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Stack,
  Center,
  Box,
  Toast,
  Input,
  InputLeftElement,
  useToast,
} from '@chakra-ui/react'
import { getRandomValues } from "node:crypto";


const SignupForm=()=> {
    //Define interface for storing users
    interface Users {
        id: number,
        vendor: boolean,
        username: string,
        password: string,
        name: string,
        phonenum: string,
        reputation: number,
    }

    //Setup usestate for when users change
    const [users, setUsers] = useState<Users[]>([]) //defines array of users 
    const [newUser, setNewUser] = useState({ vendor: false, username: "", password: ""});  //state used when a new user is registered, added to array above
    const [loaded, setLoaded] = useState(false); //state for waiting users to be filled in

    const toast = useToast();
    const registeredString = "New user successfully registered!"; //Setup confirmation toast


    useEffect(() => {
        const saved = localStorage.getItem("users");
        if (saved) setUsers(JSON.parse(saved));
        setLoaded(true);
    }, []);

    //save users to local storage on change
    useEffect(() => {
        if (loaded) {
            localStorage.setItem("users", JSON.stringify(users));
        }
    }, [users, loaded]); //links useeffect to both users array and load state for updating

    const addUser = (e: React.SubmitEvent<HTMLFormElement>) => { //waits for form submission
    e.preventDefault();
    console.log('triggered');
    if (newUser.username.trim()) {
      setUsers([
        ...users,
        {
          id: Date.now(),
          vendor: newUser.vendor,
          username: newUser.username.trim(),
          password: newUser.password.trim(),
          name: "",
          phonenum: "",
          reputation: Math.floor(Math.random() * 4), //random reputation as historial list unimplemented
        },
      ]);
      setNewUser({ vendor: false, username: "", password: ""});
      toast({ //Display successful feedback
            title: "",
            description: registeredString,
        });
    }
  };



    //handle when a form field is updated
    function handleUpdate(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setNewUser(prev => ({ ...prev, [name]: value}))
    }

    //handle checkbox updating, as e.target.value doesnt work
    function handleCheckUpdate(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, checked } = e.target;
        setNewUser(prev => ({ ...prev, [name]: checked}))
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

            <form onSubmit={addUser}>

                <Stack
                    spacing={4}
                    p="1rem"
                    backgroundColor="white"
                    border="3px"
                    boxShadow="2x1"
                >
                    <FormControl>
                        <FormLabel>Vendor?</FormLabel>
                        <Input name="vendor" checked={newUser.vendor} type="checkbox" onChange={handleCheckUpdate}></Input>
                    </FormControl>

                    <FormControl isRequired>
                        <Input name="username" type="text" value={newUser.username} onChange={handleUpdate} placeholder="Email"></Input>
                    </FormControl>

                    <FormControl isRequired isInvalid={password.length > 0 && password.length < 8}>
                        <Input name="password" type="password" value={newUser.password} onChange={handleUpdate} placeholder="Password"></Input>
                        <FormErrorMessage>Password too short!</FormErrorMessage>
                    </FormControl>

                    <FormControl>
                        <Button width="full" colorScheme="cyan" type="submit">Register</Button>
                    </FormControl>
                </Stack>
            </form>
    </Stack>
    </Center>
    
}

export default SignupForm