import Format from "@/components/format";
import { Button, Link } from "@chakra-ui/react";
import LoginForm from "@/components/LoginForm";
import LogoutForm from "@/components/LogoutForm";

import { useEffect, useState } from "react";


//Define interface for storing users
interface Users {
    id: number,
    vendor: boolean,
    username: string,
    password: string,
}

export default function Login() {

    const [loggedIn, setLoggedIn] = useState(false);

    //check if logged in
    useEffect(() => {
        
        const user = localStorage.getItem("currentUser")
        console.log(user);
        if (user != "" && user != "0" && user != null) { //make sure user is not logged out
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
        console.log(loggedIn);
    })

    return (
      <Format body={
        <div>

        {loggedIn ? <LogoutForm loggedIn={loggedIn} setLoggedIn={setLoggedIn}/> : <LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}



        </div>
        }/>
    );
}
