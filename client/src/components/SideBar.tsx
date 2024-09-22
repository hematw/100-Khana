interface SideBarProps {
  image: string;
  name: string;
}

export default function SideBar({ image, name }: SideBarProps) {
  return (
    <div>
      <div className="w-60 h-60">
        <img
          src={image}
          alt={`${name}'s profile`}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
