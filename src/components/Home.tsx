interface HomeProps {
  userName: string | null;
}

const Home: React.FC<HomeProps> = ({ userName }) => {
  return (
    <div>
      <h2 className="text-center text-2xl font-bold my-10">
        Welcome <span>{userName}</span>
      </h2>
    </div>
  );
};

export default Home;
