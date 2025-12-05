import { Link } from "react-router-dom";
import {
  EnvelopeIcon,
  PhoneIcon,
  BriefcaseIcon,
  CreditCardIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { InstagramIcon, FacebookIcon, XIcon } from "../../../svg/Svg";
import RejectionModal from "./RejectionModal";
import { useApplicantDetails } from "./useApplicantDetails";
import { LoadingSpinner } from "../../../ui/Loading/LoadingSpinner";
// Mock data for the vendor application detail

const ApplicantDetail = () => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const { applicant, isLoading, error } = useApplicantDetails();
  const { data: { User: user, store, ...application } = {} } = applicant || {};
  // console.log(user?.first_name);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        <LoadingSpinner />
      </div>
    );
  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error loading Applicant data
      </div>
    );
  if (!applicant) return <div>Applicant is null – see console for details</div>;

  const handleReject = (message) => {
    console.log("Rejection reason:", message);
    // Here you would typically make an API call to submit the rejection
    // For now, we'll just close the modal and show an alert
    setIsRejectModalOpen(false);
    alert("Application rejected successfully");
  };
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-2">
      <div className="mx-auto max-w-7xl">
        {/* Top Header & Actions */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/admin-application" className="hover:text-gray-700">
              All Applicants
            </Link>
            <span>/</span>
            <span className="font-semibold text-gray-900">
              {user?.first_name} {user?.last_name}
            </span>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setIsRejectModalOpen(true)}
              className="flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <XCircleIcon className="mr-2 h-4 w-4 text-red-600" /> Reject
              Application
            </button>

            <RejectionModal
              isOpen={isRejectModalOpen}
              onClose={() => setIsRejectModalOpen(false)}
              onSubmit={handleReject}
            />

            <button className="flex items-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-black">
              <CheckCircleIcon className="mr-2 h-4 w-4 text-green-400" />
              Accept Application
            </button>
          </div>
        </div>

        {/* Vendor Profile Section */}
        <div className="mb-8 flex flex-col items-center space-y-6 rounded-lg bg-white p-6 shadow md:flex-row md:items-start md:space-y-0 md:space-x-6">
          <img
            src={user?.profile_image}
            alt={user?.first_name}
            className="h-24 w-24 rounded-full border-2 border-gray-200 object-cover"
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              {applicant?.name}
            </h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm text-gray-700 sm:grid-cols-2">
              <div className="flex items-center">
                <EnvelopeIcon className="mr-2 h-4 w-4 text-gray-500" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center">
                <BriefcaseIcon className="mr-2 h-4 w-4 text-gray-500" />
                <span>Business Name: {store?.business_name}</span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="mr-2 h-4 w-4 text-gray-500" />
                <span>{user?.phone || "NA"}</span>
              </div>
              <div className="flex items-center">
                <CreditCardIcon className="mr-2 h-4 w-4 text-gray-500" />
                <span>Business CAC number: {store?.cac_number}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Application Details - Why join, Social media */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <div className="mb-6">
            <label
              htmlFor="whyJoin"
              className="mb-2 block font-medium text-gray-900"
            >
              Why do you want to join Stylay*
            </label>
            <textarea
              id="whyJoin"
              rows="3"
              className="block w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 focus:outline-none"
              value={store?.why_join}
            ></textarea>
          </div>

          <div className="space-y-4">
            {/* Instagram */}
            <div>
              <label
                htmlFor="instagram"
                className="mb-2 block font-medium text-gray-900"
              >
                Instagram Handle*
              </label>
              <div className="relative">
                <InstagramIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="instagram"
                  value={store?.instagram_handle}
                  className="block w-full rounded border border-gray-300 bg-gray-50 py-2 pr-4 pl-10 text-sm text-gray-900 placeholder-gray-500 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 focus:outline-none"
                />
              </div>
            </div>
            {/* Facebook */}
            <div>
              <label
                htmlFor="facebook"
                className="mb-2 block font-medium text-gray-900"
              >
                Facebook Handle*
              </label>
              <div className="relative">
                <FacebookIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="facebook"
                  value={store?.facebook_handle}
                  className="block w-full rounded border border-gray-300 bg-gray-50 py-2 pr-4 pl-10 text-sm text-gray-900 placeholder-gray-500 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 focus:outline-none"
                />
              </div>
            </div>
            {/* X (Twitter) */}
            <div>
              <label
                htmlFor="x"
                className="mb-2 block font-medium text-gray-900"
              >
                Twitter Handle*
              </label>
              <div className="relative">
                <XIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="x"
                  value={store?.twitter_handle}
                  className="block w-full rounded border border-gray-300 bg-gray-50 py-2 pr-4 pl-10 text-sm text-gray-900 placeholder-gray-500 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Design Samples Section */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-6 border-gray-200 pb-2 text-xl font-semibold text-gray-900">
            Design samples
          </h3>
          <div className="flex flex-col gap-4 lg:flex-row">
            <div
              className="relative w-full overflow-hidden rounded-lg bg-gray-100 lg:w-6/4"
              style={{ aspectRatio: "8/3" }}
            >
              <img
                src={applicant?.designSamples}
                alt="Design Sample 1"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/800x450?text=Image+Not+Found";
                }}
              />
            </div>

            {/* Small images occupy 1/3 width on md and up, stacked vertically */}
            <div className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-x-visible lg:overflow-y-auto">
              {/* {applicant?.designSamples.slice(1, 4).map((src, index) => (
                <div key={index} className="flex-shrink-0">
                  <img
                    src={src}
                    alt={`Design Sample ${index + 2}`}
                    className="h-20 w-20 cursor-pointer rounded-md border-2 border-transparent object-cover lg:h-24 lg:w-46"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x400?text=Image+Not+Found";
                    }}
                  />
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetail;
