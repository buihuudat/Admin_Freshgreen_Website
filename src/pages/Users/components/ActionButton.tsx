import { LoadingButton } from "@mui/lab";
import { Box, IconButton } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { UserActionsProps, userActions } from "../../../actions/userActions";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { deleteUser } from "../../../redux/slices/userSlice";

interface ActionButtonProps {
  rowData: UserActionsProps;
  isDeleteLoading: boolean;
  setIsDeleteLoading: (isDeleteLoading: boolean) => void;
}
export const ActionButton = (props: ActionButtonProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const handleView = () => {
    navigate(`/users/${props.rowData._id}`, { state: { user: props.rowData } });
  };
  const handleDelete = async () => {
    try {
      props.setIsDeleteLoading(true);
      await userActions.delete({ _id: props.rowData._id });
      dispatch(deleteUser({ _id: props.rowData._id }));
    } catch (error) {
    } finally {
      props.setIsDeleteLoading(false);
    }
  };

  return (
    <Box>
      <IconButton onClick={handleView}>
        <VisibilityIcon color="primary" />
      </IconButton>
      <LoadingButton
        loading={props.isDeleteLoading}
        onClick={handleDelete}
        disabled={user?._id === props.rowData._id}
      >
        <DeleteIcon color="error" />
      </LoadingButton>
    </Box>
  );
};
