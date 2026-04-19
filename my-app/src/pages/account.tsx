import Format from "@/components/format";
import { Button, Input, Text} from "@chakra-ui/react";
import { useState, useEffect } from "react";
interface User {
  email: string;
  password: string;
  name: string | null;
  number: string | null;
}

export default function Account() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const savedUser = localStorage.getItem("User");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);



  const saveDetails = () => {
    const updatedUser: User = {
      email,
      password,
      name,
      number,
    };

    setUser(updatedUser);
    localStorage.setItem("User", JSON.stringify(updatedUser));
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string | null>(null);
  const [number, setNumber] = useState<string | null>(null);

  if(!user){
    return <Format body='Error. Please login as a hirer'/>;
  }

  return (
    <Format body = {
    <div>
        <Text>Email</Text>
        <Input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <Text>Password</Text>
        <Input
            type="password"
            value={user.password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <Text>Name</Text>
        <Input
            type="text"
            value={user.name ?? ""}
            onChange={(e) => setName(e.target.value)}
        />

        <Input
            type="text"
            placeholder="Phone Number"
            value={user.number ?? ""}
            onChange={(e) => setNumber(e.target.value)}
        />

        <Button onClick={saveDetails}>Submit</Button>
    </div>
    }/>
  );
}
