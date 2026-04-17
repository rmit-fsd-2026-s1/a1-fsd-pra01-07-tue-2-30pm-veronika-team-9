import Format from "@/components/format";
import { useEffect, useState } from "react";

interface Venue {
  id: number;
  title: string;
  description: string;
  owner: string;
}

export default function Vendor() {

    const [status, setStatus] = useState<string|null>(null); //null if not logged in
    const [venues, setVenues] = useState<Venue[] | null>([]);

 useEffect(() => {
    setStatus(localStorage.getItem("status"))
    const savedVenues = localStorage.getItem("venues");
    if (savedVenues) {
      setVenues(JSON.parse(savedVenues));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("venues", JSON.stringify(venues));
  }, [venues]); //saves venue list

    return (
      <div>
        <p>Vendor Placeholder</p>
        {/* List applicants including hire history */}
        {/* Select applicants */}
        {/* Comment on applicants */}
        {/* Approve applicants and confirm booking (does nothing) */}
        

      </div>
    );
}
