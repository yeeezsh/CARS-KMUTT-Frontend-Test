import CheckIcon from 'Assets/icons/checked.user.svg';
import { TaskDetail } from 'Models/task/task.interface';
import React from 'react';
// styles
import styles from './styles.module.css';

const UsersReserveList: React.FC<{
  users: TaskDetail['requestor'];
}> = props => {
  const { users } = props;
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default UsersReserveList;
