import {Box, HStack, Link } from "@chakra-ui/react"
export default function Header() {
    return(
        <HStack h='100%'>
            <Box bg='gray.800' color='white' w='40px' h='40px'fontSize={29}>VV</Box>
            <p>Venue Vendors</p>
        </HStack>
    )
}