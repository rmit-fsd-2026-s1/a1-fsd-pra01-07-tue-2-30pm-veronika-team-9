import Format from "@/components/format";
import { useState, useEffect } from "react";

import {
  FormControl,
  FormLabel,
  Divider,
  Flex,
  Center,
  FormErrorMessage,
  FormHelperText,
  Button,
  Stack,
  Select,
  Box,
  Input,
  InputLeftElement,
  useToast,
} from '@chakra-ui/react'

//Define interface for storing users
    interface Users {
        id: string,
        vendor: boolean,
        username: string,
        password: string,
        name: string,
        phonenum: string,
        reputation: number,
    }

//Interface for venues
    interface Venue {
        id: string,
        name: string,
        location: string,
        capacity: number,
        rating: number,
    }

//Interface for applications

    interface Application {
        venue: string,
        name: string,
        guests: number,
        starttime: string,
        endtime: string,
        hirer: string,
    }

    const PreconfigVenues: Venue[] = [ //premade list of venues
        { id: "codecamp", name: "Codecamp Town Hall", location: "Sydney", capacity: 250, rating: 3 },
        { id: "library", name: "RMIT Swanston Library", location: "Melbourne", capacity: 1250, rating: 2 },
        { id: "party", name: "Melbourne Party Center", location: "Melbourne", capacity: 3000, rating: 5 },
        ];

