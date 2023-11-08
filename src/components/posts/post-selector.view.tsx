import { MenuItem, Select } from "@mui/material";
import { type SelectChangeEvent } from "@mui/material";

import { useGetPost } from "@src/lib/hooks/usePost";
import { useState } from "react";

type Props = {
  bodyParams: {
    page: number;
    page_id: number;
    limit: number;
    date_range?: string
    label: string;
  },
  onSelect: (postId: string) => void;
};

const PostSelector: React.FC<Props> = ({ bodyParams, onSelect }: Props) => {
  const [selectedPost, setSeletedPost] = useState('');
  const { response, loading } = useGetPost(bodyParams);

  const posts = response.posts || [];

  const handleChange = (e: SelectChangeEvent<string>) => {
    setSeletedPost(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <Select
      sx={{ marginLeft: 2 }}
      disabled={loading}
      size="small"
      labelId="category-label"
      value={selectedPost}
      displayEmpty={true}
      onChange={handleChange}>
      <MenuItem value="" sx={{ color: "grey" }}>
        Пост
      </MenuItem>
      {posts.map((post: any) => (
        <MenuItem key={post.id} value={post.id}>
          {post.message}
        </MenuItem>
      ))}
    </Select>
  );
};

export default PostSelector;
