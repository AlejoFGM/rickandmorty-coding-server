import { Request, Response } from "express";
import { BodyResponse } from "../../interfaces/body-response";
import { Character } from "./types";
import axios from "axios";

const getCharacters = async (
  req: Request,
  res: Response<BodyResponse<Character[]>>
) => {
  try {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    const data: Character[] = response.data.results;

    const sortBy = req.params.sortby;

    switch (sortBy) {
      case "planet":
        data.sort((a, b) => a.location.name.localeCompare(b.location.name));
        break;
      case "gender":
        data.sort((a, b) => a.gender.localeCompare(b.gender));
        break;
      default:
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return res.status(200).json({
      message: "Characters obtained successfully.",
      data: data,
      error: false,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      error: true,
    });
  }
};

export default {
  getCharacters,
};
