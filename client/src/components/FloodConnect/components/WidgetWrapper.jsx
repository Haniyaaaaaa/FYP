import { Box, colors } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: colors.lightBlue[50],
  borderRadius: "0.75rem",
}));

export default WidgetWrapper;
