import { Router } from "express";
import { NotesController } from "../controllers/notes.controller";
import { UsersController } from "../controllers/users.controller";
import { UserValidateMiddleware } from "../middlewares/user-validate.middleware";

export const userRoutes = () => {
  const app = Router();
  app.post(
    "/",
    UserValidateMiddleware.ValidateRegister,
    new UsersController().create
  );

  app.post(
    "/login",
    UserValidateMiddleware.ValidateLogin,
    new UsersController().login
  );

  app.get("/", new UsersController().list);

  app.get("/:id", new UsersController().get);

  app.post("/:id/notes", new NotesController().addNote);

  app.get("/:id/notes", new NotesController().getNotes);

  app.put("/notes/:noteid", new NotesController().editNote);

  app.delete("/notes/:noteid", new NotesController().deleteNote);

  return app;
};
