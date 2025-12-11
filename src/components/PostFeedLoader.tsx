import PostFeed from "./PostFeed";
import { getPostsAction } from "@/actions/post.action";

const PostFeedLoader = async () => {
  const posts = await getPostsAction();

  return <PostFeed posts={posts} />;
};

export default PostFeedLoader;
