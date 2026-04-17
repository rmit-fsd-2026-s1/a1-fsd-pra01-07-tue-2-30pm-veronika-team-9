import Format from "@/components/format";
import { HStack } from "@chakra-ui/react";

export default function Account() {
    return(
        <Format body={
            <div>{/*exclusive to hirer*/}
              <p>Account settings</p> 
              <HStack></HStack>
              
            </div>
        }/>
    );
}
