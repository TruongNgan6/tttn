"use client";
// import { useRouter } from "next/router";
import React, { useState } from "react";
import ReactModal from "react-modal";
import Upload from "./upload/page";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // const router = useRouter();

  // const goToNewPage = () => {
  //   router.push("/upload/page.tsx");
  // };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to the UTH!
        </h1>
        <h3 className="text-center mb-8">
          Enroll in UTH by submitting your details
        </h3>
        <div className="flex flex-col items-center">
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
            onClick={openModal}
          >
            Show Instruction
          </button>
          <ReactModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Upload Form"
            className="modal bg-white p-3 rounded-lg shadow-lg max-w-screen-2xl max-h-screen overflow-y-auto"
            overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center"
          >
            <div className="">
              <Upload />
            </div>
          </ReactModal>
        </div>
      </div>
    </div>
  );
}
