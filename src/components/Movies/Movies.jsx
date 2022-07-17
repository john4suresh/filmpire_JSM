import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  useGetMoviesQuery,
  useGetUpcomingMoviesQuery,
} from "../../services/TMDB";
import { MovieList } from "..";

const Movies = () => {
  const { data: getMovies, error, isFetching } = useGetMoviesQuery();
  const { data: upcomingData } = useGetUpcomingMoviesQuery();

  if (isFetching) {
    return (
      <Box display={"flex"} justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    )
  }

  if (!getMovies.results.length) {
    return (
      <Box display={"flex"} justifyContent="center" alignItems={"center"} mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    )
  }

  if (error) return 'An error has occured.'

  return (
    <div>
      <MovieList movies={getMovies} />
    </div>);
};

export default Movies;
