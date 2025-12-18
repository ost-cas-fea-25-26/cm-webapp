import MumbleTabs from "./MumbleTabs";

export type ProfileContentProps = {
  userId: string;
};
const ProfileContent = (props: ProfileContentProps) => {
  return <MumbleTabs userId={props.userId}></MumbleTabs>;
};

export default ProfileContent;
