import Format from "@/components/format";
import Vendor from "@/components/index/vendor";
import Hirer from "@/components/index/hirer";
import { useEffect, useState } from "react";

export default function Home() {
    
  
  const [vendor, setVendor] = useState(false); //Vendor status, checked after login status to ensure proper order. TRUE = VENDOR, FALSE = HIRER
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const [users, setUsers] = useState<Users[]>([]);

  //Define interface for manipulating user data
  interface Users {
      id: string,
      vendor: boolean,
      username: string,
      password: string,
  }

  //get saved users from localStorage 
    useEffect(() => {
        const savedUsers = localStorage.getItem("users");
        if (savedUsers) {
            setUsers(JSON.parse(savedUsers))
        }
    }, [])

  //check if logged in, then find vendor status
  useEffect(() => {
      
      const user = localStorage.getItem("currentUser")
      console.log(user);
      if (user != "" && user != "0" && user != null) { //make sure user is not logged out
          setLoggedIn(true);
          setCurrentUser(user);

          //loop through users to find id, then use that to get vendor status
          for (const user of users) {
            if (user.id == currentUser) {
              setVendor(user.vendor);
            }
          }

      } else {
          setLoggedIn(false);
      }
      console.log(loggedIn);
  })



  if (loggedIn) {
    if(vendor == true){
      return (
        <Format body={
          <Vendor />
        }/>
      );
    } else if (vendor == false) {
      return (
        <Format body={
          <Hirer />
        }/>
      );
    }
  } else {
    return (
      <Format body={
        <div>
        </div>
      }/>
    );
  }
    
}
