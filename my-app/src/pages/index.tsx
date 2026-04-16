import Format from "@/components/format";
import Vendor from "@/components/index/vendor";
import Hirer from "@/components/index/hirer";
import { useEffect, useState } from "react";

export default function Home() {
    
  const [status, setStatus] = useState<string|null>(null); //null if not logged in
   useEffect(() => {
      setStatus(localStorage.getItem("status"))//Checks which account type user is logged into, if any.
    }, []);

    if(status === "vendor"){
      return(
        <Format body={
          <Vendor />
        }/>
      );
    } else if (status === "hirer"){
      return(
        <Format body={
          <Hirer />
        }/>
      );

    } else {
      return (
        <Format body={
          <div>
            <p>Main</p>                
          </div>
        }/>
      );
    }
    
}
