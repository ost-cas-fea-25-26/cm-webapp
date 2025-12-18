import { Post as PostComponent } from "@krrli/cm-designsystem";


type PostDetailPageProps = {
  params: { id: string };
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {

  const postId = params.id;

    return (
      <p> post detail of post {postId}</p>
      // <PostComponent
      //   size="md"
      //   displayName={props.post.creator?.displayName ?? undefined}
      //   userName={props.post.creator?.username ?? undefined}
      //   timestamp={postTimeStamp}
      //   text={props.post.text ?? undefined}
      //   avatarSrc={props.post.creator?.avatarUrl ?? undefined}
      //   imageSrc={props.post.mediaUrl ?? undefined}
      //   nbrOfComments={props.post.replies ?? 0}
      //   nbrOfLikes={props.post.likes ?? 0}
      //   onAvatarClick={goToProfilePage}
      //   onCommentClick={goToPostDetailPage}
      //   onLikeClick={onLikeButtonClick}
      //   onShareClick={copyLinkToClipboard}
      //   detailLink={postDetailPageUrl}
      // ></PostComponent>
    );
}
