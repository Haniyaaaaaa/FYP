import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      {image ? (
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width={size}
          height={size}
          alt="user"
          src={`http://localhost:3000/assets/${image}`}
        />
      ) : (
        <AccountCircleIcon />
      )}
    </Box>
  );
};

export default UserImage;
