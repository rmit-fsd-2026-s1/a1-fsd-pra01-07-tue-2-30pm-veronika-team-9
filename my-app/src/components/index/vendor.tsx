import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Divider,
  Heading,
  Flex,
  Center,
  FormErrorMessage,
  FormHelperText,
  Button,
  Stack,
  Select,
  Box,
  Input,
  List,
  UnorderedList,
  ListItem,
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
            id: string,
            venue: string,
            name: string,
            guests: number,
            starttime: string,
            endtime: string,
            hirer: string,
        }

        interface Booking {
            id: string,
            venue: string,
            name: string,
            guests: number,
            starttime: string,
            endtime: string,
            hirer: string,
            comment: string,
        }

export default function Vendor() {

    //user update states
    const [users, setUsers] = useState<Users[]>([]) //defines array of users
    const [loaded, setLoaded] = useState(false);

    const [applications, setApplications] = useState<Application[]>([]) //defines array of applications
    const [appLoaded, setAppLoaded] = useState(false);

    //state for selected applicant
    const [selectedApplicant, setSelectedApplicant] = useState(-1); //-1 as index starts at 0

    //states for accepted applications
    const [bookings, setBookings] = useState<Booking[]>([])
    const [newBooking, setNewBooking] = useState({id: 0, comment: ""})
    const [bookingLoaded, setBookingLoaded] = useState(false);

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

    //get array of all bookings
    useEffect(() => {
    const bookingsaved = localStorage.getItem("bookings");
    if (bookingsaved) setBookings(JSON.parse(bookingsaved));
        setBookingLoaded(true);
    }, []);

    //save bookings to local storage on change
    useEffect(() => {
        if (bookingLoaded) {
            localStorage.setItem("bookings", JSON.stringify(bookings));
        }
    }, [bookings, bookingLoaded]); //links useeffect to both booking array and load state for updating

    //handle when selected applicant changes
    function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
      setSelectedApplicant(Number(e.target.value));
    }

    //handle when booking changes
    function handleBookingChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target;
      setNewBooking(prev => ({ ...prev, [name]: value}))
    }

    const toast = useToast();
    const acceptApplicant = (e: React.SubmitEvent<HTMLFormElement>) => { //waits for form submission
        e.preventDefault();
        console.log('triggered');


        if (newBooking.comment.trim()) {
            setBookings([
                ...bookings,
                { //copy all from application into booking & add comment
                    id: applications[selectedApplicant].id, 
                    venue: applications[selectedApplicant].venue,
                    name: applications[selectedApplicant].name,
                    guests: applications[selectedApplicant].guests,
                    starttime: applications[selectedApplicant].starttime,
                    endtime: applications[selectedApplicant].endtime,
                    hirer: applications[selectedApplicant].hirer,
                    comment: newBooking.comment,
                },
            ]);
        setNewBooking({id: -1, comment: ""});

        toast({description: "Event booked!"});
        }
    };

    return (
      <Center height="100vh">
              <Flex>
                  <Stack p="5" m="4" spacing="7" alignItems="center" justifyContent="center">
                      <Box p="20px" m="10px" bg="lightgrey" borderWidth="3px">
                          <Heading size="md">Applications List</Heading>
                          <UnorderedList>
                            {applications.map((application, index) => ( 
                              <ListItem key={application.id}>
                                <p>{index+1}: {application.name}, {application.venue}, {application.starttime} - {application.endtime}, Guests: {application.guests} || {users.filter((users) => users.id == application.hirer).map((users) => (<span>{users.name}, {users.reputation} Stars</span>))}
                                </p>
                              </ListItem>
                            ))}
                          </UnorderedList>
                      </Box>


                  </Stack>

                  <Stack p="5" m="4" spacing="7" alignItems="center" justifyContent="center">
                      <Box p="20px" m="10px" bg="lightgrey" borderWidth="3px">
                          <Stack p="5" m="4" spacing="7" alignItems="center" justifyContent="center">
                            <Heading size="md">Select Applicant</Heading>
                            <Select value={selectedApplicant} onChange={handleSelect} placeholder="Applicant Indexes">
                              {applications.map((application, index) => ( 
                                <option value={index}>{index+1}</option>
                              ))}
                            </Select>
                          </Stack>
                      </Box>
                      
                      {selectedApplicant != -1 && //only render if applicant selected
                      <Box p="20px" m="10px" bg="lightgrey" borderWidth="3px">
                          
                          <form onSubmit={acceptApplicant}>
                              <Stack p="5" m="4" spacing="7" alignItems="center" justifyContent="center">
                                <FormLabel>Selected applicant: {selectedApplicant+1}</FormLabel>
                                <FormControl isRequired>
                                  <Input name="comment" value={newBooking.comment} onChange={handleBookingChange} placeholder="Comment"></Input>
                                </FormControl>
                                <Button type="submit" bg="aqua" borderRadius="3px">Accept Booking!</Button> 
                              </Stack>
                          </form>
                          
                      </Box>
                      }
                  </Stack>
              </Flex>
      
      </Center>
    );
}
