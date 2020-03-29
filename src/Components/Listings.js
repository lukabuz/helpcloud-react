import React, { useEffect, useState } from "react";
import { Grid, Divider } from "@material-ui/core";
import Listing from "./Listing";
import { Pagination } from "antd";

export default function Listings({ listings }) {
  const [page, setPage] = useState(1);
  const [paginatedListings, setPaginatedListings] = useState([]);

  useEffect(() => {
    setPaginatedListings(listings.slice((page - 1) * 9, page * 9));
  }, [page]);

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        {paginatedListings.map(listing => (
          <Grid item xs={11} sm={6} md={4} lg={4}>
            <Listing listing={listing} />
          </Grid>
        ))}
      </Grid>
      <Divider style={{ margin: "15px" }} />
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item>
          <Pagination
            onChange={page => setPage(page)}
            defaultCurrent={page}
            total={listings.length}
          />
        </Grid>
      </Grid>
    </>
  );
}
