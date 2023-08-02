import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface SelectRoleProps {
  role: string | undefined;
  setRole: (role: string) => void;
  isDisable: boolean;
}

interface roleDataType {
  role?: string;
  value: string;
}

const roleData: roleDataType[] = [
  {
    role: "user",
    value: "Người dùng",
  },
  {
    role: "staff",
    value: "Nhân viên",
  },
  {
    role: "producer",
    value: "Chủ cửa hàng",
  },
  {
    role: "admin",
    value: "Quản trị viên",
  },
  {
    role: "superadmin",
    value: "Siêu Quản trị viên",
  },
];

const SelectRole = (props: SelectRoleProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Quyền</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.role}
        label="Quyền"
        disabled={!props.isDisable}
        onChange={(e) => props.setRole(e.target.value)}
      >
        {roleData.map((data) => (
          <MenuItem key={data.role} value={data.role}>
            {data.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectRole;
