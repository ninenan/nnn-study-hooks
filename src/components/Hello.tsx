import React from "react";

interface IProps {
  message: string
}

const Hello = (props: IProps ) => {
const { message } = props;
return <div>{message}</div>;
};

export default Hello;
