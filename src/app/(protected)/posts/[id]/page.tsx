type PostDetailPageProps = {
  params: { id: string };
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const postId = (await params).id;
  return <span>Post detail of post with id: {postId}</span>;
}
