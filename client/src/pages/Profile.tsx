import { useEffect, useState } from "react";
import Button from "../components/Button";
import ProfileSideBar from "../components/ProfileSideBar";
import { Save } from "react-feather";
import { useForm, SubmitHandler } from "react-hook-form";

interface IProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  govId?: number;
  userId?: {
    email: string;
  };
}

export default function Profile() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<IProfile>({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProfile>({
    defaultValues: profileData,
  });

  useEffect(() => {
    async function getProfile() {
      const res = await fetch("http://localhost:3000/api/v1/profile/me", {
        credentials: "include",
        mode: "cors",
      });
      const data = await res.json();
      setProfileData({ ...data.profile, email: data.profile?.userId?.email });
      reset({ ...data.profile, email: data.profile?.userId?.email });
    }
    getProfile();
  }, [reset]);

  const onSubmit: SubmitHandler<IProfile> = async (values) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/v1/profile/update", {
        method: "PUT",
        body: JSON.stringify(values),
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setEditMode(false);
        const data = await res.json();
        setProfileData({ ...data.profile, email: data.profile?.userId?.email });
        reset({ ...data.profile, email: data.profile?.userId?.email });
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div className="flex p-10 max-w-5xl m-auto">
        <ProfileSideBar image="/profile-picture.png" name={profileData.firstName || "No name"} />
        <div className="ml-16 w-full">
          <div className="flex flex-col">
            <h2 className="bg-gradient bg-clip-text text-transparent text-5xl font-semibold inline-block drop-shadow-lg">
              <span>My Profile</span>
              <span className="inline-block w-full h-1 bg-gradient"></span>
            </h2>
          </div>
          {editMode ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ul className="w-5xl">
                <li className="border-b border-gray-300 py-6">
                  <p className="font-medium">Full name</p>
                  <p className="text-sm mt-4">
                    Make sure this matches the name on your government ID.
                  </p>
                  <div className="flex flex-col md:flex-row gap-2 mt-2">
                    <label className="block w-full border-2 border-gray-400 focus-within:ring-1 ring-black rounded-lg duration-200 py-1 px-3">
                      <div className="text-gray-500 text-sm">
                        First name
                        <span className="text-red-400">*</span>
                      </div>
                      <div>
                        <input
                          type="text"
                          {...register("firstName", {
                            required: {
                              value: true,
                              message: "First name can NOT be empty",
                            },
                            pattern: {
                              value: /^[A-Z]+$/i,
                              message: "Name can NOT have symbols and numbers",
                            },
                          })}
                          className="w-full focus:outline-none bg-transparent"
                        />
                      </div>
                    </label>
                    <label className="block w-full border-2 border-gray-400 focus-within:ring-1 ring-black rounded-lg duration-200 py-1 px-3">
                      <div className="text-gray-500 text-sm">
                        Last name
                        <span className="text-red-400">*</span>
                      </div>
                      <div>
                        <input
                          type="text"
                          {...register("lastName", {
                            required: {
                              value: true,
                              message: "Last name can NOT be empty",
                            },
                            pattern: {
                              value: /^[A-Z]+$/i,
                              message: "Name can NOT have symbols and numbers",
                            },
                          })}
                          className="focus:outline-none bg-transparent"
                        />
                      </div>
                    </label>
                  </div>
                  {errors.firstName && (
                    <span className="text-sm text-red-400">
                      {errors.firstName.message}
                    </span>
                  )}
                </li>

                <li className="border-b border-gray-300 py-6">
                  <p className="font-medium">Email address</p>
                  <p className="text-sm mt-4">
                    Use an address you’ll always have access to.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <label className="block w-full border-2 border-gray-400 focus-within:ring-1 ring-black rounded-lg duration-200 py-1 px-3">
                      <div className="text-gray-500 text-sm">
                        Email address
                        <span className="text-red-400">*</span>
                      </div>
                      <div>
                        <input
                          type="text"
                          {...register("email", {
                            required: {
                              value: true,
                              message: "Email name can NOT be empty",
                            },
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Provide a valid email!",
                            },
                          })}
                          className="w-full focus:outline-none bg-transparent"
                        />
                      </div>
                    </label>
                  </div>
                  {errors.email && (
                    <span className="text-sm text-red-400">
                      {errors.email.message}
                    </span>
                  )}
                </li>

                <li className="border-b border-gray-300 py-6">
                  <p className="font-medium">Phone number</p>
                  <p className="text-sm mt-4">
                    Contact number &#x28;for confirmed guests and Airbnb to get
                    in touch &#x29;. You can add other numbers and choose how
                    they’re used..
                  </p>
                  <div className="flex gap-2 mt-2">
                    <label className="block w-full border-2 border-gray-400 focus-within:ring-1 ring-black rounded-lg duration-200 py-1 px-3">
                      <div className="text-gray-500 text-sm">Phone number</div>
                      <div>
                        <input
                          type="text"
                          {...register("phone", {
                            pattern: {
                              value: /^\+93(78|73|79|77|72|74|70)\d{7}$/,
                              message: "Provide a valid phone number!",
                            },
                          })}
                          className="w-full focus:outline-none bg-transparent"
                        />
                      </div>
                    </label>
                  </div>
                  {errors.phone && (
                    <span className="text-sm text-red-400">
                      {errors.phone.message}
                    </span>
                  )}
                </li>
                <li className="border-b border-gray-300 py-6">
                  <p className="font-medium">Government ID number</p>
                  <p className="text-sm mt-4">
                    Make sure this matches the number on your government ID.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <label className="block w-full border-2 border-gray-400 focus-within:ring-1 ring-black rounded-lg duration-200 py-1 px-3">
                      <div className="text-gray-500 text-sm">
                        Government ID number
                        <span className="text-red-400">*</span>
                      </div>
                      <div>
                        <input
                          type="number"
                          {...register("govId", {
                            required: {
                              value: true,
                              message: "Government ID number can NOT be empty",
                            },
                          })}
                          className="w-full focus:outline-none bg-transparent"
                        />
                      </div>
                    </label>
                  </div>
                  {errors.govId && (
                    <span className="text-sm text-red-400">
                      {errors.govId.message}
                    </span>
                  )}
                </li>
              </ul>
              <div className="flex item-center gap-2">
                <Button
                  type="gradient"
                  handleClick={() => {}}
                  icon={<Save />}
                  disabled={isLoading}
                  className={isLoading ? "opacity-60" : ""}
                >
                  {isLoading ? "Save..." : "Save"}
                </Button>
                <Button type="dark" handleClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <>
              <ul className="w-5xl">
                <li className="border-b border-gray-300 py-6">
                  <div className="flex justify-between">
                    <span className="font-medium text-sm">Full name</span>
                  </div>
                  <p className="text-gray-500">
                    {profileData?.firstName
                      ? `${profileData?.firstName} ${profileData?.lastName}`
                      : "No name"}
                  </p>
                </li>

                <li className="border-b border-gray-300 py-6">
                  <div className="flex justify-between">
                    <span className="font-medium text-sm">Email address</span>
                  </div>
                  <p className="text-gray-500">
                    {profileData?.email || "No email"}
                  </p>
                </li>

                <li className="border-b border-gray-300 py-6">
                  <div className="flex justify-between">
                    <span className="font-medium text-sm">Phone number</span>
                  </div>
                  <p className="text-gray-500">
                    {profileData?.phone || "No phone"}
                  </p>
                </li>

                <li className="border-b border-gray-300 py-6">
                  <div className="flex justify-between">
                    <span className="font-medium text-sm">Government ID</span>
                  </div>
                  <p className="text-gray-500">
                    {profileData?.govId || "No Government ID"}
                  </p>
                </li>
              </ul>
              <div className="flex">
                <Button type="dark" handleClick={() => setEditMode(true)}>
                  Edit
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
