
import { useUser } from "../authentication/useUser";

export default function AdminHeader() {
  const { user = {} } = useUser();
  const { first_name, last_name, profile_image } = user;
  return (
    <header className="border-muted-border flex items-center justify-between bg-white px-6 py-2 shadow">
      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
            {first_name && last_name
              ? `${first_name[0]}${last_name[0]}`.toUpperCase()
              : "AD"}
          </div>

          <span className="h-8 w-8 overflow-hidden rounded-full border-2 border-gray-200">
            <img
              src={profile_image}
              alt="profile"
              className="h-full w-full object-cover"
            />
          </span>
        </div>
      </div>
    </header>
  );
}
