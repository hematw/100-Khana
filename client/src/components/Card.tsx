import Carousel from "./Carousel";

interface CardData {
  title: string;
  address: string;
  price: number;
  status: string;
  rating: number;
  images: string[];
  className?: string
}

const Card: React.FC<CardData> = ({
  title,
  address,
  price,
  status,
  rating,
  images,
  className
}) => {
  return (
    <div className={`flex items-center justify-center flex-col w-full rounded-lg ${className}`}>
      <div className="relative">
        <Carousel images={images} />
        <div className="">
          <div className="absolute top-2 left-0 px-2 flex justify-between w-full">
            <span className="bg-gray-100 px-2 py-1 rounded-3xl shadow-lg font-semibold">
              {status}
            </span>
            <button className="rounded-full h-8 w-8 flex items-center justify-center">
              <img src="/icons/heart.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="text-sm flex items-center justify-center">
            <span className="w-5 h-5">
              <img src="/icons/star.svg" alt="" />
            </span>
            <span>{rating}</span>
          </div>
        </div>
        <p className="text-sm">{address}</p>
        <p className="text-sm">
          <span className="font-semibold">{price} </span>
          <span className="text-gray-600">AFN/month</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
