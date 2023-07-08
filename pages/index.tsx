import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Headline from "../components/Headline";
import Header from "../components/Header";
import AiForm from "../components/AiForm";

const Home: NextPage = () => {

  return (
    <div className="flex max-w-full mx-auto flex-col  w-full items-center justify-center py-2 min-h-screen bg-gradient-to-b from-orange-50 to-rose-200">
      <Head>
        <title>QRLoved</title>
        {/* get a favicon */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center text-center px-4 mt-15 sm:mt-20">
        <Headline/>
        <AiForm/>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
