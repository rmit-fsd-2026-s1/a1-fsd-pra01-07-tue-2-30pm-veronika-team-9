import {Button, ChakraProvider, HStack, Image, Link } from "@chakra-ui/react"
export default function Header() {
    return(
        <HStack h='100%'>
            <Image bg='yellow' w='40px' h='40px'/>
            <p>Venue Vendors</p>
            {/* <Link href='/login'  ml='auto' right='0'><Button bg='none' borderRadius={0}>Login</Button></Link> */}
        </HStack>
    )
}