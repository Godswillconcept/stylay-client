import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiChevronDown, FiCamera } from "react-icons/fi";
import ProfileInput from "../../pages/dashBoard/ProfileInput";
import { useUser } from "../authentication/useUser";
import { useAddresses } from "./useAddresses";
import { updateUser } from "../../services/apiUser";

function Profile() {
    const { user = {} } = useUser();
    const { id, first_name, last_name, email, phone, gender, dob, city, country } = user;

    const { addresses = [] } = useAddresses();

    // ✅ Find the default address safely
    const defaultAddress = Array.isArray(addresses)
        ? addresses.find((addr) => addr.is_default) || {}
        : {};

    const {
        address_line = "No default address found",
        state = "Not specified",
        city: defaultCity = "Not specified",
        country: defaultCountry = "Not specified",
    } = defaultAddress;

    const formattedAddress = `${address_line}, ${defaultCity}, ${state}, ${defaultCountry}`;

    // ✅ Initialize the form FIRST
    const {
        handleSubmit,
        register,
        formState,
        reset,
        setValue,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            first_name: first_name || "First name not set",
            last_name: last_name || "Last name not set",
            email: email || "Email not provided",
            phone: phone || "Phone number not provided",
            gender: gender || "Not specified",
            dob: dob ? dob.split("T")[0] : "Date of birth not set",
            address_line: formattedAddress,
            state,
            city: city || defaultCity,
            country: country || defaultCountry,
        },
    });

    const { errors, isValid } = formState;

    // ✅ Update address field when addresses finish loading
    useEffect(() => {
        if (defaultAddress && Object.keys(defaultAddress).length > 0) {
            const { address_line = "", city: addrCity = "", state = "", country = "" } = defaultAddress;
            const addressParts = [address_line, addrCity, state, country].filter(Boolean);
            const formatted = addressParts.length > 0 ? addressParts.join(", ") : "No address details available";

            setValue("address_line", formatted);
        }
    }, [defaultAddress, setValue]);

    function onSubmitProfile(data) {
        if (!isValid) return;
        console.log("Form submitted ✅", data);
        const { address_line, ...userData } = data;
        updateUser(userData);
        // submit to API here
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Profile</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Follow the steps below and fill the required fields
                </p>
            </div>

            {/* Avatar Upload */}
            <div className="mb-10 flex items-center justify-center gap-6">
                <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-200">
                    <FiCamera className="h-full w-full p-4 text-gray-400" />
                </div>
                <button
                    type="button"
                    className="text-sm font-medium text-black hover:underline"
                >
                    Change Photo
                </button>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmitProfile)}
                className="grid grid-cols-1 gap-4 gap-x-6 sm:gap-3 md:grid-cols-2"
            >
                {/* First Name */}
                <ProfileInput
                    label="First Name"
                    name="first_name"
                    error={errors.first_name?.message}
                >
                    <input
                        id="first_name"
                        type="text"
                        placeholder="Enter first name"
                        className={`w-full rounded-lg border px-4 py-2 placeholder-gray-400 focus:ring-2 focus:ring-black/80 focus:outline-none ${errors.first_name ? "border-red-500 text-red-500" : "border-gray-200 text-gray-400"
                            }`}
                        {...register("first_name")}
                    />
                </ProfileInput>

                {/* Last Name */}
                <ProfileInput label="Last Name" name="last_name" error={errors.last_name?.message}>
                    <input
                        id="last_name"
                        type="text"
                        placeholder="Enter last name"
                        className={`w-full rounded-lg border px-4 py-2 placeholder-gray-400 focus:ring-2 focus:ring-black/80 focus:outline-none ${errors.last_name ? "border-red-500 text-red-500" : "border-gray-200 text-gray-400"
                            }`}
                        {...register("last_name")}
                    />
                </ProfileInput>

                {/* Email */}
                <ProfileInput label="Email" name="email" error={errors.email?.message}>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className={`w-full rounded-lg border px-4 py-2 placeholder-gray-400 focus:ring-2 focus:ring-black/80 focus:outline-none ${errors.email ? "border-red-500 text-red-500" : "border-gray-200 text-gray-400"
                            }`}
                        {...register("email", {
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            },
                        })}
                    />
                </ProfileInput>

                {/* Phone */}
                <ProfileInput label="Phone Number" name="phone" error={errors.phone?.message}>
                    <input
                        id="phone"
                        type="tel"
                        placeholder="Enter phone number"
                        className={`w-full rounded-lg border px-4 py-2 placeholder-gray-400 focus:ring-2 focus:ring-black/80 focus:outline-none ${errors.phone ? "border-red-500 text-red-500" : "border-gray-200 text-gray-400"
                            }`}
                        {...register("phone")}
                    />
                </ProfileInput>

                {/* Gender */}
                <ProfileInput label="Gender" name="gender" error={errors.gender?.message}>
                    <div className="relative">
                        <select
                            id="gender"
                            className={`w-full appearance-none rounded-xl border px-4 py-2 pr-10 focus:ring-2 focus:ring-black/80 focus:outline-none ${errors.gender ? "border-red-500 text-red-500" : "border-gray-200 text-gray-400"
                                }`}
                            {...register("gender")}
                            defaultValue={gender || ""}
                        >
                            <option value="">Select your gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <FiChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
                    </div>
                </ProfileInput>

                {/* DOB */}
                <ProfileInput label="Date of Birth" name="dob" error={errors.dob?.message}>
                    <input
                        id="dob"
                        type="date"
                        className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-black/80 focus:outline-none ${errors.dob ? "border-red-500 text-red-500" : "border-gray-200 text-gray-400"
                            }`}
                        {...register("dob")}
                    />
                </ProfileInput>

                {/* Address */}
                <ProfileInput
                    label="Address"
                    name="address_line"
                    hint="Your address will be used in the shipping process"
                    error={errors.address_line?.message}
                    className="md:col-span-2"
                >
                    <input
                        id="address_line"
                        type="text"
                        placeholder="Enter your address"
                        className={`w-full rounded-lg border px-4 py-2 placeholder-gray-400 focus:ring-2 focus:ring-black/80 focus:outline-none ${errors.address_line ? "border-red-500 text-red-500" : "border-gray-200 text-gray-400"
                            }`}
                        {...register("address_line")}
                        readOnly
                    />
                </ProfileInput>

                {/* City */}
                <ProfileInput label="City" name="city" error={errors.city?.message}>
                    <input
                        id="city"
                        type="text"
                        placeholder="Enter your city"
                        className={`w-full rounded-lg border px-4 py-2 placeholder-gray-400 focus:ring-2 focus:ring-black/80 focus:outline-none ${errors.city ? "border-red-500 text-red-500" : "border-gray-200 text-gray-400"
                            }`}
                        {...register("city")}
                        readOnly
                    />
                </ProfileInput>

                {/* Country */}
                <ProfileInput label="Country" name="country" error={errors.country?.message}>
                    <input
                        id="country"
                        type="text"
                        placeholder="Enter your country"
                        className={`w-full rounded-lg border px-4 py-2 placeholder-gray-400 focus:ring-2 focus:ring-black/80 focus:outline-none ${errors.country ? "border-red-500 text-red-500" : "border-gray-200 text-gray-400"
                            }`}
                        {...register("country")}
                        readOnly
                    />
                </ProfileInput>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-2 md:col-span-2">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-800 shadow-sm hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-lg bg-black px-6 py-3 font-semibold text-white shadow-sm hover:bg-gray-900"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Profile;
