import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import useHttp from "../utils/hooks/http-hook";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { AuthContext } from "../utils/context-API";
import Loader from "./Loader";

const EditProfile = ({ data }) => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const navigate = useNavigate();
  const { userId, token } = useContext(AuthContext); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNumber: data.mobileNumber,
      email: data.email,
      level: data.level,
    },
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(() => {
    if (data.profile_image) {
      const normalizedPath = data.profile_image.replace(/\\/g, '/');
      return `${import.meta.env.VITE_ASSETS_URL}/${normalizedPath}`;
    }
    return "https://th.bing.com/th?id=OIP.JBpgUJhTt8cI2V05-Uf53AHaG1"; 
  });

  useEffect(() => {
    if (data.profile_image) {
      const normalizedPath = data.profile_image.replace(/\\/g, '/');
      setImagePreview(`${import.meta.env.VITE_ASSETS_URL}/${normalizedPath}`);
    }
  }, [data.profile_image]);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      const originalPath = data.profile_image ? data.profile_image.replace(/\\/g, '/') : '';
      setImagePreview(originalPath ? `${import.meta.env.VITE_ASSETS_URL}/${originalPath}` : "https://th.bing.com/th?id=OIP.JBpgUJhTt8cI2V05-Uf53AHaG1");
    }
  };

  const onSubmit = async (formData) => {
    
    if (!userId || !token) {
      toast.info("Please login to update your profile!");
      return;
    }

    const requestData = new FormData();
    requestData.append("firstName", formData.firstName);
    requestData.append("lastName", formData.lastName);
    requestData.append("email", formData.email);
    requestData.append("level", formData.level);
    requestData.append("mobileNumber", formData.mobileNumber);
    if (profileImage) requestData.append("image", profileImage);

    try {
      await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/me/${userId}`,
        "PATCH",
        requestData,
        {
          
          'Authorization': 'Bearer ' + token 
        }
      );
      navigate("/questions");
      toast.success("Profile Updated!");
    } catch (e) {
    
      toast.error(e.message || "Failed to update profile. Please try again.");
      console.error("Edit profile submission error:", e);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { onClose: () => clearError() });
    }
  }, [error, clearError]);

  return (
    <div className="px-6 py-12 bg-gray-50 rounded-2xl shadow-md text-gray-800">
      {isLoading && <Loader />}
      <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Profile Image */}
        <div className="mb-6">
          <input
            type="file"
            accept="image/*"
            id="profileImagePicker"
            onChange={handleImageChange}
            className="hidden"
          />
          <label htmlFor="profileImagePicker" className="cursor-pointer inline-block">
            <div className="w-28 h-28 border-2 border-gray-300 rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={imagePreview} 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center text-gray-500 mt-2 text-sm">Upload Image</div>
          </label>
        </div>

        <button
          type="submit"
          className="w-[310px] bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;