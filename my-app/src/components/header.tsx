import {Button, ChakraProvider, HStack, Image, Link } from "@chakra-ui/react"
export default function Header() {
 return(
    <ChakraProvider>
            <HStack h='100%'>
                <Image bg='yellow' w='40px' h='40px'/>
                <p>Header</p>
                <Link href='/'  ml='auto'><Button bg='none' borderRadius={0}>Login</Button></Link>
            </HStack>
    </ChakraProvider>


)
}