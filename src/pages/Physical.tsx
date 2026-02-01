import DressCode from "../components/DressCode/DressCode";
import Hero from "../components/Hero/Hero";
import Divider from "../components/Layout/Divider";
import OurWedding from "../components/OurWedding/OurWedding";
import Accommodation from "../components/Accommodation/Accommodation";
import Notes from "../components/Notes/Notes";
import RSVP from "../components/RSVP/RSVP";

const PhysicalPage = () => {
  return (
    <>
      <Hero />
      <OurWedding />
      <Divider />
      <DressCode />
      <Divider />
      <Accommodation />
      <Divider />
      <Notes />
      <Divider />
      <RSVP />
    </>
  );
};

export default PhysicalPage;
