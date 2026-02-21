import DressCode from "../components/DressCode/DressCode";
import Hero from "../components/Hero/Hero";
import Divider from "../components/Layout/Divider";
import OurWedding from "../components/OurWedding/OurWedding";
import Accommodation from "../components/Accommodation/Accommodation";
import OrderOfTheDay from "../components/OrderOfTheDay/OrderOfTheDay";
import Travel from "../components/Travel/Travel";
import Gifts from "../components/Gifts/Gifts";
import Menu from "../components/Menu/Menu";
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
      <OrderOfTheDay />
      <Divider />
      <Accommodation />
      <Divider />
      <Travel />
      <Divider />
      <Menu />
      <Divider />
      <Gifts />
      <Divider />
      <Notes />
      <Divider />
      <RSVP />
    </>
  );
};

export default PhysicalPage;
