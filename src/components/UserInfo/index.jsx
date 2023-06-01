import React from 'react';
import styles from './UserInfo.module.scss';
import dayjs from 'dayjs'

export const UserInfo = ({ avatarUrl, fullName, additionalText}) => {
  // Преобразуем строку с датой в объект Date
  const parsedDate = dayjs(additionalText).format('DD.MM.YYYY');

  // Форматируем дату в удобный для пользователя формат
  // const formattedDate = parsedDate.format('DD.MM.YYYY');
  
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        {/* <span className={styles.additional}>{additionalText}</span>            дата создания статьи*/} 
        <span className={styles.additional}>{parsedDate}</span>
      </div>
    </div>
  );
};

// export default UserInfo;