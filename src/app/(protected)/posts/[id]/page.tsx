import { getPostByIdAction } from "@/actions/post.action";
import MumblePost from "@/components/MumblePost";
import { notFound } from "next/navigation";

type PostDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  const post = await getPostByIdAction(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl pt-12">
      <MumblePost post={post} />
    </div>
  );
}
