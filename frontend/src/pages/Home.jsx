import Header from '../components/Header';
import LandingPage from '../components/LandingPage';
import Why from '../components/Why';
import Footer from '../components/footer';
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
