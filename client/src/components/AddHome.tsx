import Input from "./Input";
import { useForm, SubmitHandler } from "react-hook-form";
import InputGroup from "./InputGroup";
import { TbAirConditioning } from "react-icons/tb";
import { PiElevatorLight } from "react-icons/pi";
import { FaCarSide } from "react-icons/fa";
import { IoTvOutline } from "react-icons/io5";
import { FaSwimmingPool, FaWifi } from "react-icons/fa";
import { FaBottleWater } from "react-icons/fa6";
import GuardIcon from "./GuardIcon";

const AddHome = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <div className="p-6">
      <div className="max-w-5xl m-auto">
        <InputGroup
          label="Title"
          text="Title for your place, should be short and catchy as advertisement."
        >
          <Input
            name="title"
            label="Title"
            register={register}
            validation={{
              required: true,
            }}
          />
        </InputGroup>
        <InputGroup
          label="Address"
          text="Address of your place, should be clear and easy to understand."
        >
          <Input
            name="address"
            label="Address"
            register={register}
            validation={{
              required: true,
            }}
          />
        </InputGroup>
        <InputGroup label="Description" text="Description about your place.">
          <div className={`flex flex-col my-2 `}>
            <div className="block w-full border-2 border-gray-400 focus-within:ring-1 ring-black rounded-lg duration-200 py-1 px-3">
              <textarea
              placeholder="ex: beautiful house with big pool..."
                {...register("desc", {})}
                className="w-full h-24 focus:outline-none bg-transparent"
              />
            </div>
            {/* {errors.desc && <p className="error">{errors.desc.message}</p>} */}
          </div>
        </InputGroup>
        <InputGroup
          label="Facilities"
          text="Choose your place's facilities and easiness. click for check"
        >
          <div className="flex gap-4 my-2 flex-wrap ">
            <div className="border rounded-md has-[:checked]:bg-red-200 shadow-lg flex  flex-1">
              <input
                type="checkbox"
                id="tv"
                {...register("tv")}
                className="hidden"
              />
              <label
                htmlFor="tv"
                className="flex items-center justify-center w-full gap-2 p-2 text-nowrap cursor-pointer"
              >
                <span>
                  <IoTvOutline />
                </span>
                <span>TV</span>
              </label>
            </div>
            <div className="border rounded-md has-[:checked]:bg-red-200 shadow-lg flex flex-1">
              <input
                type="checkbox"
                id="ac"
                {...register("ac")}
                className="hidden"
              />
              <label
                htmlFor="ac"
                className="flex items-center justify-center w-full gap-2 p-2 text-nowrap cursor-pointer"
              >
                <span>
                  <TbAirConditioning />
                </span>
                <span>AC</span>
              </label>
            </div>
            <div className="border rounded-md has-[:checked]:bg-red-200 shadow-lg flex flex-1">
              <input
                type="checkbox"
                id="wifi"
                {...register("wifi")}
                className="hidden"
              />
              <label
                htmlFor="wifi"
                className="flex items-center justify-center w-full gap-2 p-2 text-nowrap cursor-pointer"
              >
                <span>
                  <FaWifi />
                </span>
                <span>WiFi</span>
              </label>
            </div>
            <div className="border rounded-md has-[:checked]:bg-red-200 shadow-lg flex flex-1">
              <input
                type="checkbox"
                id="water"
                {...register("water")}
                className="hidden"
              />
              <label
                htmlFor="water"
                className="flex items-center justify-center w-full gap-2 p-2 text-nowrap cursor-pointer"
              >
                <span>
                  <FaBottleWater />
                </span>
                <span>Drinking water</span>
              </label>
            </div>
            <div className="border rounded-md has-[:checked]:bg-red-200 shadow-lg flex flex-1">
              <input
                type="checkbox"
                id="parking"
                {...register("parking")}
                className="hidden"
              />
              <label
                htmlFor="parking"
                className="flex items-center justify-center w-full gap-2 p-2 text-nowrap cursor-pointer"
              >
                <span>
                  <FaCarSide />
                </span>
                <span>Parking</span>
              </label>
            </div>
            <div className="border rounded-md has-[:checked]:bg-red-200 shadow-lg flex flex-1">
              <input
                type="checkbox"
                id="pool"
                {...register("pool")}
                className="hidden"
              />
              <label
                htmlFor="pool"
                className="flex items-center justify-center w-full gap-2 p-2 text-nowrap cursor-pointer"
              >
                <span>
                  <FaSwimmingPool />
                </span>
                <span>Pool</span>
              </label>
            </div>
            <div className="border rounded-md has-[:checked]:bg-red-200 shadow-lg flex flex-1">
              <input
                type="checkbox"
                id="elevator"
                {...register("elevator")}
                className="hidden"
              />
              <label
                htmlFor="elevator"
                className="flex items-center justify-center w-full gap-2 p-2 text-nowrap cursor-pointer"
              >
                <span>
                  <PiElevatorLight />
                </span>
                <span>Elevator</span>
              </label>
            </div>
            <div className="border rounded-md has-[:checked]:bg-red-200 shadow-lg flex flex-1">
              <input
                type="checkbox"
                id="guard"
                {...register("guard")}
                className="hidden"
              />
              <label
                htmlFor="guard"
                className="flex items-center justify-center w-full gap-2 p-2 text-nowrap cursor-pointer"
              >
                <span>
                  <GuardIcon />
                </span>
                <span>Guard</span>
              </label>
            </div>
          </div>
        </InputGroup>
      </div>
    </div>
  );
};

export default AddHome;
