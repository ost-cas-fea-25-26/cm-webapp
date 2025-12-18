import { getPostByIdAction } from "@/actions/post.action";
import { getUserAction } from "@/actions/user.action";
import MumblePost from "@/components/MumblePost";
import PostResponseCreator from "@/components/PostResponseCreator";
import { notFound } from "next/navigation";
import { tv } from "tailwind-variants";

const postDetailStyles = tv({
  base: [
    "mx-auto",
    "max-w-3xl",
    "mt-12",
    "bg-white",
    "flex",
    "flex-col",
    "gap-1",
  ],
});

type PostDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  const post = await getPostByIdAction(id);
  const currentUser = await getUserAction();
  if (!post) {
    notFound();
  }

  return (
    <div className={postDetailStyles()}>
      <MumblePost post={post} />
      {currentUser && (
        <PostResponseCreator
          displayName={currentUser?.displayName ?? "Anonymous"}
          userName={currentUser?.username ?? "Anonymous"}
          avatarSrc={currentUser?.avatarUrl ?? undefined}
        />
      )}
    </div>
  );
}