export default function Hirer() {

    //user update states
    const [users, setUsers] = useState<Users[]>([]) //defines array of users
    const [userUpdate, setUserUpdate] = useState({ name: "", phonenum: ""});
    const [loaded, setLoaded] = useState(false); //waits for user array
    const [name, setName] = useState("");
    const [reputation, setReputation] = useState(0);

    //toast setup
    const toast = useToast();

    //venue states
    const [venue, setVenue] = useState("");

    const [venueInfo, setVenueInfo] = useState({ name: "", location: "", capacity: 0, rating: 0})

    //application states
    const [applying, setApplying] = useState(false);

    const [applications, setApplications] = useState<Application[]>([]) //defines array of applications
    const [newApplication, setNewApplication] = useState({venue: "", name: "", guest: 0, starttime: "", endtime: "", hirer: ""})
    const [appLoaded, setAppLoaded] = useState(false); //waits for applic. array

    useEffect(() => {
        for (const curVenue of PreconfigVenues) {
            if (venue == curVenue.id) {
                setVenueInfo({name: curVenue.name, location: curVenue.location, capacity: curVenue.capacity, rating: curVenue.rating})
            }
        }
    }, [venue]);
    
    
    //get array of all users
    useEffect(() => {
    const saved = localStorage.getItem("users");
    if (saved) setUsers(JSON.parse(saved));
        setLoaded(true);
    }, []);

    //get array of all applications
    useEffect(() => {
    const appsaved = localStorage.getItem("applications");
    if (appsaved) setApplications(JSON.parse(appsaved));
        setAppLoaded(true);
    }, []);

    //save users to local storage on change
    useEffect(() => {
        if (loaded) {
            localStorage.setItem("users", JSON.stringify(users));
        }
    }, [users, loaded]); //links useeffect to both users array and load state for updating

    //save applications to local storage on change
    useEffect(() => {
        if (appLoaded) {
            localStorage.setItem("applications", JSON.stringify(applications));
        }
    }, [applications, appLoaded]); //links useeffect to both users array and load state for updating

    useEffect(() => { //update name&reputation shown on page
        for (const user of users) {
        if (user.id == localStorage.getItem("currentUser")) {
            setName(user.name);
            setReputation(user.reputation);
        }
    }
    }, [users]);


    const updateHirerDetails = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("triggered");
        const updatedUsers = users.map(user => {
            if (user.id == localStorage.getItem("currentUser")) {
            return {
                ...user,
                name: userUpdate.name.trim(),
                phonenum: userUpdate.phonenum.trim(),
            };
            }
            return user;
        });
        setUsers(updatedUsers); // useeffect to save to localStorage
        setName(userUpdate.name.trim());
        setUserUpdate({name: "", phonenum: ""});

        toast({description: "User details updated!"});
        
    }
    

    //handle when a form field is updated
    function handleUpdate(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setUserUpdate(prev => ({ ...prev, [name]: value}))
    }

    //handle change of venue
    function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const { value } = e.target;
        console.log(value);
        setVenue(value);
    }

    //handle opening application form
    function startApplication() {
        setApplying(true);
    }

    //handle creating an application
    const handleApplication = (e: React.SubmitEvent<HTMLFormElement>) => { //waits for form submission
        e.preventDefault();
        console.log('triggered');

        const hirerId = "" + localStorage.getItem("currentUser");

        if (newApplication.name.trim()) {
            setApplications([
                ...applications,
                {
                    venue: venue,
                    name: newApplication.name.trim(),
                    guests: newApplication.guest,
                    starttime: newApplication.starttime.trim(),
                    endtime: newApplication.endtime.trim(),
                    hirer: hirerId,
                },
            ]);
        setNewApplication({venue: "", name: "", guest: 0, starttime: "", endtime: "", hirer: ""});

        toast({description: "Application sent!"});
        setApplying(false);
        setVenue(""); //hide application boxes
        }
    };

    //handle when a form field is updated
    function handleApplicationChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setNewApplication(prev => ({ ...prev, [name]: value}))
    }


    return(
        <Center height="100vh">
        <Flex>
            <Stack p="5" m="4" spacing="7" alignItems="center" justifyContent="center">
                <Box p="20px" m="10px" bg="lightgrey" borderWidth="3px">
                    <p>Logged in as: {name ? name : "No name provided yet."}</p>

                </Box>

                <Box p="20px" m="10px" bg="lightgrey" borderWidth="3px">
                    <p>Reputation: {reputation} stars</p>

                </Box>

                <Box p="20px" m="10px" width="15rem" bg="lightgrey" borderWidth="3px" textAlign="center" justifyContent="center" display="flex">
                    <form onSubmit={updateHirerDetails}>

                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.500"
                            boxShadow="2x1"
                        >

                        <FormLabel>Update Hirer Details</FormLabel>
                        <FormControl>
                            <Input name="name" type="text" placeholder="Full Name" value={userUpdate.name} onChange={handleUpdate}></Input>
                        </FormControl>
                        
                        <FormControl>
                            <Input name="phonenum" type="number" placeholder="Phone Number" value={userUpdate.phonenum} onChange={handleUpdate}></Input>
                        </FormControl>

                        <Button type="submit" bg="aqua">Update Info</Button>
                        
                        </Stack>
                    </form>

                </Box>
            </Stack>

            <Stack p="5" m="4" spacing="7" alignItems="center" justifyContent="center">
                <Box p="20px" m="10px" bg="lightgrey" borderWidth="3px" textAlign="center" justifyContent="center" display="flex">
                    <Select placeholder="Select Venue Candidate!" onChange={handleSelect}>
                        <option value="codecamp">Codecamp Town Hall</option>
                        <option value="library">RMIT Swanston Library</option>
                        <option value="party">Melbourne Party Center</option>
                    </Select>
                </Box>

                
                <Box p="20px" m="10px" bg="lightgrey" borderWidth="3px" textAlign="center" justifyContent="center" display="flex">
                    {venue &&  //dont render if venue not selected
                    <Stack p="5" m="4" spacing="7" alignItems="center" justifyContent="center">
                        <p><strong>Venue Name:</strong> {venueInfo.name}</p>
                        <p><strong>Location:</strong> {venueInfo.location}</p>
                        <p><strong>Capacity:</strong> {venueInfo.capacity}</p>
                        <p><strong>Rating:</strong> {venueInfo.rating}</p>
                        <Select placeholder="Venue Preference">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Select>
                        {!applying && <Button bg="aqua" onClick={startApplication}>Apply!</Button>}
                    </Stack>
                    }

                    {applying && //dont render if not applying
                    <Stack p="5" m="4" spacing="7" alignItems="center" justifyContent="center">
                        <form onSubmit={handleApplication}>
                            <Stack p="5" m="4" spacing="7" alignItems="center" justifyContent="center">
                                <FormLabel>Make Venue Application</FormLabel>
                                <FormControl isRequired>
                                    <Input name="name" type="text" placeholder="Event Name" value={newApplication.name} onChange={handleApplicationChange}></Input>
                                </FormControl>

                                <FormControl isRequired>
                                    <Input name="guest" type="number" placeholder="Expected Guests" value={newApplication.guest} onChange={handleApplicationChange}></Input>
                                </FormControl>

                                <FormLabel>Start Time</FormLabel>
                                <FormControl isRequired>
                                    <Input name="starttime" type="datetime-local" placeholder="Event Time" value={newApplication.starttime} onChange={handleApplicationChange}></Input>
                                </FormControl>

                                <FormLabel>End Time</FormLabel>
                                
                                <FormControl isRequired>
                                    <Input name="endtime" type="datetime-local" placeholder="Event Time" value={newApplication.endtime} onChange={handleApplicationChange}></Input>
                                </FormControl>

                                <Button type="submit" bg="aqua" borderWidth="2px">Submit Application!</Button>
                            </Stack>
                        </form>
                    </Stack>
                
                    
                    }
                
                
                    

                </Box>
                

                


            </Stack>
        </Flex>

        </Center>
    );

}
