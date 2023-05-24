import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import {useNavigate, useLocation} from 'react-router-dom'
import { useParams } from 'react-router-dom';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags, fetchPopularPost, fetchPostTags } from '../redux/slices/posts';

export const Home = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.data);
    const { posts, tags } = useSelector((state) => state.posts);
    const navigate = useNavigate()
    const location = useLocation()
    const [currentTab, setCurrentTab] = useState(location.pathname)

  const isPostLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const { tag } = useParams();

  const handleChange = (event, newValue) => {  //для tabs
    setCurrentTab(newValue)
    navigate(newValue)
  }

  React.useEffect(() => {
    dispatch(fetchTags());
  }, [])

  React.useEffect(() => {
    if (location.pathname === '/') {
      dispatch(fetchPosts());
    }  else if(location.pathname === '/popular/posts') {
      dispatch(fetchPopularPost()) //дописала
    } 
    else {
      dispatch(fetchPostTags(tag)) //дописала
    }
    }, [location]);

  return (
    <>
      <Tabs onChange={handleChange}  style={{ marginBottom: 15 }} value={currentTab} aria-label="basic tabs example">
        <Tab value='/' label="Новые" />
        <Tab value='/popular/posts' label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={obj.comments.length}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
              comments={obj.comments}
            />
          ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Александр Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
