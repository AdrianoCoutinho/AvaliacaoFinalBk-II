import { Note } from "../../models/note.model";
import { DatabaseConnection } from "../config/database.connection";
import { NoteEntity } from "../entities/note.entity";

export class NoteDatabase {
  private repository = DatabaseConnection.connection.getRepository(NoteEntity);

  public async create(id: string, note: Note) {
    const noteEntity = this.repository.create({
      id: note.id,
      detail: note.detail,
      description: note.description,
      arquived: note.arquived,
      idUser: id,
    });

    const result = await this.repository.save(noteEntity);

    return NoteDatabase.mapEntityToModel(result);
  }

  public async get(id: string) {
    const connection = DatabaseConnection.connection;
    const repository = connection.getRepository(NoteEntity);

    const result = await repository.findOneBy({ id });

    if (result === null) {
      return null;
    }

    return NoteDatabase.mapEntityToModel(result);
  }

  public async updateWithSave(id: string, note: any): Promise<number> {
    const noteEntity = await this.repository.findOneBy({
      id,
    });

    if (!noteEntity) {
      return 0;
    }

    const { detail, description, arquived } = note;

    if (detail != undefined) {
      noteEntity.detail = detail;
    }

    if (description != undefined) {
      noteEntity.description = description;
    }

    if (arquived != undefined) {
      noteEntity.arquived = arquived;
    }

    await this.repository.save(noteEntity);

    return 1;
  }

  public async delete(id: string) {
    const noteEntity = this.repository.delete({ id });
  }

  public static mapEntityToModel(entity: NoteEntity): Note {
    return Note.create(
      entity.id,
      entity.detail,
      entity.description,
      entity.arquived
    );
  }
}
