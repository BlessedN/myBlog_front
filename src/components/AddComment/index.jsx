import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useState } from "react";
import { fetchAddComment } from '../../redux/slices/posts';
import { useDispatch, useSelector } from "react-redux";


export const AddComment = ({postId}) => {
  const [comment, setComment] = useState("");
  const user = useSelector(state => state.auth.data)
  const dispatch = useDispatch();

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    dispatch(fetchAddComment({
      text: comment,
      date: Date.now(),
      post: postId,
      user: {
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
        id: user._id
      }
    }))
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={comment}
            onChange={handleCommentChange}
          />
          <Button onClick={handleCommentSubmit} variant="contained">Отправить</Button>
          </div>
      </div>
    </>
  );
};
