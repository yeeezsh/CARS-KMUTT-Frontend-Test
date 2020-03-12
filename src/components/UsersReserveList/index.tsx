import React from 'react';
import { TaskDetail } from 'Models/task/task.interface';

// styles
import styles from './styles.module.css';
import CheckIcon from 'Assets/icons/checked.user.svg';

const UsersReserveList: React.FC<{
  users: TaskDetail['requestor'];
}> = props => {
  const { users } = props;
  return (
    <React.Fragment>
      {users &&
        users.map((e, i) => (
          <p className={styles.studentId} key={i}>
            {/* {i + 1}) {e.username} */}
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
