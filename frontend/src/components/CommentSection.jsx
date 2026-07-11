import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
} from "@mui/material";

import { useComments } from "../contexts/CommentContext";

function CommentSection({ taskId }) {
  const {
    comments,
    getCommentsByTask,
    createComment,
  } = useComments();

  const [text, setText] = useState("");

  useEffect(() => {
    getCommentsByTask(taskId);
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    await createComment(taskId, text);

    setText("");
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
        >
          Comments
        </Typography>

        <Stack
          component="form"
          spacing={2}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Add Comment"
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            multiline
            rows={2}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
          >
            Add Comment
          </Button>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={2}>
          {comments.length === 0 ? (
            <Typography
              color="text.secondary"
            >
              No comments yet
            </Typography>
          ) : (
            comments.map((comment) => (
              <Card
                key={comment._id}
                variant="outlined"
              >
                <CardContent>
                  <Typography
                    variant="subtitle2"
                  >
                    {comment.user?.name}
                  </Typography>

                  <Typography>
                    {comment.text}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {new Date(
                      comment.createdAt
                    ).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CommentSection;