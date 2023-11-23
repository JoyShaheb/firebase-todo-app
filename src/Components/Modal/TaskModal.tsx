import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CreateModal = ({
  button,
  title,
  children,
  onClose,
  onCancel,
  onConfirm,
}: {
  button: JSX.Element;
  title: string;
  children: JSX.Element;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        // style={{
        //   border: "none",
        //   background: "none",
        // }}
        onClick={() => setShowModal(true)}
      >
        {button}
      </button>

      {showModal && (
        <>
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-70"></div>
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                    onClose();
                  }}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <XMarkIcon />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">{children}</div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={() => {
                    setShowModal(false);
                    onConfirm();
                  }}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create task
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    onCancel();
                  }}
                  className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateModal;
