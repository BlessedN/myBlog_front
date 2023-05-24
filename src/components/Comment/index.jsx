// import React from "react";
// import { Avatar, Box, IconButton, makeStyles } from "@material-ui/core";
// import { Delete } from "@material-ui/icons";
// import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     alignItems: "center",
//     marginBottom: theme.spacing(2),
//   },
//   avatar: {
//     marginRight: theme.spacing(2),
//   },
//   deleteButton: {
//     marginLeft: "auto",
//   },
// }));

// export const Comment = ({ user, text }) => {
//   const classes = useStyles();

//   const handleDelete = () => {
//     // Обработчик удаления комментария
//   };

//   return (
//     <Box className={classes.root}>
//       <Avatar src={user.avatarUrl} className={classes.avatar} />
//       <Box>
//         <Box fontWeight="fontWeightBold">{user.fullName}</Box>
//         <Box>{text}</Box>
//       </Box>
//       <IconButton className={classes.deleteButton} onClick={handleDelete}>
//         <Delete />
//       </IconButton>
//       <CommentIcon />
//     </Box>
//   );
// }; 