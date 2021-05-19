import PropTypes from "prop-types";
import UserListItem from "./UserListItem";

const UserList = (props) => {
  UserList.propTypes = {
    users: PropTypes.array,
    courseID: PropTypes.number,
    onRemoveUser: PropTypes.func,
    onEditCourse: PropTypes.func,
    userRole: PropTypes.string
  };

  const users = props.users.map(user => {
    return <UserListItem
      key={user.user_id}
      courseID={props.courseID}
      id={user.user_id}
      name={user.last_name + ", " + user.first_name}
      avatarID={user.avatar_id}
      role={user.role}
      onRemoveUser={props.onRemoveUser}
      onEditCourse={props.onEditCourse}
      userRole={props.userRole}
    />;
  });

  return (
    <div>
      {users}
    </div>
  );
};

export default UserList;
