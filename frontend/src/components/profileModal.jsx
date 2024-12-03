import PropTypes from "prop-types";
import {
  bitwiseSkinConcernsToString,
  bitwiseSkinTypeToString,
} from "../../../shared/utils/constants";

function ProfileModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background */}
      <div
        className="absolute inset-0 bg-customGray opacity-50"
        onClick={onClose}
      ></div>
      {/* Profile Modal */}
      <div className="bg-customBlue rounded-[30px] p-20 w-[500px] h-[400px] shadow-lg relative z-1">
        {/* Exit button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-customGray"
        >
          ✖️
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="p-1 mb-1">
            <svg
              className="w-16 h-16 text-customGray"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold">
            {user ? user.displayName : "User"}
          </h2>
          <p className="text-lg text-customGray">
            {user ? user.email : "email@gmail.com"}
          </p>
          <p className="text-lg text-customGray">
            <strong>Skin type:</strong>{" "}
            {user && user.skinType != 0
              ? bitwiseSkinTypeToString(user.skinType)
              : "N/A"}
          </p>
          <p className="text-lg text-customGray">
            <strong>Skin concerns:</strong>{" "}
            {user && user.concerns != 0
              ? bitwiseSkinConcernsToString(user.concerns)
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
ProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default ProfileModal;
