import { Button, ButtonGroup, ChakraProvider, Grid, GridItem, Link, VStack } from "@chakra-ui/react";

export default function Nav() {

 return(
    <ChakraProvider>
        <aside>
            <Link><Button bg='none' w='100%' borderRadius={0}>Home</Button></Link>
            <Link><Button bg='none' w='100%' borderRadius={0}>Venues</Button></Link>
            <Link><Button bg='none' w='100%' borderRadius={0}>MyAccount</Button></Link>
        </aside>
    </ChakraProvider>

 )
}