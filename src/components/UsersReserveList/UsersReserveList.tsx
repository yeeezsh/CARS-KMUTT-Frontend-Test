import CheckIcon from 'Assets/icons/checked.user.svg';
import React from 'react';
import { TaskDetail } from 'Services/task/task.interface';
// styles
import styles from './styles.module.css';

const UsersReserveList: React.FC<{
  users: TaskDetail['requestor'];
}> = props => {
  const { users } = props;
  return (
    <div>
      {users &&
        users.map((e, i) => (
          <p className={styles.studentId} key={i}>
            {i + 1}) {e.username}{' '}
            {e.confirm && (
              <img
                className={styles.icon}
                src={CheckIcon}
                alt="checked icon"
              />
            )}
          </p>
        ))}
    </div>
  );
};

export default UsersReserveList;
