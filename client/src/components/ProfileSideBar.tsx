import { Camera, Upload } from "react-feather";

interface SideBarProps {
  image: string;
  name: string;
}

export default function ProfileSideBar({ image, name }: SideBarProps) {
  return (
    <div>
      <div className="w-60 h-60 relative">
        <img
          src={image}
          alt={`${name}'s profile`}
          className="w-full h-full object-cover rounded-lg"
        />
        <form encType="multipart/form-data">
          <label className="inline-flex justify-center items-center bg-black/50 text-white absolute bottom-0 right-0 w-10 h-10 rounded-ss-2xl rounded-ee-lg cursor-pointer">
            <span>
              <Upload />
            </span>
            <input
              type="file"
              accept=".png, .jpg, .jpeg, .gif"
              className="hidden"
            />
          </label>
          <label className="inline-flex justify-center items-center bg-black/50 text-white absolute bottom-0 left-0 w-10 h-10 rounded-se-2xl rounded-es-lg cursor-pointer">
            <span>
              <Camera />
            </span>
            <input
              type="file"
              accept=".png, .jpg, .jpeg, .gif"
              capture="user"
              className="hidden"
            />
          </label>
        </form>
      </div>
    </div>
  );
}
