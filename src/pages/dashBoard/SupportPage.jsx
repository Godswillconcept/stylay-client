import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import ProfileInput from "./ProfileInput";

function SupportPage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="mx-auto bg-white p-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-900">Support</h2>
      <p className="mt-1 text-sm text-gray-600">
        Follow the steps below and fill the required fields
      </p>

      <form className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Subject */}
        <div className="sm:col-span-2">
          <ProfileInput label="Subject" name="subject">
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="e.g., Issue with recent order"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:ring-blue-600"
            />
          </ProfileInput>
        </div>

        {/* Order Number */}

        <ProfileInput label="Order Number" name="orderNumber">
          <input
            type="text"
            id="orderNumber"
            name="orderNumber"
            placeholder="e.g., #12345678"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:ring-blue-600"
          />
        </ProfileInput>

        {/* Category / Issue Type */}
        <ProfileInput label="Category / Issue Type" name="issueType">
          <select
            id="issueType"
            name="issueType"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-blue-600 focus:ring-blue-600"
          >
            <option value="">Select issue type</option>
            <option value="payment">Order not delivered</option>
            <option value="delivery">Wrong item received</option>
            <option value="account">Payment issue</option>
            <option value="return">Return request</option>
            <option value="refund">Return/Refund request</option>
            <option value="accountIssue">Account issue</option>
            <option value="technical">Technical problem</option>
            <option value="other">Other</option>
          </select>
        </ProfileInput>

        {/* Description */}
        <div className="sm:col-span-2">
          <ProfileInput label="Description / Message" name="message">
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Describe your issue in detail..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:ring-blue-600"
            />
          </ProfileInput>
        </div>

        {/* Preferred Contact Method */}
        <ProfileInput label="Preferred Contact Method" name="contactMethod">
          <select
            id="contactMethod"
            name="contactMethod"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:ring-blue-600"
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </ProfileInput>

        {/* Contact Email / Phone */}
        <ProfileInput label="Contact Email / Phone" name="contactInfo">
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            placeholder="e.g., johndoe@example.com or +1 555 987 6543"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:ring-blue-600"
          />
        </ProfileInput>

        {/* File Upload */}
        <div className="sm:col-span-2">
          <ProfileInput label="File" name="file">
            <label
              htmlFor="fileUpload"
              className="flex w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 px-6 py-10 text-center text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600"
            >
              <FiUpload className="mb-2 h-6 w-6 text-gray-400" />
              {file ? (
                <span className="text-gray-800">{file.name}</span>
              ) : (
                <>
                  <span className="font-medium">Drag & drop file here</span>
                  <span className="mt-1 text-xs text-gray-500">
                    PNG, JPEG, and PDF. Maximum size is 5 MB
                  </span>
                  <span className="mt-3 inline-block rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Upload File
                  </span>
                </>
              )}
              <input
                id="fileUpload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </ProfileInput>
        </div>
      </form>

      {/* Footer Buttons */}
      <div className="mt-6 flex justify-end gap-3">
        <Link
          to="/settings"
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default SupportPage;
