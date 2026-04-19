import {
  Stack,
  Box,
  Button,
} from '@chakra-ui/react'


interface LoginFormProps {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutForm=({loggedIn, setLoggedIn}: LoginFormProps)=> {


    function handleLogout() {
        localStorage.setItem("currentUser", "0");
        setLoggedIn(false);
    }


    return <Stack
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                    spacing="100px"
                    mb="2">
                
                <Box
                    justifyContent="center"
                    bg="aqua"
                    textAlign="center"
                    borderWidth="2px"
                    padding="4"
                    m="4"
                >
                    <p>Already logged in!</p>
                    <Button onClick={handleLogout}>Log out!</Button>

                </Box>
                
    
        </Stack>
    }
    
    


export default LogoutForm