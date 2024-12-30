import { Pagination, PaginationItem } from "@mui/material";
import { getPosts } from "../actions/posts";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Paginate = ({ page }) => {
  const dispatch = useDispatch();
  const { numberOfPage } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);

  return (
    <Pagination
      sx={{
        justifyContent: "space-around",
      }}
      count={numberOfPage}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
