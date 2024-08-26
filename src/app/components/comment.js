import React from 'react';
import { Card } from 'react-bootstrap';

export default function Comment({ comment }) {
  return (
    <Card className="border-0 border-top mt-3 pt-2">
      <Card.Body className="p-0">
        <Card.Title className="h6 mb-1">{comment.user_id}</Card.Title> {/* Comment user */}
        <Card.Text>{comment.comment_text}</Card.Text> {/* Comment text */}
      </Card.Body>
    </Card>
  );
}