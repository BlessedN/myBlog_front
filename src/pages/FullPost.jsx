import React from "react";
import { useParams } from 'react-router-dom';
import { Post } from "../components/Post";
// import { Comment } from "../components/Comment";

import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../redux/axios";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useSelector } from "react-redux";

export const FullPost = () => {
  const userData = useSelector((state) => state.auth.data)
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
    .get(`/posts/${id}`)
    .then((res) => {
      setData(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.warn(err);
      alert('Ошибка при получении статьи');
    })
  }, [id]);

if(isLoading){
  return <Post isLoading={isLoading} isFullPost />
}

  return (
    <>
      <Post
         id={data._id}
         title={data.title}
         imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        //  imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
         user={data.user}
         createdAt={data.createdAt}
         viewsCount={data.viewsCount}
         commentsCount={data.commentsCount}
         tags={data.tags}
         isEditable={userData?._id === data.user._id}
         isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={data.comments}
        isLoading={false}
      >
        <AddComment postId={data._id} />
      </CommentsBlock>
    </>
  );
};
