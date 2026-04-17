import Format from "@/components/format";
import { Button, Link } from "@chakra-ui/react";

export default function Login() {
    
    return (
      <Format body={
        <div>
        <p>Login Page</p>  
        <Link href='/' onClick={() => {
            localStorage.setItem("status", "vendor");
        }}>
            <Button>Vendor</Button>
        </Link>    
        <Link href='/' onClick={() => {
            localStorage.setItem("status", "hirer");
        }}>
            <Button>Hirer</Button>
        </Link>    
        </div>

        }/>
    );
}
