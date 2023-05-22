import { MyLists } from "../MyLists/MyLists";
import classes from './Sidebar.module.scss'

export const Sidebar = function () {
  return (
    <div className={classes.body}>
      <MyLists />
    </div>
  );
};
