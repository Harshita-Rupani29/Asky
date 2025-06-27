import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useHttp from "../utils/hooks/http-hook";
import { useForm } from "react-hook-form";
import { AuthContext } from "../utils/context-API";
import { toast } from "react-toastify";
import Footer from "../components/footer";
import Header from "../components/Header";
import Loader from "../components/Loader";

const AskQuestion = () => {
  const subjects = [
    "collaborate",
    "Advice",
    "Programming",
    "Tech",
    "Chemistry",
    "Physics",
    "Accounting",
    "Maths",
    "Biology",
    "Medicine",
    "Engineering",
    "Art",
    "Law",
    "Social science",
    "other",
  ];

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const edit = searchParams.get("edit");
  const title = decodeURIComponent(searchParams.get("title"));
  const QID = decodeURIComponent(searchParams.get("id"));
  const description = decodeURIComponent(searchParams.get("description"));
  const level = decodeURIComponent(searchParams.get("level"));
  const subject = decodeURIComponent(searchParams.get("subject"));
  const questionImage = decodeURIComponent(searchParams.get("image"));

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [selectedImage, setSelectedImage] = useState(null);
  const { userId } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (edit) {
      setIsEdit(true);
      setValue("title", title);
      setValue("description", description);
      setValue("level", level);
      setValue("subject", subject);
    }
  }, [edit, title, description, level, subject, questionImage]);

  const onSubmit = async (data) => {
    if (!edit) {
      try {
        if (userId == null) {
          toast.info("login first");
          navigate("/login");
          return;
        }
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("level", data.level);
        formData.append("subject", data.subject);
        formData.append("image", selectedImage);

        await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/api/questions/${userId}`,
          "POST",
          formData
        );
        toast.success("Posted!");
        navigate("/profile");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("level", data.level);
        formData.append("subject", data.subject);
        selectedImage && formData.append("image", selectedImage);

        await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/api/questions/${QID}`,
          "PATCH",
          formData
        );

        toast.success("Edited!");
        navigate("/profile");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        onClose: () => clearError(),
      });
    }
  }, [error, clearError]);

  return (
    <>
      {isLoading && <Loader />}
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-start py-10 px-4 sm:px-10 bg-gradient-to-b from-cyan-300/50 to-transparent relative">
        <div className="w-full max-w-3xl bg-white p-6 sm:p-10 shadow-md rounded-lg border">
          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="space-y-6"
          >
            <div>
              <label htmlFor="title" className="block font-semibold mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Title"
                className="w-full border border-gray-300 rounded-md p-3 text-base"
                {...register("title", { required: true, max: 80, min: 2 })}
              />
              {errors.title && <span className="text-red-500 text-sm">Title is required.</span>}
            </div>

            <div>
              <label htmlFor="description" className="block font-semibold mb-1">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Description"
                className="w-full h-32 resize-vertical border border-gray-300 rounded-md p-3 text-base"
                {...register("description", { max: 300 })}
              />
              {errors.description && (
                <span className="text-red-500 text-sm">Description is required.</span>
              )}
            </div>

            <div>
              <label htmlFor="level" className="block font-semibold mb-1">
                Level
              </label>
              <select
                {...register("level")}
                id="level"
                className="w-full border border-gray-300 rounded-md p-3 text-base"
              >
                <option value="Primary School">Primary School</option>
                <option value="Secondary School">Secondary School</option>
                <option value="University/College">University/College</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="subject" className="block font-semibold mb-1">
                Subject
              </label>
              <select
                {...register("subject")}
                id="subject"
                className="w-full border border-gray-300 rounded-md p-3 text-base"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="block font-semibold">Upload Image</label>
              <label className="block w-full text-center cursor-pointer py-3 border-2 border-dashed border-blue-500 text-blue-600 rounded-md">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
                Click to Upload
              </label>
              {selectedImage && (
                <div className="w-full h-52 flex items-center justify-center border rounded-md overflow-hidden">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="object-contain w-full h-full"
                  />
                </div>
              )}
            </div>

            <div>
              <button
  type="submit"
  className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition duration-200"
>
  {isEdit ? "Edit Question" : "Submit Question"}
</button>

            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AskQuestion;
