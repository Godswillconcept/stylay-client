import { BsFillCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getPlaceholder } from "../../utils/helper";

function VendorCard({ vendor }) {
  // Safely destructure with defaults
  const safeVendor = vendor || {};
  const {
    id,
    vendorId = id,  // Use vendorId if it exists, otherwise fall back to id
    User,
    store
  } = safeVendor;

  // Safely destructure User with defaults
  const {
    first_name = '',
    last_name = '',
    profile_image = null
  } = User || {};

  // Safely destructure store with defaults
  const {
    tagline = ''
  } = store || {};

  // Use store logo if available, otherwise user profile image, otherwise placeholder
  const imageUrl = profile_image || getPlaceholder(first_name, last_name);
  const displayName = `${first_name} ${last_name}`.trim() || 'Vendor';

  return (
    <Link
      to={`/vendor/${vendorId}`}
      className="block group relative overflow-hidden rounded-2xl border border-white/20 shadow-inner hover:shadow-lg transition-shadow duration-300"
    >
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={displayName}
        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-64 lg:h-72"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = getPlaceholder(first_name, last_name);
        }}
      />

      {/* Frosted Glass Overlay */}
      <div className="absolute right-0 bottom-0 left-0 rounded-b-2xl bg-white/70 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900 truncate">{displayName}</span>
          <BsFillCheckCircleFill className="text-green-500 flex-shrink-0" size={16} />
        </div>
        {tagline && (
          <p className="text-sm text-gray-700 truncate mt-1">{tagline}</p>
        )}
      </div>
    </Link>
  );
}

export default VendorCard;
