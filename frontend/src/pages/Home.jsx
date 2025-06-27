import Header from '../components/Header';
import LandingPage from '../components/LandingHero';
import Why from '../components/LandingWhy';
import Footer from '../components/Footer'
export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <Header />
      <LandingPage></LandingPage>
      <Why></Why>
      <Footer></Footer>
    </div>
  );
}
