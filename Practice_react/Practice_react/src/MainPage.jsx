import React, { Suspense, useState } from "react";
import Dashboard from "./Dashboard";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "./Loader";
import { Box, Button, Typography } from "@mui/material";

export default function MainPage() {
  const [show, setShow] = useState("users");

  return (
    <>
      <Box>
        <Typography fontSize={50}>
          <b>Dashboard</b>
        </Typography>
        <Button
          mt={30}
          variant="contained"
          onClick={() => setShow(show === "users" ? "admin" : "users")}
        >
          show {show === "users" ? "admin" : "users"}
        </Button>

        <ErrorBoundary fallback={<Typography>Error Occured...</Typography>}>
          <Suspense fallback={<Loader text={`${show} is loading ....`} />}>
            <Dashboard role={show} />
          </Suspense>
        </ErrorBoundary>
      </Box>
    </>
  );
}
