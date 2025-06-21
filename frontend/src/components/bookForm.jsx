import React, { useState, useEffect } from "react";

export default function BookForm({
  isEdit = false,
  initialData = {},
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedYear: "",
    description: "",
    image: null, // for file
    rating: 0,
    reviews: 0,
    genres: [],
    genreInput: "",
  });

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        image: null, // file uploads are not pre-filled
      }));
    }
  }, [isEdit, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const sanitizedName = file.name.replace(/\s+/g, "-");
      const sanitizedFile = new File([file], sanitizedName, {
        type: file.type,
      });
      setFormData((prev) => ({
        ...prev,
        image: sanitizedFile,
      }));
    }
  };

  const handleAddGenre = () => {
    if (formData.genreInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        genres: [...prev.genres, prev.genreInput.trim()],
        genreInput: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "genres") {
        value.forEach((g) => payload.append("genres[]", g));
      } else if (value !== null) {
        payload.append(key, value);
      }
    });

    onSubmit(payload);
  };

 /* const handleAddBook = async (formData) => {
    try {
      const res = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add book");

      const data = await res.json();
      alert("Book added successfully!");
      // optionally redirect or refresh
    } catch (err) {
      console.error(err);
      alert("Error adding book");
    }
  }; */

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="text-gray-600 body-font overflow-hidden justify-center m-16"
        encType="multipart/form-data"
      >
        <div className="lg:w-4/5 mx-auto flex flex-col md:flex-row border-2 border-gray-200 bg-white shadow-lg rounded-lg">
          {/* Left Side: Image Upload */}
          <div
            className="md:w-1/2 w-full p-8 flex flex-col justify-center items-center  border-dashed m-2 border-2 border-gray-400 hover:border-blue-400 transition-all duration-200"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file && file.type.startsWith("image/")) {
                const sanitizedName = file.name.replace(/\s+/g, "-");
                const sanitizedFile = new File([file], sanitizedName, {
                  type: file.type,
                });
                setFormData((prev) => ({ ...prev, image: sanitizedFile }));
              }
            }}
            onClick={() => document.getElementById("imageUpload").click()}
          >
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <p className="text-center text-gray-500 mb-2">
              <strong>Drag and drop</strong> an image here or{" "}
              <span className="text-blue-500 underline">click to upload</span>
            </p>

            {formData.image && typeof formData.image === "object" && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  Selected: {formData.image.name}
                </p>
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="h-40 rounded shadow"
                />
              </div>
            )}
          </div>

          {/* Right Side: Form Inputs */}
          <div className="md:w-1/2 w-full p-8">
            <h2 className="text-2xl font-bold mb-6">
              {isEdit ? "Edit Book" : "Add New Book"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-1 text-sm">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Title"
                  required
                  className="border px-2 py-1 rounded text-sm w-full"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-sm">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Author"
                  required
                  className="border px-2 py-1 rounded text-sm w-full"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-sm">ISBN</label>
                <input
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  placeholder="ISBN"
                  className="border px-2 py-1 rounded text-sm w-full"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-sm">
                  Rating (0–5)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        rating: Math.max(0, (parseFloat(prev.rating) || 0) - 1),
                      }))
                    }
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    –
                  </button>
                  <span className="px-4 text-sm">
                    {parseFloat(formData.rating || 0)}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        rating: Math.min(5, (parseFloat(prev.rating) || 0) + 1),
                      }))
                    }
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-sm">
                  Reviews
                </label>
                <input
                  type="number"
                  name="reviews"
                  value={formData.reviews}
                  onChange={handleChange}
                  placeholder="Number of Reviews"
                  className="border px-2 py-1 rounded text-sm w-full"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-sm">
                  Publisher
                </label>
                <input
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  placeholder="Publisher"
                  className="border px-2 py-1 rounded text-sm w-full"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mt-4">
              <label className="block font-semibold mb-1 text-sm">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                rows="4"
                className="border px-2 py-1 rounded text-sm w-full"
              ></textarea>
            </div>

            {/* Genres */}
            <div className="mt-4">
              <label className="block font-semibold mb-1 text-sm">Genres</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formData.genreInput}
                  onChange={(e) =>
                    setFormData({ ...formData, genreInput: e.target.value })
                  }
                  placeholder="Add genre"
                  className="border px-2 py-1 rounded text-sm w-full"
                />
                <button
                  type="button"
                  onClick={handleAddGenre}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap mt-2 gap-2">
                {formData.genres.map((genre, idx) => (
                  <span
                    key={idx}
                    className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                {isEdit ? "Update Book" : "Add Book"}
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
