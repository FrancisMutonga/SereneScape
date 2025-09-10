import AboutUs from "../components/about";
import CTASection from "../components/cta";
import HeroSection from "../components/hero";
import Reviews from "../components/reviews";
import Stats from "../components/stats";
import WhyUs from "../components/why";

export default function Home() {
  return (
   <div className="flex flex-col items-center max-w-6xl gap-8 mt-20 mx-auto">
       <HeroSection/>
       <AboutUs/>
      <Stats/>
      <WhyUs/>
      <Reviews/>
      <CTASection/>
    </div>
  );
}
