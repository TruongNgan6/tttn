"use client";
import { useEffect, useState } from "react";
import Tesseract from "tesseract.js";

export default function Upload() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = event.target.files ? event.target.files[0] : null;
    if (file) {
      const fileUrl: string = URL.createObjectURL(file);
      setImagePreview(fileUrl);
    }
  };

  const [isInformationVisible, setIsInformationVisible] = useState(false);
  const [extractedIdNumber, setExtractedIdNumber] = useState("");
  const [extractedFullName, setExtractedFullName] = useState("");
  const [extractedDateOfBirth, setExtractedDateOfBirth] = useState("");
  const [extractedGender, setExtractedGender] = useState("");
  const [extractedNationality, setExtractedNationality] = useState("");
  const [extractedPlaceOfOrigin, setExtractedPlaceOfOrigin] = useState("");
  const [extractedPlaceOfResidence, setExtractedPlaceOfResidence] =
    useState("");

  // const [isCheckComplete, setIsCheckComplete] = useState(false);

  async function handleCheck() {
    if (!imagePreview) {
      return alert("Please upload an image of your ID first.");
    }

    // Extract relevant information from recognized text using regular expressions or parsing techniques

    // ... (logic to populate extracted information into state variables) ...

    // Set flag to show extracted information and submit button
    setIsInformationVisible(true);
    try {
      // Use Tesseract or other OCR library to process image

      const response = await Tesseract.recognize(imagePreview, "vie");
      const recognizedText = response.data.text;

      // Xử lý văn bản nhận dạng được để trích xuất thông tin
      // Sử dụng các biểu thức chính quy hoặc các thuật toán xử lý văn bản khác để tìm kiếm các thông tin cần thiết
      const regex = /Số:\s*(\d+)/;
      const match = recognizedText.match(regex);
      const extractedIdNumber = match ? match[1] : "";

      // Tương tự, bạn có thể sử dụng các biểu thức chính quy hoặc các thuật toán khác để trích xuất các thông tin khác như họ tên, ngày sinh, ...

      // Cập nhật các biến state để hiển thị thông tin lên giao diện
      setExtractedIdNumber(extractedIdNumber);
      // ... (cập nhật các biến state khác)

      // Hiển thị thông báo thành công hoặc thông báo lỗi
      alert("Thông tin đã được trích xuất thành công!");
    } catch (error) {
      console.error("Lỗi khi nhận dạng văn bản:", error);
      alert(
        "Có lỗi xảy ra trong quá trình nhận dạng. Vui lòng kiểm tra lại hình ảnh."
      );
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
          Please Upload Front ID
        </h1>
        <div className="flex items-center justify-center w-full mb-8">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        <div className="">
          <div className="">
            {" "}
            {imagePreview && (
              <div className="flex items-center justify-center w-full mb-8">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="max-h-64 rounded-lg"
                />
              </div>
            )}
          </div>
          {isInformationVisible && (
            <div>
              <p>
                Số căn cước: <span>{extractedIdNumber}</span>
              </p>
              <p>
                Họ tên: <span>{extractedFullName}</span>
              </p>
              <p>
                Ngày sinh: <span>{extractedDateOfBirth}</span>
              </p>
              <p>
                Giới tính: <span>{extractedGender}</span>
              </p>
              <p>
                Quốc tịch: <span>{extractedNationality}</span>
              </p>
              <p>
                Quê quán: <span>{extractedPlaceOfOrigin}</span>
              </p>
              <p>
                Nơi thường trú: <span>{extractedPlaceOfResidence}</span>
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={handleCheck}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 mb-8"
          >
            Check
          </button>
          {isInformationVisible && (
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
