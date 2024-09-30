import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import Button from "./Button";
import HomeCard from "./HomeCard";
import { Home } from "react-feather";

const fakeData = {
  id: "fdasfasj",
  image: "/photos/1.jpg",
  title: "Traditional house in Nooristan",
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Eligendi, magnam atque eos nobis alias odio ab veniam tempora laboriosam! Neque dolore facilis voluptatum molestias consequatur minima officia distinctio corporis repellendus corrupti, aperiam id et aliquid enim.",
};

const MyHomes = () => {
  const [homeData, setHomeData] = useState([fakeData]);

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const { data } = await axiosInstance("/homes?owner=4234123123");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHomes();
  });
  return (
    <div className="m-auto max-w-5xl py-12">
      <div className="flex flex-col justify-center">
        <div className="m-auto">
          <Button type="gradient" icon={<Home />}>
            Add new place
          </Button>
        </div>
        <div className="my-6">
          {homeData.length ? (
            homeData.map((home) => (
              <HomeCard
                key={home.id}
                title={home.title}
                description={home.description}
                image={home.image}
              />
            ))
          ) : (
            <h2 className="text-2xl font-semibold">No homes added yet!</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyHomes