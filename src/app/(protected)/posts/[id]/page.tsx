import { getPostByIdAction } from "@/actions/post.action";
import MumblePost from "@/components/MumblePost";
import PostResponseCreator from "@/components/PostResponseCreator";
import { notFound } from "next/navigation";
import { tv } from "tailwind-variants";

const postDetailStyles = tv({
  slots: {
    base: ["mx-auto", "max-w-3xl", " mt-12", "bg-white"],
  },
});

type PostDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { base } = postDetailStyles();
  const { id } = await params;
  const post = await getPostByIdAction(id);

  if (!post) {
    notFound();
  }

  return (
    <div className={base()}>
      <MumblePost post={post} />
      <PostResponseCreator
        displayName={post.creator?.displayName ?? "Blubs"}
        userName={post.creator?.username ?? "Blubs"}
        avatarSrc={post.creator?.avatarUrl ?? undefined}
      />
    </div>
  );
}
