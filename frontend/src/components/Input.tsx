import {  ChangeEvent } from 'react';

// Basic input component
const Input = ({
  title,
  value,
  onChange,
  
}: {
  title: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
   
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={title.replace(/\s+/g, '-').toLowerCase()}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {title}
      </label>
      <input
       
       
      value={value}
      onChange={onChange}
        type="text"
        id={title.replace(/\s+/g, '-').toLowerCase()}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={`Enter ${title}`}
        required
      />
    </div>
  );
};

interface InputImgProps {
  onImageChange: (file: File | null) => void;
  preview: string;
}

// Image input component with preview
export const InputImg: React.FC<InputImgProps> = ({ onImageChange, preview }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative"
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="absolute inset-0 object-cover w-full h-full rounded-lg"
          />
        )}
      </label>
    </div>
  );
};
 

// SmallInput component
export const SmallInput = ({
  title,
  value,
  onChange,
  name
}: {
  title: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}) => {
  return (
    <div className="flex-1">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {title}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={title}
        required
      />
    </div>
  );
};

// BigInput component
export const BigInput = ({
  title,
  value,
  onChange,
  name
}: {
  title: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {title}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-[12rem] pb-[9rem]"
        placeholder={`Enter ${title}`}
        required
      />
    </div>
  );
};
 


export default Input;
