import { Button, ChakraProvider, Link } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function Nav() {
    const [status, setStatus] = useState<string|null>(null); //null if not logged in

    useEffect(() => {
        setStatus(localStorage.getItem("status"))//Checks which account type user is logged into, if any.
    }, []);
    
    if(status === "vendor"){
        return(
            <ChakraProvider>
                <aside>
                    <Link href='/'><Button bg='none' w='100%' borderRadius={0}>Home</Button></Link>
                    <Link href='/login'><Button bg='none' w='100%' borderRadius={0}>Sign out</Button></Link>
                </aside>
            </ChakraProvider>
        );
    } else if (status === "hirer"){
        return(
            <ChakraProvider>
                <aside>
                    <Link href='/'><Button bg='none' w='100%' borderRadius={0}>Home</Button></Link>
                    <Link href='/login'><Button bg='none' w='100%' borderRadius={0}>Sign out</Button></Link>
                    <Link href='/account'><Button bg='none' w='100%' borderRadius={0}>MyAccount</Button></Link>
                </aside>
            </ChakraProvider>
        )
    } else {
        return(
            <ChakraProvider>
                <aside>
                    <Link href='/'><Button bg='none' w='100%' borderRadius={0}>Home</Button></Link>
                    <Link href='/login'><Button bg='none' w='100%' borderRadius={0}>Login</Button></Link>
                    <Link href='/signup'><Button bg='none' w='100%' borderRadius={0}>Sign up</Button></Link>
                </aside>
            </ChakraProvider>
        )
    }
}