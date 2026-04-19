import { Grid, GridItem } from "@chakra-ui/react/grid";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Nav from "@/components/nav";

type page = {
    body:React.ReactNode;
};

export default function Format({body}:page) {

  return (
    <ChakraProvider>
      <Grid
    templateAreas={`"header header"
                    "nav main"
                    "nav footer"`} //Determines the structure of the grid. If I want the footer to not be next to the nav bar, I can replace 'nav' with 'footer'
    gridTemplateRows={'50px 1fr 30px'} //Row heights. fr represents fractions, being the remainder after the other pixels are determined. If there are multiple frs, like a fraction, it gets allocated equally
    gridTemplateColumns={'100px 1fr'} //Column widths
    minH='200vh'//Vh are visible pixels. 100 fits to screen. 'h' can be replaced by 'minH' to represent the minimum height, which can be increased when suitable
    gap='1'
    color='blackAlpha.700' //Does not have full opacity (is at 70%). It looks nice, likely temporary
    fontWeight='bold'
      >
    <GridItem pl='2' bg='gray.200' area={'header'} className="grid-header" > {/*pl is padding, bg is background */}
      <Header />
    </GridItem>
    <GridItem pl='0' bg='gray.100' area={'nav'} className="grid-nav">
      <Nav />
    </GridItem>
    <GridItem pl='2' bg='gray.800' area={'main'}>
        {body} {/*Varies based on page*/}
    </GridItem>
    <GridItem pl='2' bg='blue.300' area={'footer'}>
      <Footer />

    </GridItem>
  </Grid>
</ChakraProvider>

  );
}
