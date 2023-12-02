import { FC } from "react";
import InputFieldWithLabel from "./InputFieldWithLabel";
import { NewProfileTypeForm } from "../../types/types"

const ProfileForm: FC<NewProfileTypeForm> = ({
name, 
phoneNumber,
photoURL,
handleInput
}) => {
  return (
    <>
      <InputFieldWithLabel
        onChange={handleInput}
        type="text"
        value={name}
        placeholder="Add your name"
        label="Name"
        name="name"
        required = {false}
      />
      <InputFieldWithLabel
        onChange={handleInput}
        type="text"
        value={phoneNumber}
        placeholder="Add your phoneNumber"
        label="Phone Number"
        name="phoneNumber"
        required={false}
      />
      <InputFieldWithLabel
        onChange={handleInput}
        type="text"
        value={photoURL}
        placeholder="Add photo"
        label="photoURL"
        name="photoURL"
        required={false}
      />
    </>
  );
};

export default ProfileForm;
