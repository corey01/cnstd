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
import FloatingNav from "../components/Navigation/FloatingNav";

const PhysicalPage = () => {
  return (
    <>
      <FloatingNav />
      <section id="home">
        <Hero />
      </section>
      <section id="our-wedding">
        <OurWedding />
      </section>
      <Divider />
      <section id="dress-code">
        <DressCode />
      </section>
      <Divider />
      <section id="order-of-day">
        <OrderOfTheDay />
      </section>
      <Divider />
      <section id="accommodation">
        <Accommodation />
      </section>
      <Divider />
      <section id="travel">
        <Travel />
      </section>
      <Divider />
      <section id="menu">
        <Menu />
      </section>
      <Divider />
      <section id="gifts">
        <Gifts />
      </section>
      <Divider />
      <section id="faq">
        <Notes />
      </section>
      <Divider />
      <section id="rsvp-section">
        <RSVP />
      </section>
    </>
  );
};

export default PhysicalPage;
