import { v4 as createUuid } from "uuid";

export class Note {
  private _id: string;
  constructor(
    private _detail: string,
    private _description: string,
    private _arquived: boolean
  ) {
    this._id = createUuid();
  }

  public get id() {
    return this._id;
  }

  public get detail() {
    return this._detail;
  }

  public get description() {
    return this._description;
  }

  public get arquived() {
    return this._arquived;
  }

  public set detail(detail: string) {
    this._detail = detail;
  }

  public set description(description: string) {
    this._description = description;
  }

  public set arquived(state: boolean) {
    this._arquived = state;
  }

  public toJson() {
    return {
      id: this._id,
      detail: this._detail,
      description: this._description,
      arquived: this._arquived,
    };
  }

  public static create(
    id: string,
    detail: string,
    description: string,
    arquived: boolean
  ) {
    const newNote = new Note(detail, description, arquived);
    newNote._id = id;
    return newNote;
  }
}
