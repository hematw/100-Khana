import Card from "../components/Card";

const images = [
  "/photos/1.jpg",
  "/photos/2.jpg",
  "/photos/3.jpg",
  "/photos/4.jpg",
  "/photos/5.jpg",
];

const info = {
  title: "Luxury Apartment",
  address: "23 st, 12 district, Kabul",
  price: 5000,
  status: "Sell",
  rating: 4.3,
  images,
};

export default function Main() {
  return (
    <section className="max-w-[1480px] min-h-screen mx-auto my-28 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 place-items-center">
        {Array.from("abcdefgh").map((_, index) => (
          <Card {...info} className="min-w-[270px]" key={index} />
        ))}
      </div>
    </section>
  );
}
