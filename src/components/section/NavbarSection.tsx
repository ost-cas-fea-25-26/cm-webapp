import { getUserAction } from "@/actions/user.action";
import MumbleLogoutButton from "../base/MumbleLogoutButton";
import MumbleNavbar from "../base/MumbleNavbar";
import MumbleProfileAvatar from "../base/MumbleProfileAvatar";
import MumbleSettingsButton from "../base/MumbleSettingsButton";

const NavbarSection = async () => {
  const mumbleUser = await getUserAction();

  return (
    <MumbleNavbar>
      {mumbleUser ? (
        <>
          <MumbleProfileAvatar
            userId={mumbleUser.id!}
            src={mumbleUser!.avatarUrl!}
          />
          <MumbleSettingsButton userId={mumbleUser.id!} />
        </>
      ) : (
        <></>
      )}

      <MumbleLogoutButton />
    </MumbleNavbar>
  );
};

export default NavbarSection;
