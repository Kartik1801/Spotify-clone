import GradientLayout from "../components/GradientLayout";
import prisma from "../lib/prisma";

const Home = ({artist}) => {
  return <GradientLayout roundImage={true} image={"https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0"} subtitle={"profile"} color={"red"} title={"KD"} description="15 Followers 3 Playlists">
    <div> 
      home
    </div>
  </GradientLayout>;
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});
  return {
    props: {
      artists
    },
  }
}

export default Home;
