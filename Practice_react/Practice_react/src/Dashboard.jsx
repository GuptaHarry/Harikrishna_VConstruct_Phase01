import React, { use } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar
} from "@mui/material";

import { fetchAllUsers, fetchProfile } from "./fetchHelper";
import Loader from "./Loader";

const storeAdminPromise = fetchProfile();
const storeUsersPromise = fetchAllUsers();

export default function Dashboard({ role }) {


  if (role === "users") {
    const users = use(storeUsersPromise);

    return (
      <Card>
        <CardContent>
          <Typography>
            Users List
          </Typography>

          <Loader/>
          <List>
            {users.map(u => (
              <ListItem key={u.id} >
                 <Avatar>
                 {u.name[0]}
            </Avatar>
                <ListItemText
                  primary={u.name}
                  secondary={u.email}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  }


  else {
    const admin = use(storeAdminPromise);

    return (
      <Card>
        <CardContent>
          

            <Avatar>
              {admin.name[0]}
            </Avatar>

            <Typography >
              {admin.name}
            </Typography>

            <Typography color="text.secondary">
              {admin.email}
            </Typography>

         
        </CardContent>
      </Card>
    );
  }
}
