import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Bars } from 'react-loader-spinner';

const Home = React.memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUploadedFile(null);
    setIsLoading(false);
    setUploadMessage(null);
  };

  const onDrop = (acceptedFiles) => {
    setUploadedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.xlsx,.xls' });

  const handleUpload = async () => {
    if (!uploadedFile) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const response = await fetch('http://localhost:8000/api/upload/', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
        console.log('File saved at:', result.file_path);
        setUploadMessage('File uploaded and processed successfully!');
      } else {
        console.error(result.error);
        setUploadMessage('Failed to upload and process file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadMessage('Error uploading file.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadAndCloseModal = async () => {
    await handleUpload();
    setTimeout(handleCloseModal, 2000); // Close the modal after showing the message for 2 seconds
  };

  return (
    <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-10 before:transform before:-translate-x-1/2">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Bars height="80" width="80" color="blue" ariaLabel="loading-indicator" />
        </div>
      ) : (
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-10 mt-20">
          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
              Upload to  
              <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent"> Start Saving</span>
            </h1>
          </div>
          <div className="mt-5 max-w-3xl text-center mx-auto">
            {/* <p className="text-lg text-gray-600 dark:text-neutral-400">
              YourBankStatementApp is a powerful tool for automatically extracting and visualizing data from uploaded bank statements, providing you with clear insights and a comprehensive dashboard.
            </p> */}
          </div>
          <div className="mt-8 gap-3 flex justify-center">
            <button
              onClick={handleOpenModal}
              className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800"
            >
              Upload
              <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      )}

      {isModalOpen && !isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Upload Excel</h2>
            <div {...getRootProps({ className: 'dropzone border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer' })}>
              <input {...getInputProps()} />
              <p className="text-gray-600">Drag & drop an Excel file here, or click to select a file</p>
              {uploadedFile && (
                <div className="mt-4">
                  <p className="text-gray-800">Selected file:</p>
                  <p className="text-gray-600">{uploadedFile.name}</p>
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-800 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 py-2 px-4"
              >
                Close
              </button>
              <button
                onClick={handleUploadAndCloseModal}
                className="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-800 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 py-2 px-4"
              >
                Upload
              </button>
            </div>
            {uploadMessage && (
              <div className="mt-4">
                <p className="text-gray-600">{uploadMessage}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default Home;
