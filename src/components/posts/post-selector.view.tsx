import { MenuItem, Select } from "@mui/material";
import { type SelectChangeEvent } from "@mui/material";
import { type Post } from "@src/interfaces/post.interface";

import { useGetPostByCategory } from "@src/lib/hooks/usePost";
import { useState } from "react";
import { truncateTextByWord } from '@src/utilities';

type Props = {
  params: {
    page_id: string;
    ids: string[];
  };
  onSelect: (postId: string) => void;
};

const PostSelector: React.FC<Props> = ({ params, onSelect }: Props) => {
  const [selectedPost, setSeletedPost] = useState('');
  const { response, loading } = useGetPostByCategory(params);

  const posts = response.posts || [];

  const handleChange = (e: SelectChangeEvent<string>) => {
    setSeletedPost(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <Select
      disabled={loading}
      size="small"
      labelId="category-label"
      value={truncateTextByWord(selectedPost, 12)}
      displayEmpty={true}
      onChange={handleChange}
      MenuProps={{
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left"
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left"
        },
      }}
    >
      <MenuItem value="" sx={{ color: "grey" }}>
        Нийтлэл
      </MenuItem>
      {posts.map((post: Post) => (
        <MenuItem key={post.id} value={post.id}>
          {truncateTextByWord(post.message, 12)}
        </MenuItem>
      ))}
    </Select>
  );
};

export default PostSelector;
