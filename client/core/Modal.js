import { Card } from "@material-ui/core";
import React from "react";
import MyGoogleMap from "../LocationFind/MyGoogleMap";

const Modal = ({ className }) => {
  return (
    <Card className={className}>
      <MyGoogleMap />
    </Card>
  );
};

export default Modal;
