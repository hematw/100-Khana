import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import ProfileImage from "../components/ProfileImage";
import { Save } from "react-feather";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosInstance from "../axios";
import Input from "../components/Input";

interface IProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  govId?: number;
  profileImage?: string;
  userId?: {
    email: string;
  };
}

export default function Profile() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<IProfile>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Add type for fileInputRef
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
      const { data } = await axiosInstance("/profile/me", {
        withCredentials: true,
      });
      console.log(data);
      setProfileData({ ...data.profile, email: data.profile?.userId?.email });
      reset({ ...data.profile, email: data.profile?.userId?.email });
    }
    getProfile();
  }, [reset]);

  const onSubmit: SubmitHandler<IProfile> = async (values) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstName", values.firstName || "");
      formData.append("lastName", values.lastName || "");
      formData.append("email", values.email || "");
      formData.append("phone", values.phone || "");
      formData.append("govId", values.govId?.toString() || "");

      // Append the file
      if (fileInputRef.current?.files?.[0]) {
        formData.append("profileImage", fileInputRef.current.files[0]);
        console.log(fileInputRef.current.files[0]);
      }
      const { status, data } = await axiosInstance.patch(
        "/profile/update",
        formData,
        {
          withCredentials: true,
        }
      );
      if (status == 200) {
        setProfileData({ ...data, email: data?.userId?.email });
        reset({ ...data.profile, email: data?.userId?.email });
        setEditMode(false); // Exit edit mode on success
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false); // Ensure loading state is turned off in case of an error
    }
  };

  return (
    <section>
      <div className="flex p-10 max-w-5xl m-auto">
        <div className="ml-16 w-full">
          <div className="flex flex-col">
            <h2 className="bg-gradient bg-clip-text text-transparent text-5xl font-semibold inline-block drop-shadow-lg">
              <span>My Profile</span>
              <span className="inline-block w-full h-1 bg-gradient"></span>
            </h2>
          </div>
          {editMode ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <div className="flex gap-4">
                <ProfileImage
                  image={profileData.profileImage || "/profile-picture.png"}
                  username={profileData.firstName || "No name"}
                  isOnEdit={editMode}
                  fileInputRef={fileInputRef} // Attach the ref for file upload
                />
                {/* <input
                  type="file"
                  name="profile_image"
                  ref={fileInputRef} // Attach the ref for file upload
                  accept="image/*"
                /> */}
                <div>
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
                                  message:
                                    "Name can NOT have symbols and numbers",
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
                                  message:
                                    "Name can NOT have symbols and numbers",
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
                        Contact number &#x28;for confirmed guests and Airbnb to
                        get in touch &#x29;. You can add other numbers and
                        choose how they’re used..
                      </p>
                      <div className="flex gap-2 mt-2">
                        <label className="block w-full border-2 border-gray-400 focus-within:ring-1 ring-black rounded-lg duration-200 py-1 px-3">
                          <div className="text-gray-500 text-sm">
                            Phone number
                          </div>
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
                                  message:
                                    "Government ID number can NOT be empty",
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
                      onClick={() => {}}
                      icon={<Save />}
                      disabled={isLoading}
                      className={isLoading ? "opacity-60" : ""}
                    >
                      {isLoading ? "Save..." : "Save"}
                    </Button>
                    <Button type="dark" onClick={() => setEditMode(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="flex gap-6">
              <ProfileImage
                image="/profile-picture.png"
                username={profileData.firstName || "No name"}
                isOnEdit={editMode}
              />

              <div className="w-full">
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
                  <Button type="dark" onClick={() => setEditMode(true)}>
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
