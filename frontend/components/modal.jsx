import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Modal = ({
  isOpen,
  closeModal,
  fullName,
  setFullName,

  handleUpdate,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <div className="bg-opacity-30 fixed inset-0 flex items-center justify-center bg-black p-4 text-black">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <Dialog.Title className="text-md font-bold text-gray-800">
              Update Full Name
            </Dialog.Title>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-3 w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter new full name"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="cursor-pointer rounded-sm bg-gray-400 px-4 py-2 text-white transition hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="cursor-pointer rounded-sm bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
