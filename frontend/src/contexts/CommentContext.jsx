import {
  createContext,
  useContext,
  useState,
} from "react";

import client from "../api/client";

const CommentContext = createContext();

export const CommentProvider = ({
  children,
}) => {
  const [comments, setComments] =
    useState([]);

  const getCommentsByTask =
    async (taskId) => {
      try {
        const res = await client.get(
          `/comments/task/${taskId}`
        );

        setComments(res.data);

        return res.data;
      } catch (error) {
        console.log(
          error.response?.data ||
            error.message
        );
      }
    };

  const createComment =
    async (taskId, text) => {
      try {
        const res = await client.post(
          "/comments",
          {
            taskId,
            text,
          }
        );

        setComments((prev) => [
          res.data,
          ...prev,
        ]);

        return res.data;
      } catch (error) {
        console.log(
          error.response?.data ||
            error.message
        );
      }
    };

  return (
    <CommentContext.Provider
      value={{
        comments,
        getCommentsByTask,
        createComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = () =>
  useContext(CommentContext);