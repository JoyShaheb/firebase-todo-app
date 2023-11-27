import InputField from "../Form/InputField";

const EditProfileForm = ({
  name,
  photoURL,
  phoneNumber,
  handleInputChange,
}: {
  name: string;
  photoURL: string;
  phoneNumber: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <InputField
        label="Your Name"
        onChange={handleInputChange}
        name="name"
        placeholder="Your name"
        required
        type="text"
        value={name}
      />
      <InputField
        label="Your photo URL"
        onChange={handleInputChange}
        name="photoURL"
        placeholder="Photo URL"
        required
        type="text"
        value={photoURL}
      />
      <InputField
        label="Your phone number"
        onChange={handleInputChange}
        name="phoneNumber"
        placeholder="phone Number"
        required
        type="text"
        value={phoneNumber}
      />
    </>
  );
};
export default EditProfileForm;
