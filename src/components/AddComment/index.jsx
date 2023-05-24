import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useState } from "react";

export const Index = () => {
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    // добавление комментария в список
    setCommentsList([...commentsList, comment]);
    console.log(comment);
    setComment("");
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
      {/* отрисовка списка комментариев */}
      {commentsList.map((comment, index) => (
        <div key={index}>{comment}</div>
      ))}
    </>
  );
};
